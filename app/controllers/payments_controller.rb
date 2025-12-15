# app/controllers/payments_controller.rb
class PaymentsController < ApplicationController
  # Public endpoints - no auth required
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [:webhook]

  # POST /pay/:token
  # Creates a Stripe Checkout Session and redirects to Stripe
  def create_checkout
    @invoice = Invoice.find_by!(token: params[:token])

    # Don't allow payment for non-payable invoices
    unless @invoice.payable?
      redirect_to public_invoice_path(@invoice.token), alert: 'This invoice cannot be paid.'
      return
    end

    # Create Stripe Checkout Session
    session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'sgd',
          product_data: {
            name: "Invoice #{@invoice.invoice_number}",
            description: @invoice.client&.name || 'Invoice Payment'
          },
          unit_amount: (@invoice.total * 100).to_i  # Stripe uses cents
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: success_payment_url(token: @invoice.token),
      cancel_url: cancel_payment_url(token: @invoice.token),
      customer_email: @invoice.client&.email,
      metadata: {
        invoice_token: @invoice.token,
        invoice_number: @invoice.invoice_number
      }
    )

    redirect_to session.url, allow_other_host: true
  rescue Stripe::StripeError => e
    Rails.logger.error "Stripe error: #{e.message}"
    redirect_to public_invoice_path(params[:token]), alert: 'Payment service error. Please try again.'
  end

  # GET /pay/:token/success
  def success
    @invoice = Invoice.find_by!(token: params[:token])
    
    # The webhook handles the actual status update, but we show success message
    redirect_to public_invoice_path(@invoice.token), notice: 'Payment processing. You will receive a confirmation email shortly.'
  end

  # GET /pay/:token/cancel
  def cancel
    redirect_to public_invoice_path(params[:token]), notice: 'Payment cancelled.'
  end

  # POST /webhooks/stripe
  # Handles Stripe webhook events
  def webhook
    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    endpoint_secret = ENV['STRIPE_WEBHOOK_SECRET']

    begin
      # Verify webhook signature if secret is configured
      if endpoint_secret.present?
        event = Stripe::Webhook.construct_event(payload, sig_header, endpoint_secret)
      else
        # Development mode - skip signature verification
        data = JSON.parse(payload, symbolize_names: true)
        event = Stripe::Event.construct_from(data)
      end
    rescue JSON::ParserError => e
      Rails.logger.error "Stripe webhook JSON parse error: #{e.message}"
      head :bad_request
      return
    rescue Stripe::SignatureVerificationError => e
      Rails.logger.error "Stripe webhook signature verification failed: #{e.message}"
      head :bad_request
      return
    end

    # Handle the event
    case event.type
    when 'checkout.session.completed'
      handle_checkout_completed(event.data.object)
    when 'payment_intent.succeeded'
      # Could handle this for additional confirmation
      Rails.logger.info "Payment intent succeeded: #{event.data.object.id}"
    else
      Rails.logger.info "Unhandled Stripe event type: #{event.type}"
    end

    head :ok
  end

  private

  def handle_checkout_completed(session)
    invoice_token = session.metadata&.invoice_token
    
    unless invoice_token
      Rails.logger.error "Stripe checkout completed but no invoice_token in metadata"
      return
    end

    invoice = Invoice.find_by(token: invoice_token)
    
    unless invoice
      Rails.logger.error "Invoice not found for token: #{invoice_token}"
      return
    end

    # Mark invoice as paid
    if invoice.mark_paid!
      Rails.logger.info "Invoice #{invoice.invoice_number} marked as paid via Stripe"
      
      # Send payment confirmation email
      InvoiceMailer.payment_received(invoice).deliver_later
    else
      Rails.logger.error "Failed to mark invoice #{invoice.invoice_number} as paid"
    end
  end
end

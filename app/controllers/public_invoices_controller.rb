# app/controllers/public_invoices_controller.rb
class PublicInvoicesController < ApplicationController
  # Skip authentication for public invoice views
  # skip_before_action :authenticate_user!

  def show
    @invoice = Invoice.includes(:client, :line_items).find_by!(token: params[:token])

    render inertia: 'Invoices/Public', props: {
      invoice: serialize_public_invoice(@invoice)
    }
  rescue ActiveRecord::RecordNotFound
    render inertia: 'Errors/NotFound', props: {
      message: 'Invoice not found'
    }
  end

  private

  def serialize_public_invoice(invoice)
    {
      invoiceNumber: invoice.invoice_number,
      clientName: invoice.client&.name,
      clientCompany: invoice.client&.company,
      issueDate: invoice.issue_date.iso8601,
      dueDate: invoice.due_date.iso8601,
      status: invoice.status,
      subtotal: invoice.subtotal.to_f,
      totalDiscount: invoice.total_discount.to_f,
      total: invoice.total.to_f,
      notes: invoice.notes,
      lineItems: invoice.line_items.order(:position).map do |item|
        {
          type: item.item_type,
          description: item.description,
          quantity: item.quantity&.to_f,
          unitType: item.unit_type,
          unitPrice: item.unit_price&.to_f
        }
      end
    }
  end
end

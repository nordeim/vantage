# app/controllers/invoices_controller.rb
class InvoicesController < ApplicationController
  before_action :set_invoice, only: [:show, :edit, :update, :destroy, :duplicate, :mark_paid, :mark_sent, :cancel]

  # GET /invoices
  def index
    @invoices = Invoice.includes(:client, :line_items)
                       .order(created_at: :desc)

    # Apply status filter if provided
    if params[:status].present? && params[:status] != 'all'
      @invoices = @invoices.where(status: params[:status])
    end

    render inertia: 'Invoices/Index', props: {
      invoices: @invoices.map { |invoice| serialize_invoice(invoice) },
      filters: {
        status: params[:status] || 'all'
      }
    }
  end

  # GET /invoices/new
  def new
    @clients = Client.order(:name)

    render inertia: 'Invoices/New', props: {
      clients: @clients.map { |client| serialize_client(client) },
      invoiceNumber: generate_invoice_number
    }
  end

  # POST /invoices
  def create
    @invoice = Invoice.new(invoice_params)
    @invoice.token = generate_token

    if @invoice.save
      # Create line items
      create_line_items(@invoice, params[:invoice][:line_items])

      redirect_to invoices_path, notice: 'Invoice created successfully.'
    else
      @clients = Client.order(:name)
      
      render inertia: 'Invoices/New', props: {
        clients: @clients.map { |client| serialize_client(client) },
        invoiceNumber: @invoice.invoice_number,
        errors: @invoice.errors.to_hash
      }
    end
  end

  # GET /invoices/:id
  def show
    redirect_to edit_invoice_path(@invoice)
  end

  # GET /invoices/:id/edit
  def edit
    @clients = Client.order(:name)

    render inertia: 'Invoices/Edit', props: {
      invoice: serialize_invoice(@invoice, include_line_items: true),
      clients: @clients.map { |client| serialize_client(client) }
    }
  end

  # PUT/PATCH /invoices/:id
  def update
    if @invoice.update(invoice_params)
      # Update line items
      update_line_items(@invoice, params[:invoice][:line_items])

      redirect_to edit_invoice_path(@invoice), notice: 'Invoice updated successfully.'
    else
      @clients = Client.order(:name)
      
      render inertia: 'Invoices/Edit', props: {
        invoice: serialize_invoice(@invoice, include_line_items: true),
        clients: @clients.map { |client| serialize_client(client) },
        errors: @invoice.errors.to_hash
      }
    end
  end

  # DELETE /invoices/:id
  def destroy
    @invoice.destroy
    redirect_to invoices_path, notice: 'Invoice deleted successfully.'
  end

  # POST /invoices/:id/duplicate
  def duplicate
    new_invoice = @invoice.dup
    new_invoice.invoice_number = generate_invoice_number
    new_invoice.token = generate_token
    new_invoice.status = 'draft'
    new_invoice.issue_date = Date.today
    new_invoice.due_date = Date.today + 30.days
    new_invoice.created_at = nil
    new_invoice.updated_at = nil

    if new_invoice.save
      # Duplicate line items
      @invoice.line_items.each do |item|
        new_item = item.dup
        new_item.invoice = new_invoice
        new_item.save
      end

      redirect_to edit_invoice_path(new_invoice), notice: 'Invoice duplicated successfully.'
    else
      redirect_to edit_invoice_path(@invoice), alert: 'Failed to duplicate invoice.'
    end
  end

  # PUT /invoices/:id/mark_paid
  def mark_paid
    if @invoice.update(status: 'paid')
      redirect_to edit_invoice_path(@invoice), notice: 'Invoice marked as paid.'
    else
      redirect_to edit_invoice_path(@invoice), alert: 'Failed to update invoice status.'
    end
  end

  # PUT /invoices/:id/mark_sent
  def mark_sent
    if @invoice.update(status: 'pending')
      redirect_to edit_invoice_path(@invoice), notice: 'Invoice marked as sent.'
    else
      redirect_to edit_invoice_path(@invoice), alert: 'Failed to update invoice status.'
    end
  end

  # PUT /invoices/:id/cancel
  def cancel
    if @invoice.update(status: 'cancelled')
      redirect_to edit_invoice_path(@invoice), notice: 'Invoice cancelled.'
    else
      redirect_to edit_invoice_path(@invoice), alert: 'Failed to cancel invoice.'
    end
  end

  private

  def set_invoice
    @invoice = Invoice.includes(:client, :line_items).find(params[:id])
  end

  def invoice_params
    params.require(:invoice).permit(
      :client_id,
      :invoice_number,
      :issue_date,
      :due_date,
      :status,
      :notes,
      :subtotal,
      :total_discount,
      :total
    )
  end

  def serialize_invoice(invoice, include_line_items: false)
    data = {
      id: invoice.id.to_s,
      invoiceNumber: invoice.invoice_number,
      clientId: invoice.client_id.to_s,
      clientName: invoice.client&.name || 'Unknown Client',
      clientCompany: invoice.client&.company,
      clientEmail: invoice.client&.email,
      issueDate: invoice.issue_date.iso8601,
      dueDate: invoice.due_date.iso8601,
      status: invoice.status,
      subtotal: invoice.subtotal.to_f,
      totalDiscount: invoice.total_discount.to_f,
      total: invoice.total.to_f,
      notes: invoice.notes,
      token: invoice.token,
      createdAt: invoice.created_at.iso8601,
      updatedAt: invoice.updated_at.iso8601
    }

    if include_line_items
      data[:lineItems] = invoice.line_items.order(:position).map do |item|
        {
          id: item.id.to_s,
          invoiceId: item.invoice_id.to_s,
          type: item.item_type,
          description: item.description,
          quantity: item.quantity&.to_f,
          unitType: item.unit_type,
          unitPrice: item.unit_price&.to_f,
          position: item.position
        }
      end
    else
      data[:lineItems] = []
    end

    data
  end

  def serialize_client(client)
    {
      id: client.id.to_s,
      name: client.name,
      email: client.email,
      company: client.company,
      phone: client.phone,
      address: client.address,
      city: client.city,
      country: client.country,
      postalCode: client.postal_code,
      notes: client.notes,
      createdAt: client.created_at.iso8601,
      updatedAt: client.updated_at.iso8601
    }
  end

  def generate_invoice_number
    year = Date.today.year
    # Get the last invoice number for this year
    last_invoice = Invoice.where("invoice_number LIKE ?", "INV-#{year}-%")
                          .order(invoice_number: :desc)
                          .first

    if last_invoice
      last_number = last_invoice.invoice_number.split('-').last.to_i
      new_number = last_number + 1
    else
      new_number = 1
    end

    "INV-#{year}-#{new_number.to_s.rjust(4, '0')}"
  end

  def generate_token
    SecureRandom.urlsafe_base64(16)
  end

  def create_line_items(invoice, line_items_params)
    return unless line_items_params.present?

    line_items_params.each do |item_params|
      invoice.line_items.create!(
        item_type: item_params[:type],
        description: item_params[:description],
        quantity: item_params[:quantity],
        unit_type: item_params[:unit_type],
        unit_price: item_params[:unit_price],
        position: item_params[:position]
      )
    end
  end

  def update_line_items(invoice, line_items_params)
    return unless line_items_params.present?

    # Get existing item IDs
    existing_ids = invoice.line_items.pluck(:id).map(&:to_s)
    submitted_ids = line_items_params.map { |p| p[:id] }.compact

    # Delete removed items
    ids_to_delete = existing_ids - submitted_ids
    invoice.line_items.where(id: ids_to_delete).destroy_all if ids_to_delete.any?

    # Update or create items
    line_items_params.each do |item_params|
      if item_params[:id].present? && existing_ids.include?(item_params[:id])
        # Update existing
        item = invoice.line_items.find(item_params[:id])
        item.update!(
          item_type: item_params[:type],
          description: item_params[:description],
          quantity: item_params[:quantity],
          unit_type: item_params[:unit_type],
          unit_price: item_params[:unit_price],
          position: item_params[:position]
        )
      else
        # Create new
        invoice.line_items.create!(
          item_type: item_params[:type],
          description: item_params[:description],
          quantity: item_params[:quantity],
          unit_type: item_params[:unit_type],
          unit_price: item_params[:unit_price],
          position: item_params[:position]
        )
      end
    end
  end
end

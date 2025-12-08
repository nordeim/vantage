# app/controllers/invoices_controller.rb
class InvoicesController < ApplicationController
  def index
    # For Day 4, we're using mock data on frontend
    # But prepare the structure for when we have real data
    render inertia: 'Invoices/Index', props: {
      # These will be populated with real data later
      # invoices: serialize_invoices(Invoice.all)
    }
  end

  def new
    # Day 5 expects clients for the selector
    render inertia: 'Invoices/New', props: {
      clients: [], # Will be Client.all.map { |c| serialize_client(c) }
      invoiceNumber: generate_invoice_number
    }
  end

  def edit
    # Day 5 expects full invoice data
    render inertia: 'Invoices/Edit', props: {
      id: params[:id],
      # invoice: serialize_invoice(Invoice.find(params[:id])),
      # clients: Client.all.map { |c| serialize_client(c) }
    }
  end

  private

  def generate_invoice_number
    year = Date.today.year
    # Simple sequence for now
    "INV-#{year}-#{rand(1000..9999)}"
  end
end

# db/seeds.rb
# Seed data for development
# Run with: rails db:seed

puts "Seeding database..."

# ═══════════════════════════════════════════════════════════════════════════
# DEFAULT ADMIN USER
# ═══════════════════════════════════════════════════════════════════════════

puts "Creating default admin user..."

# Create or update the default admin user
admin = User.find_or_initialize_by(email: 'admin@invoiceforge.app')
admin.password = 'password123'
admin.password_confirmation = 'password123'
admin.name = 'Admin User'
admin.company_name = 'InvoiceForge Demo'
admin.save!

puts "Admin user created: admin@invoiceforge.app / password123"

# Clear existing data (be careful in production!)
LineItem.destroy_all
Invoice.destroy_all
Client.destroy_all

# ═══════════════════════════════════════════════════════════════════════════
# CLIENTS
# ═══════════════════════════════════════════════════════════════════════════

puts "Creating clients..."

acme = Client.create!(
  name: 'Acme Corporation',
  email: 'billing@acme.corp',
  company: 'Acme Corporation Pte Ltd',
  address: '123 Business Park, #10-01, Singapore 123456',
  phone: '+65 6123 4567',
  notes: 'Net 30 payment terms preferred'
)

startup_labs = Client.create!(
  name: 'Startup Labs',
  email: 'finance@startuplabs.io',
  company: 'Startup Labs Pte Ltd',
  address: '456 Innovation Drive, Singapore 654321',
  phone: '+65 6987 6543'
)

global_ventures = Client.create!(
  name: 'Global Ventures',
  email: 'accounts@globalventures.com',
  company: 'Global Ventures Holdings',
  address: '789 Commerce Tower, Singapore 789012'
)

puts "Created #{Client.count} clients"

# ═══════════════════════════════════════════════════════════════════════════
# INVOICES
# ═══════════════════════════════════════════════════════════════════════════

puts "Creating invoices..."

# Invoice 1: Pending (Acme)
inv1 = Invoice.create!(
  client: acme,
  invoice_number: '2025-0001',
  status: 'pending',
  issue_date: Date.new(2025, 1, 15),
  due_date: Date.new(2025, 2, 14),
  notes: 'Thank you for your business!'
)

LineItem.create!(invoice: inv1, item_type: 'section', description: 'Development Services', position: 1)
LineItem.create!(invoice: inv1, item_type: 'item', description: 'Frontend Development - Dashboard Module', quantity: 24, unit_type: 'hours', unit_price: 150.00, position: 2)
LineItem.create!(invoice: inv1, item_type: 'item', description: 'API Integration', quantity: 16, unit_type: 'hours', unit_price: 150.00, position: 3)
LineItem.create!(invoice: inv1, item_type: 'section', description: 'Additional Services', position: 4)
LineItem.create!(invoice: inv1, item_type: 'item', description: 'Technical Consultation', quantity: 2, unit_type: 'hours', unit_price: 200.00, position: 5)
LineItem.create!(invoice: inv1, item_type: 'discount', description: 'Loyalty Discount (5%)', quantity: 1, unit_type: 'fixed', unit_price: -320.00, position: 6)

# Invoice 2: Draft (Startup Labs)
inv2 = Invoice.create!(
  client: startup_labs,
  invoice_number: '2025-0002',
  status: 'draft',
  issue_date: Date.new(2025, 1, 20),
  due_date: Date.new(2025, 2, 19)
)

LineItem.create!(invoice: inv2, item_type: 'item', description: 'UI/UX Design - Mobile App', quantity: 3, unit_type: 'days', unit_price: 800.00, position: 1)

# Invoice 3: Paid (Global Ventures)
inv3 = Invoice.create!(
  client: global_ventures,
  invoice_number: '2024-0012',
  status: 'paid',
  issue_date: Date.new(2024, 12, 20),
  due_date: Date.new(2025, 1, 19)
)

LineItem.create!(invoice: inv3, item_type: 'item', description: 'Annual Retainer - Q4 2024', quantity: 1, unit_type: 'fixed', unit_price: 8000.00, position: 1)

# Invoice 4: Overdue (Acme)
inv4 = Invoice.create!(
  client: acme,
  invoice_number: '2024-0010',
  status: 'pending', # Will show as overdue due to past due date
  issue_date: Date.new(2024, 11, 15),
  due_date: Date.new(2024, 12, 15)
)

LineItem.create!(invoice: inv4, item_type: 'item', description: 'Maintenance & Support - November', quantity: 10, unit_type: 'hours', unit_price: 120.00, position: 1)

puts "Created #{Invoice.count} invoices with #{LineItem.count} line items"

# Recalculate all totals
Invoice.find_each(&:recalculate_totals!)

puts "\nSeeding complete!"
puts "=" * 50
puts "Summary:"
puts "  Users: #{User.count}"
puts "  Clients: #{Client.count}"
puts "  Invoices: #{Invoice.count}"
puts "  Line Items: #{LineItem.count}"
puts ""
puts "Login credentials:"
puts "  Email: admin@invoiceforge.app"
puts "  Password: password123"
puts "=" * 50

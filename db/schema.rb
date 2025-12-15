# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_12_15_000004) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "clients", force: :cascade do |t|
    t.text "address"
    t.string "city"
    t.string "company"
    t.string "country"
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "name", null: false
    t.text "notes"
    t.string "phone"
    t.string "postal_code"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_clients_on_email"
    t.index ["name"], name: "index_clients_on_name"
  end

  create_table "invoices", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.datetime "created_at", null: false
    t.date "due_date", null: false
    t.string "invoice_number", null: false
    t.date "issue_date", null: false
    t.text "notes"
    t.string "status", default: "draft", null: false
    t.decimal "subtotal", precision: 10, scale: 2, default: "0.0"
    t.string "token", null: false
    t.decimal "total", precision: 10, scale: 2, default: "0.0"
    t.decimal "total_discount", precision: 10, scale: 2, default: "0.0"
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_invoices_on_client_id"
    t.index ["due_date"], name: "index_invoices_on_due_date"
    t.index ["invoice_number"], name: "index_invoices_on_invoice_number", unique: true
    t.index ["status"], name: "index_invoices_on_status"
    t.index ["token"], name: "index_invoices_on_token", unique: true
  end

  create_table "line_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description", null: false
    t.bigint "invoice_id", null: false
    t.string "item_type", null: false
    t.integer "position", default: 0, null: false
    t.decimal "quantity", precision: 10, scale: 2
    t.decimal "unit_price", precision: 10, scale: 2
    t.string "unit_type"
    t.datetime "updated_at", null: false
    t.index ["invoice_id", "position"], name: "index_line_items_on_invoice_id_and_position"
    t.index ["invoice_id"], name: "index_line_items_on_invoice_id"
    t.index ["item_type"], name: "index_line_items_on_item_type"
  end

  create_table "users", force: :cascade do |t|
    t.text "address"
    t.string "company_name"
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name"
    t.string "phone"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "invoices", "clients"
  add_foreign_key "line_items", "invoices"
end

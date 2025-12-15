# config/routes.rb
Rails.application.routes.draw do
  # ═══════════════════════════════════════════════════════════════════════════
  # DEVISE AUTHENTICATION
  # ═══════════════════════════════════════════════════════════════════════════
  devise_for :users

  # ═══════════════════════════════════════════════════════════════════════════
  # HEALTH CHECK
  # ═══════════════════════════════════════════════════════════════════════════
  get "up" => "rails/health#show", as: :rails_health_check

  # ═══════════════════════════════════════════════════════════════════════════
  # AUTHENTICATED ROUTES (require login)
  # ═══════════════════════════════════════════════════════════════════════════
  
  # Root
  root "dashboard#index"

  # Dashboard
  get "dashboard", to: "dashboard#index"

  # Clients
  resources :clients

  # Invoices with custom member actions
  resources :invoices do
    member do
      post :duplicate      # POST /invoices/:id/duplicate
      post :send_invoice   # POST /invoices/:id/send_invoice
      put :mark_paid       # PUT /invoices/:id/mark_paid
      put :mark_sent       # PUT /invoices/:id/mark_sent
      put :cancel          # PUT /invoices/:id/cancel
      get :download_pdf    # GET /invoices/:id/download_pdf (for PDF generation)
    end
  end

  # ═══════════════════════════════════════════════════════════════════════════
  # PUBLIC ROUTES (no authentication required)
  # ═══════════════════════════════════════════════════════════════════════════
  
  # Public invoice view (shareable link)
  get "i/:token", to: "public_invoices#show", as: :public_invoice
  
  # Public PDF download (no auth required)
  get "i/:token/download", to: "public_invoices#download_pdf", as: :public_invoice_download

  # ═══════════════════════════════════════════════════════════════════════════
  # PAYMENT ROUTES (Stripe Checkout)
  # ═══════════════════════════════════════════════════════════════════════════
  
  # Initiate payment - redirects to Stripe Checkout
  post "pay/:token", to: "payments#create_checkout", as: :pay_invoice
  
  # Payment result redirects
  get "pay/:token/success", to: "payments#success", as: :success_payment
  get "pay/:token/cancel", to: "payments#cancel", as: :cancel_payment
  
  # Stripe webhook endpoint
  post "webhooks/stripe", to: "payments#webhook"
end

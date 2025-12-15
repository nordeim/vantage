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
end

# config/routes.rb
Rails.application.routes.draw do
  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

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
    end
  end

  # Public invoice view (shareable link)
  get "i/:token", to: "public_invoices#show", as: :public_invoice
end

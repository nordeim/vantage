# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  # Protect from CSRF attacks
  protect_from_forgery with: :exception
  
  # Require authentication for all actions by default
  before_action :authenticate_user!
  
  # Add flash types for Inertia
  add_flash_types :success, :error, :warning, :info
  
  # Share flash messages with Inertia
  inertia_share flash: -> { flash.to_hash }
  
  # Share current user data with all Inertia pages
  inertia_share do
    if user_signed_in?
      {
        currentUser: {
          id: current_user.id,
          email: current_user.email,
          name: current_user.display_name,
          initials: current_user.initials,
          companyName: current_user.company_name
        }
      }
    else
      { currentUser: nil }
    end
  end
  
  # Share errors if any
  inertia_share errors: -> { session.delete(:errors) || {} }
end

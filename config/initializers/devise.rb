# config/initializers/devise.rb
# Devise configuration for InvoiceForge
# See https://github.com/heartcombo/devise for full configuration options

Devise.setup do |config|
  # ==> Mailer Configuration
  config.mailer_sender = 'noreply@invoiceforge.app'

  # ==> ORM configuration
  require 'devise/orm/active_record'

  # ==> Configuration for any authentication mechanism
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]
  config.skip_session_storage = [:http_auth]

  # ==> Configuration for :database_authenticatable
  config.stretches = Rails.env.test? ? 1 : 12

  # ==> Configuration for :confirmable
  # config.allow_unconfirmed_access_for = 2.days
  # config.confirm_within = 3.days
  # config.reconfirmable = true

  # ==> Configuration for :rememberable
  config.remember_for = 2.weeks
  config.extend_remember_period = false
  config.rememberable_options = {}

  # ==> Configuration for :validatable
  config.password_length = 8..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/

  # ==> Configuration for :recoverable
  config.reset_password_within = 6.hours

  # ==> Configuration for :lockable
  # config.lock_strategy = :failed_attempts
  # config.unlock_keys = [:email]
  # config.unlock_strategy = :both
  # config.maximum_attempts = 20
  # config.unlock_in = 1.hour
  # config.last_attempt_warning = true

  # ==> Configuration for :timeout
  # config.timeout_in = 30.minutes

  # ==> Navigation configuration
  config.sign_out_via = :delete

  # ==> Hotwire/Turbo support
  config.responder.error_status = :unprocessable_entity
  config.responder.redirect_status = :see_other

  # ==> Inertia.js compatibility
  # Devise will use the responders gem for JSON responses
end

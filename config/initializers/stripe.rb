# config/initializers/stripe.rb
# Configure Stripe API key from environment

Stripe.api_key = ENV['STRIPE_SECRET_KEY']

# Optional: Configure API version for consistency
# Stripe.api_version = '2023-10-16'

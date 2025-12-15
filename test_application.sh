# Start PostgreSQL (already running)
#docker compose up -d db

# Start Rails server
#source .env && bundle exec rails server

# Visit http://localhost:3000
# Login: admin@invoiceforge.app / password123

# Start PostgreSQL + MailHog
docker compose up -d

# Start Rails server
source .env && bundle exec rails server

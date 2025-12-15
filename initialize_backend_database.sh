docker compose up -d db
docker ps
source .env && /home/pete/.local/share/mise/installs/ruby/3.4.7/bin/bundle exec rails db:migrate
source .env && /home/pete/.local/share/mise/installs/ruby/3.4.7/bin/bundle exec rails db:seed

# New, continuation:
# 1. Run the Devise migration
source .env && /home/pete/.local/share/mise/installs/ruby/3.4.7/bin/bundle exec rails db:migrate

# 2. Reseed the database (will create admin user)
source .env && /home/pete/.local/share/mise/installs/ruby/3.4.7/bin/bundle exec rails db:seed


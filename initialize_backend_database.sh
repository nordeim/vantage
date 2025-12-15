docker compose up -d db
docker ps
source .env && /home/pete/.local/share/mise/installs/ruby/3.4.7/bin/bundle exec rails db:migrate
source .env && /home/pete/.local/share/mise/installs/ruby/3.4.7/bin/bundle exec rails db:seed


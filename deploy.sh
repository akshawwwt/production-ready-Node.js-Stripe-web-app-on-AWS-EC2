#!/bin/bash

APP_DIR="/home/ubuntu/AWS-SESSION"

# Update & install packages
sudo apt update
sudo apt install nginx git curl -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# Clone repo (skip if already cloned)
if [ ! -d "$APP_DIR" ]; then
  git clone https://github.com/verma-kunal/AWS-Session.git $APP_DIR
fi

# Deploy app
cd $APP_DIR
cp .env.example .env
npm install
pm2 start server.js
pm2 save
pm2 startup

# Configure Nginx
sudo tee /etc/nginx/sites-available/nodeapp > /dev/null <<EOL
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

sudo ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

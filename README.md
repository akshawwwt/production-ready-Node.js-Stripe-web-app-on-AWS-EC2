/*

🚀 Deploying a Node.js + Stripe Application on AWS EC2 (Production Setup using VS Code Remote SSH)

✅ Project Type: Paid Workshop Assignment
👨‍🏫 Instructor: [Your Professor's Name]
📌 Task: Deploy a production-ready Node.js + Stripe web app on AWS EC2

---

📘 Overview

This project showcases how I deployed a secure Node.js + Stripe web application to AWS EC2 using VS Code’s Remote SSH workflow.

Key production-grade improvements:
- PM2 to keep the Node app always running
- Nginx as a reverse proxy
- HTTPS using Let’s Encrypt
- One-command automated deployment script
- Entire deployment managed using VS Code Remote SSH

---

🌐 Why I Used VS Code Remote SSH

“I used VS Code Remote SSH to work directly on my EC2 instance. It gave me an integrated terminal, editor, and file manager, allowing me to deploy, edit configs, monitor logs, and restart services — all from one place. This streamlined the entire cloud workflow.”

Benefits:
- Edit files like server.js, .env, nginx.conf live on EC2
- Use integrated terminal to install Node, PM2, Nginx
- Debug issues without switching tools (logs, nginx -t, pm2 logs)
- Faster development & deployment cycle

---

🧪 Test the App Locally

1. Clone the repo:
   git clone https://github.com/your-username/AWS-Session.git
   cd AWS-Session

2. Create `.env`:
   DOMAIN=http://localhost:3000
   PORT=3000
   STATIC_DIR=./client
   PUBLISHABLE_KEY=your_stripe_publishable_key
   SECRET_KEY=your_stripe_secret_key

3. Install & run:
   npm install
   npm run start

---

☁️ Launch & Connect to AWS EC2 via VS Code

1. Create EC2 instance:
   - OS: Ubuntu 20.04 or 22.04
   - Type: t2.micro (Free Tier)
   - Key Pair: Create and download a `.pem` key

2. Install VS Code extension: Remote - SSH

3. Configure SSH in VS Code
   Edit ~/.ssh/config:
   Host ec2
     HostName <your-ec2-ip>
     User ubuntu
     IdentityFile path/to/key.pem

4. Connect via VS Code:
   Open Command Palette → Remote-SSH: Connect to Host... → select ec2

---

⚙️ Deploy Using VS Code Terminal (Manually)

1. Install Node.js, PM2, Git, Nginx:
   sudo apt update
   sudo apt install git nginx curl -y
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm install -g pm2

2. Clone your project inside EC2:
   git clone https://github.com/your-username/AWS-Session.git
   cd AWS-Session
   cp .env.example .env
   npm install

3. Run with PM2:
   pm2 start server.js
   pm2 save
   pm2 startup

4. Configure Nginx (in VS Code):
   sudo nano /etc/nginx/sites-available/nodeapp

Paste:
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }

Enable config:
   sudo ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx

---

🔐 Add HTTPS with Certbot

1. Point domain to your EC2 IP

2. Install Certbot:
   sudo apt install certbot python3-certbot-nginx -y

3. Run:
   sudo certbot --nginx

4. Auto-Renew:
   sudo certbot renew --dry-run

---

🛠 One-Step Automation (Optional)

Inside VS Code (connected to EC2):
   chmod +x deploy.sh
   ./deploy.sh




*/

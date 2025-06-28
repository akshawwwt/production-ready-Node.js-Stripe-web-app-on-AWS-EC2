# 🛠️ docs/deployment.md

## 🚀 Manual Deployment Guide for Node.js + Stripe App on EC2

This guide walks you through deploying the Node.js + Stripe application to an Ubuntu-based EC2 instance.

---

### ✅ Step 1: Launch an EC2 Instance

* Go to AWS EC2 dashboard
* Choose Ubuntu 20.04
* Instance type: t2.micro (Free Tier)
* Allow ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)
* Download the `.pem` key pair

---

### ✅ Step 2: SSH Into EC2

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

---

### ✅ Step 3: Install Prerequisites

```bash
sudo apt update
sudo apt install git nginx curl -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

---

### ✅ Step 4: Clone and Setup App

```bash
git clone https://github.com/your-username/AWS-Session.git
cd AWS-Session
cp .env.example .env
npm install
pm2 start server.js
pm2 save
pm2 startup
```

---

### ✅ Step 5: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/nodeapp
```

Paste config from `config/nginx.conf` and link it:

```bash
sudo ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

### ✅ Step 6: Access the App

Now you can access the app at:

```bash
http://<your-ec2-ip>
```

For production, enable HTTPS — see `ssl-setup.md`.

---

# 🔐 docs/ssl-setup.md

## 🔒 Enabling HTTPS with Certbot and Let's Encrypt

---

### ✅ Step 1: Set Up a Domain

* Purchase a domain (Namecheap, GoDaddy, etc.)
* Point the domain's A record to your EC2’s Elastic IP

---

### ✅ Step 2: Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

---

### ✅ Step 3: Run Certbot

```bash
sudo certbot --nginx
```

* Follow prompts to select your domain
* Certbot will update Nginx config and apply SSL

---

### ✅ Step 4: Verify HTTPS

Visit:

```bash
https://your-domain.com
```

You should see the SSL padlock in the browser.

---

### ✅ Step 5: Auto-Renewal

```bash
sudo certbot renew --dry-run
```

That’s it! Your app is now secured with HTTPS!

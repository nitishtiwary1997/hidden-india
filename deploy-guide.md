# 🚀 AWS Server पर HiddenIndia.online लाइव करने की संपूर्ण गाइड (Step-by-Step Guide)

अपने डोमेन (उदा. `hiddenindia.online`) और AWS EC2 सर्वर पर इस Next.js 16 ऐप को 100% प्रोडक्शन लाइव करने के लिए नीचे दिए गए स्टेप्स का पालन करें।

---

## 📋 चरण 1: AWS EC2 Instance (Server) लॉन्च करें

1. **AWS Console** पर जाएं ➔ **EC2** ➔ **Launch Instance** पर क्लिक करें।
2. **Name**: `HiddenIndia-Production`
3. **OS Image**: **Ubuntu 24.04 LTS (64-bit x86)** चुनें।
4. **Instance Type**: `t3.medium` या `t3.small` (कम से कम 2GB RAM)।
5. **Key Pair**: नई Key Pair (जैसे `hiddenindia-key.pem`) डाउनलोड करें।
6. **Network / Security Group Rules**:
   - Allow **SSH** (Port 22)
   - Allow **HTTP** (Port 80)
   - Allow **HTTPS** (Port 443)
7. **Launch Instance** पर क्लिक करें और अपने सर्वर का **Public IP** (उदा. `13.232.100.50`) नोट कर लें।

---

## 🌐 चरण 2: अपने डोमेन (DNS) को AWS EC2 Public IP से जोड़ें

Domain Provider के अनुसार नीचे दिए गए स्टेप्स फॉलो करें:

### 🔹 Option A: GoDaddy में DNS जोड़ने के स्टेप्स
1. **GoDaddy Account** में लॉगिन करें ➔ **My Products** पर जाएं।
2. अपने डोमेन नाम के बगल में **DNS** या **Manage DNS** बटन पर क्लिक करें।
3. **DNS Records** सेक्शन में **Add New Record** बटन पर क्लिक करें।
4. पहला रिकॉर्ड जोड़ें:
   - **Type**: `A`
   - **Name**: `@`
   - **Value**: `YOUR_EC2_PUBLIC_IP` (उदा. `13.232.100.50`)
   - **TTL**: `1 Hour` या `Default`
5. दूसरा रिकॉर्ड जोड़ें:
   - **Type**: `A`
   - **Name**: `www`
   - **Value**: `YOUR_EC2_PUBLIC_IP` (उदा. `13.232.100.50`)
   - **TTL**: `1 Hour`
6. **Save All Records** पर क्लिक करें।

---

### 🔹 Option B: Hostinger में DNS जोड़ने के स्टेप्स
1. **Hostinger hPanel** में लॉगिन करें ➔ **Domains** पर जाएं।
2. अपने डोमेन पर क्लिक करके **DNS / Nameservers** मैन्युअल पर जाएं।
3. **Manage DNS Records** में जाएं:
4. पहला A Record:
   - **Type**: `A` | **Name**: `@` | **Points to**: `YOUR_EC2_PUBLIC_IP` | **TTL**: `3600`
5. दूसरा A Record:
   - **Type**: `A` | **Name**: `www` | **Points to**: `YOUR_EC2_PUBLIC_IP` | **TTL**: `3600`
6. **Add Record** पर क्लिक करके सेव करें।

---

## 🛠️ चरण 3: EC2 सर्वर में लॉगिन करके एनवायरनमेंट सेटअप करें

अपने लैपटॉप के टर्मिनल / कमांड प्रॉम्प्ट से SSH के ज़रिए लॉगिन करें:

```bash
# 1. Key file की परमिशन बदलें
chmod 400 hiddenindia-key.pem

# 2. Server में SSH लॉगिन करें (YOUR_EC2_PUBLIC_IP की जगह अपना सर्वर IP डालें)
ssh -i hiddenindia-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

सर्वर के अंदर पहुँचने के बाद, **Node.js, Docker, PM2 और Nginx** इंस्टॉल करें:

```bash
# System Updates
sudo apt update && sudo apt upgrade -y

# Node.js 22 & Build Tools
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git certbot python3-certbot-nginx

# Install PM2 Process Manager
sudo npm install -g pm2
```

---

## 📦 चरण 4: Git Code Push, Clone और Production Build (विस्तृत 5 स्टेप्स)

### 🔹 Sub-Step 4.1: (अपने लैपटॉप पर) प्रोजेक्ट को GitHub पर पुश करें
यदि कोड अभी तक GitHub पर नहीं है, तो अपने लैपटॉप के प्रोजेक्ट फोल्डर में यह चलाएं:

```bash
git init
git add .
git commit -m "Production release of HiddenIndia.online"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/hidden-india-website.git
git push -u origin main
```

---

### 🔹 Sub-Step 4.2: (AWS EC2 सर्वर पर) कोड क्लोन करें
अब अपने AWS EC2 सर्वर में टर्मिनल पर यह कमांड चलाएं:

```bash
# GitHub से प्रोजेक्ट क्लोन करें
git clone https://github.com/YOUR_GITHUB_USERNAME/hidden-india-website.git

# प्रोजेक्ट फोल्डर के अंदर जाएं
cd hidden-india-website
```

---

### 🔹 Sub-Step 4.3: Dependencies और Prisma Client इंस्टॉल करें

```bash
# सभी आवश्यक पैकेज इंस्टॉल करें
npm install

# Prisma Database Client जनरेट करें
npx prisma generate
```

---

### 🔹 Sub-Step 4.4: `.env` एनवायरनमेंट फ़ाइल बनाएं

```bash
# टेंप्लेट फ़ाइल को .env नाम से कॉपी करें
cp .env.example .env

# फ़ाइल को एडिट करने के लिए खोलें
nano .env
```

`nano` एडिटर खुलने पर अपने डेटाबेस URL और सीक्रेट कीज दर्ज करें:
- एडिट करने के बाद सेव करने के लिए: **`Ctrl + O`** ➔ दबाएं **`Enter`**
- बाहर निकलने के लिए: **`Ctrl + X`**

---

### 🔹 Sub-Step 4.5: Next.js Production Build बनाएं

```bash
# प्रोजेक्ट की ऑप्टिमाइज्ड प्रॉडक्शन बिल्ड तैयार करें
npm run build
```

जब टर्मिनल में `✓ Compiled successfully` और `Generating static pages (18/18)` लिखा आ जाए, तो आपकी बिल्ड 100% तैयार है!

---

## ⚡ चरण 5: PM2 के साथ ऐप को बैकग्राउंड में स्टार्ट करें

```bash
# PM2 से App स्टार्ट करें
pm2 start npm --name "hiddenindia" -- run start

# Auto-restart on server reboot enable करें
pm2 save
pm2 startup
```

---

## 🛡️ चरण 6: Nginx Reverse Proxy & Free SSL (HTTPS) कॉन्फ़िगर करें

### 1. Nginx Config File बनाएं:
```bash
sudo nano /etc/nginx/sites-available/hiddenindia
```

नीचे दिया गया कोड पेस्ट करें (अपने डोमेन नेम से `yourdomain.com` रिप्लेस करें):

```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. Nginx एक्टिवेट करें:
```bash
sudo ln -s /etc/nginx/sites-available/hiddenindia /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. नि:शुल्क SSL Certificate (HTTPS 🔒) चालू करें:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

बधाई हो! आपकी वेबसाइट अब सुरक्षा ताले (SSL 🔒) के साथ अपने डोमेन पर **https://yourdomain.com** पर लाइव हो जाएगी! 🚀

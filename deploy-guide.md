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
7. **Launch Instance** पर क्लिक करें और अपने सर्वर का **Public IP** नोट कर लें।

---

## 🔄 भविष्य में कोड अपडेट करके Server पर लाइव करने का 3-Step तरीका (Redeployment Workflow)

जब भी आप अपने लैपटॉप पर नया कोड बदलें या नया फ़ीचर जोड़ें, तो सर्वर पर लाइव करने के लिए केवल ये 3 स्टेप्स फॉलो करें:

### 🔹 Step 1: (अपने लैपटॉप पर) कोड Git में Push करें
```bash
git add .
git commit -m "Added new features to website"
git push origin main
```

---

### 🔹 Step 2: (AWS EC2 सर्वर पर) कोड Pull करें
टर्मिनल से EC2 सर्वर में लॉगिन करके यह चलाएं:
```bash
cd hidden-india
git pull origin main
```

---

### 🔹 Step 3: (AWS EC2 सर्वर पर) Rebuild & PM2 Restart करें
```bash
npm run build
pm2 restart hiddenindia
```

**बधाई हो!** मात्र 30 सेकंड में बिना किसी डाउनटाइम के आपकी लाइव वेबसाइट अपडेट हो जाएगी! 🚀






/////////////////ab live kerne ke liye mujhe ye follow kerna honga////////////
भविष्य में जब भी आप अपने लैपटॉप पर कोड में कोई बदलाव करें या नया फ़ीचर जोड़कर सर्वर पर दोबारा लाइव (Re-deploy) करना चाहें, तो आपको केवल यह 3-स्टेप (30 सेकंड) का आसान तरीका फॉलो करना होगा:

🔄 Future Redeployment Workflow (केवल 3 स्टेप्स):
🔹 Step 1: (अपने लैपटॉप के टर्मिनल से) कोड GitHub पर पुश करें
bash
git add .
git commit -m "Added new features to website"
git push origin main
🔹 Step 2: (AWS EC2 सर्वर में) नया कोड Pull करें
अपने AWS EC2 सर्वर में SSH टर्मिनल से लॉगिन करें और यह कमांड चलाएं:

bash
cd hidden-india
git pull origin main
🔹 Step 3: (AWS EC2 सर्वर में) Build बनाकर Restart करें
bash
npm run build
pm2 restart hiddenindia
🎉 बस हो गया! मात्र 30 सेकंड में बिना किसी डाउनटाइम (Zero Downtime) के आपकी लाइव वेबसाइट पर नए बदलाव और नए फ़ीचर्स तुरंत अपडेट हो जाएंगे! 🚀


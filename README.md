# ระบบแลกเปลี่ยน Cryptocurrencies


## Tools & Frameworks
- Node.js + Express
- MySQL
- Sequelize CLI
- Postman

## ขั้นตอนการเริ่ม + รัน project

### 1. ติดตั้ง dependencies
```bash
npm install express sequelize mysql2
npm install --save-dev sequelize-cli
```

### 2. เพิ่ม Database ใน MySQL
สามารถใช้ไฟล์จาก `database/cryptocurrency.sql`


### 3. ตั้งค่า config/config.json ให้เชื่อมกับฐานข้อมูล
```bash
"development": {
  "username": "root",
  "password": "",
  "database": "cryptocurrency",
  "host": "127.0.0.1",
  "port": "{port number}",
  "dialect": "mysql"
}
```


### 4. รันคำสั่ง seed
รันเพื่อเพิ่มข้อมูลตัวอย่าง
```bash
npx sequelize-cli db:seed:all
```

### 5. Run Server
```bash
node app.js
```


## API / JSON สำหรับทดสอบ

### Use Case 1: การสร้างบัญชีผู้ใช้
POST: `http://127.0.0.1:3000/users/register`

JSON:
```bash
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "hashedpassword3"
}
```

### Use Case 2: การฝากเงินเข้า wallet (THB)
POST: `http://127.0.0.1:3000/fiat-wallets/deposit`

JSON:
```bash
{
  "user_id": 1,
  "amount": 5000
}
```

### Use Case 3: การซื้อเหรียญ
POST: `http://127.0.0.1:3000/orders/buy`

JSON:
```bash
{
  "user_id": 1,
  "currency_id": 2, // BTC
  "amount": 2,
  "price_per_unit": 1000
}
```

### Use Case 4: การขายเหรียญ
POST: `http://127.0.0.1:3000/orders/sell`

JSON:
```bash
{
  "user_id": 1,
  "currency_id": 2, // BTC
  "amount": 1,
  "price_per_unit": 1000
}
```

### Use Case 5: การโอนเหรียญ ระหว่าง users
POST: `http://127.0.0.1:3000/crypto-wallets/transfer`

JSON:
```bash
{
  "from_user_id": 1,
  "to_user_id": 2,
  "currency_id": 2, // BTC
  "amount": 0.5
}
```

### Use Case 6: การถอนเงินออกจาก wallet (THB)
POST: `http://127.0.0.1:3000/fiat-wallets/withdraw`

JSON:
```bash
{
  "user_id": 1,
  "amount": 500
}
```

## ระบบรองรับการเพิ่มสกุลเงิน Fiat เช่น USD ผ่าน seeders/ → แต่ในการทดสอบใช้ THB เป็น default
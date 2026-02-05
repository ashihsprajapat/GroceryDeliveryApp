# 🛒 Grocery Food Delivery App

A full-stack **grocery delivery platform** that connects **users** and **sellers** with role-based access, secure online payments, and AI-powered image handling.  
Built for speed, scalability, and a seamless shopping experience.

---

## 🚀 Features

- 👥 **Role-Based Access Control (RBAC)**  
  Separate dashboards and privileges for **users** and **sellers**.

- 🧾 **Product & Order Management**  
  Sellers can add, update, and manage products; users can view, add to cart, and place orders.

- 💳 **Secure Online Payments**  
  Integrated **Razorpay API** for safe and smooth payment transactions.

- 🧠 **AI-Powered Background Removal**  
  Product images are automatically enhanced using **ClipDrop API**.

- 📦 **Smart Cart & Checkout Flow**  
  Users can manage their cart and track order status in real-time.

- 🔍 **Search & Filter Functionality**  
  Quick and easy product discovery with dynamic filters.

- 📱 **Fully Responsive Design**  
  Optimized for mobile, tablet, and desktop experiences.

- 🌐 **RESTful API Architecture**  
  Clean, modular, and scalable backend services.

---

## 🛠️ Technologies Used

**Frontend:**
- React.js  
- React Router  
- Axios  
- Tailwind CSS / Material UI  

**Backend:**
- Node.js  
- Express.js  
- MongoDB (Mongoose ODM)  
- RESTful APIs  
- JWT & bcrypt for authentication  
- dotenv & CORS  

**Third-Party Integrations:**
- Razorpay API (Secure Payments)  
- ClipDrop API (AI Background Removal)

## 🔧 Frontend Environment Setup (Vite)

Create a `.env` file inside the **frontend** folder.

### 📄 `frontend/.env`

```env
VITE_CURRENCY=$
VITE_BACKEND_URL=http://localhost:8088


###🔧 Backend Environment Setup (Node.js)
PORT=8088

MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SELLER_EMAIL=your_seller_email
SELLER_PASSWORD=your_seller_password

JWT_SECRET=your_jwt_secret_key

MODE_DEV=true
PRODUCTION=false

ALLOWEDORIGIN=http://localhost:5173

STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key





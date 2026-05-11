# OfficialToolStore - Frontend Client

This is the React frontend for **OfficialToolStore**, a premium digital storefront for software, accounts, and subscriptions.

## 🚀 Features
- **Responsive Design**: Modern and clean UI that works across all devices.
- **Multilingual Support**: Supports both English and Bengali (BN) languages.
- **Admin Panel**: Built-in, secure admin panel to manage products and reviews dynamically.
- **Dynamic Content**: Fetches live product categories, options, and stock from the MongoDB backend.
- **Shopping Cart**: Fully functional cart using React Context.

## 🛠️ Technology Stack
- **React.js** (Vite)
- **React Router DOM** (Multi-page routing)
- **Vanilla CSS** (Custom styling without heavy frameworks)
- **Vercel** (Live deployment)

## ⚙️ Environment Variables
Create a `.env.local` file in the root directory:
```env
# The URL of your live or local backend API
VITE_API_URL=https://dizi-tool-server.vercel.app
```

## 🚀 Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *The client will start on `http://localhost:5173`.*

## 🌐 Deployment
This project is configured to run flawlessly on Vercel. 
A `vercel.json` file is included in the root directory to properly route Single Page Application (SPA) requests and prevent 404 errors on page refresh.

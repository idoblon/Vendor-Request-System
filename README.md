# Vendor Request System

A comprehensive multi-role platform connecting **Vendors**, **Centers**, and **Admins** for managing product orders, applications, and business operations.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 🌟 Features

### For Vendors
- 📊 **Revenue Ranking System** - Real-time position tracking with trophy icons for top performers
- 🛒 **Order Management** - Browse products, create orders, track order status
- 💰 **Financial Dashboard** - View total revenue, commissions, and discounts
- 📈 **Performance Metrics** - Track total orders, centers served, and ranking percentile
- 💬 **Messaging System** - Communicate with centers and admins

### For Centers
- 📦 **Product Inventory** - Add, edit, and manage product catalog
- 🏪 **Order Processing** - Approve/reject vendor orders
- 👥 **Vendor Management** - View connected vendors and order history
- 💵 **Commission Tracking** - Monitor commission payments to admin
- 📊 **Sales Analytics** - Track total sales and inventory

### For Admins
- 👨‍💼 **Application Management** - Review and approve vendor/center applications
- 📊 **System Overview** - Monitor total vendors, centers, and pending applications
- 💰 **Commission Management** - Track total commission revenue
- 📧 **Communication Hub** - Message all users
- 🏆 **Vendor Rankings** - View all vendor rankings by revenue

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **File Upload**: Multer
- **Email**: Nodemailer (configured for Gmail)
- **Payment**: Stripe integration

### Frontend
- **Framework**: React 18.2
- **UI Library**: React Bootstrap + Bootstrap 5
- **Routing**: React Router DOM v7
- **Forms**: Formik + Yup validation
- **Icons**: React Icons
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager
- Git

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/idoblon/Vendor-Request-System.git
cd Vendor-Request-System
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/vendor-request-system

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Stripe (Optional)
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Gmail (Optional - for email notifications)
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_gmail_app_password
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token
```

### 4. Start the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

#### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
Vendor-Request-System/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── orderController.js    # Order & ranking logic
│   │   ├── productController.js  # Product management
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── roleAuth.js           # Role-based access control
│   ├── models/
│   │   ├── User.js               # User model (vendor/center/admin)
│   │   ├── Order.js              # Order model
│   │   ├── Product.js            # Product model
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── orders.js             # Order routes
│   │   └── ...
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/             # Login & registration
│   │   │   ├── dashboard/        # Role-specific dashboards
│   │   │   ├── forms/            # Application forms
│   │   │   └── routing/          # Protected routes
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── hooks/
│   │   │   └── useRoleAccess.js  # Role access hook
│   │   ├── App.js                # Main app component
│   │   └── index.js              # React entry point
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

## 🔐 User Roles

### Vendor
- Register and submit application with business details
- Browse products from centers
- Create and manage orders
- View revenue ranking and performance metrics
- Track commissions and discounts

### Center
- Register and submit application with category
- Manage product inventory
- Process vendor orders (approve/reject)
- View connected vendors
- Track sales and commission payments

### Admin
- Review and approve/reject applications
- Monitor system-wide statistics
- View all vendor rankings
- Manage communications
- Track total commission revenue

## 🎯 Key Features Explained

### 1. Vendor Revenue Ranking System

The system automatically calculates vendor rankings based on total revenue from completed orders:

- **Real-time Updates**: Rankings update as orders are completed
- **Visual Indicators**: Trophy icons for top 3 vendors
- **Performance Metrics**: Shows rank, percentile, revenue gap to next rank
- **MongoDB Aggregation**: Efficient calculation using database aggregation pipeline

**API Endpoints:**
- `GET /api/orders/my-ranking` - Get current vendor's ranking
- `GET /api/orders/vendor-rankings` - Get all vendor rankings (admin)

### 2. Dynamic Discount System

Discounts are automatically applied based on location:
- **Same District**: 10% discount
- **Different District**: 5% discount

### 3. Commission System

- **Rate**: 5% commission on final order amount
- **Tracking**: Automatically calculated and tracked per order
- **Reports**: Viewable by vendors and centers

### 4. Product Image Handling

- **Fallback System**: Uses Picsum Photos for missing images
- **Error Handling**: Prevents flickering with two-level fallback
- **Placeholder**: Shows product name on colored background if all fails

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
GET    /api/auth/user              # Get current user
```

### Orders
```
GET    /api/orders                 # Get vendor orders
POST   /api/orders                 # Create new order
GET    /api/orders/stats           # Get order statistics
GET    /api/orders/my-ranking      # Get vendor ranking
GET    /api/orders/vendor-rankings # Get all rankings (admin)
PUT    /api/orders/:id/payment     # Update payment status
```

### Products
```
GET    /api/products               # Get all products
POST   /api/products               # Create product (center)
PUT    /api/products/:id           # Update product
DELETE /api/products/:id           # Delete product
```

### Applications
```
GET    /api/applications           # Get all applications (admin)
POST   /api/applications           # Submit application
PUT    /api/applications/:id       # Update application status
```

## 🧪 Testing

Currently, the project does not have automated tests. To test manually:

1. **Create Test Users**: Register vendors, centers, and admin
2. **Test Workflows**: 
   - Vendor registration → application approval → order creation
   - Center product management → order processing
   - Admin application review → system monitoring
3. **Test Rankings**: Create multiple vendors with different order volumes

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables in hosting platform
2. Ensure MongoDB connection string is correct
3. Deploy backend code
4. Note the backend URL

### Frontend Deployment (Vercel/Netlify)

1. Update API base URL in frontend code
2. Build the production bundle: `npm run build`
3. Deploy the `build` folder
4. Configure proxy settings if needed

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **idoblon** - [GitHub Profile](https://github.com/idoblon)

## 🙏 Acknowledgments

- React Bootstrap for UI components
- MongoDB for database
- Express.js for backend framework
- All open-source contributors

## 📧 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

## 🔮 Future Enhancements

- [ ] Real-time notifications using Socket.io
- [ ] Advanced analytics and reporting
- [ ] Email notification system
- [ ] Payment gateway integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Export data to CSV/PDF
- [ ] Two-factor authentication
- [ ] Product reviews and ratings

---

**Made with ❤️ for efficient vendor-center management**

# Vendor Request System (VRS)

A modern, full-featured vendor management system built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Authentication & User Management
- ✅ User login and registration
- ✅ JWT token-based authentication
- ✅ Protected routes
- ✅ Session persistence
- ✅ Password change functionality
- ✅ User profile management

### Product Management
- ✅ Add products with image upload and preview
- ✅ Edit products inline
- ✅ Delete products with confirmation
- ✅ Search products by name/description
- ✅ Filter by category
- ✅ Pagination (10 items per page)
- ✅ Stock management with low stock warnings
- ✅ Discount management
- ✅ Product categories: Electronics, Accessories, Clothing, Food, Books, Other

### Order Management
- ✅ View all orders
- ✅ Search orders by customer, email, or order ID
- ✅ Filter by status (pending, processing, completed, cancelled)
- ✅ Update order status inline
- ✅ View detailed order information
- ✅ Delete orders
- ✅ Order item breakdown with discounts
- ✅ Total amount calculations

### Discount Products
- ✅ View all discounted products
- ✅ Search discount products
- ✅ Display savings and discounted prices
- ✅ Low stock indicators

### Dashboard
- ✅ Sales analytics overview
- ✅ Product statistics
- ✅ Order statistics
- ✅ Pending orders tracking

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.1.0
- **Language:** TypeScript 4.9.5
- **Styling:** Tailwind CSS 3.3.0
- **Routing:** React Router DOM 6.30.0
- **Build Tool:** Create React App
- **State Management:** React Context API
- **Storage:** LocalStorage (mock backend)

## 📁 Project Structure

```
vendor-request-system/
├── public/
│   ├── index.html
│   ├── vrslogo.png
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Layout.tsx
│   │   ├── Login.tsx
│   │   ├── Logout.tsx
│   │   ├── Register.tsx
│   │   └── OrderDetailsModal.tsx
│   ├── pages/
│   │   ├── AddProduct.tsx
│   │   ├── AllProducts.tsx
│   │   ├── DiscountProducts.tsx
│   │   ├── Orders.tsx
│   │   ├── Payments.tsx
│   │   └── Profile.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   ├── productService.ts
│   │   └── orderService.ts
│   ├── types/
│   │   ├── product.ts
│   │   └── order.ts
│   ├── utils/
│   │   ├── priceUtils.ts
│   │   └── orderUtils.ts
│   ├── constants/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vendor-request-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App.

## 🔐 Authentication

The system uses a mock authentication system with localStorage. For production:

1. Replace mock API calls in `AuthContext.tsx`
2. Implement real JWT token handling
3. Add token refresh logic
4. Connect to your backend API

## 💾 Data Storage

Currently uses **localStorage** for data persistence (mock backend). To integrate with a real backend:

1. Update service files in `src/services/`:
   - `productService.ts`
   - `orderService.ts`
2. Replace mock API calls with actual HTTP requests
3. Add proper error handling
4. Implement API authentication headers

## 🎨 Styling

- **Framework:** Tailwind CSS
- **Theme:** Dark mode (gray-900/gray-800)
- **Colors:**
  - Primary: Blue (blue-500)
  - Success: Green (green-500)
  - Warning: Yellow (yellow-500)
  - Danger: Red (red-500)

## 🔑 Key Features Implementation

### Protected Routes
```typescript
<ProtectedRoute>
  <Layout>
    <Dashboard />
  </Layout>
</ProtectedRoute>
```

### Product CRUD
- Create: Form validation, image preview
- Read: Search, filter, pagination
- Update: Inline editing
- Delete: Confirmation dialog

### Order Status Flow
```
Pending → Processing → Completed
                    ↓
                Cancelled
```

## 📊 Constants

Located in `src/constants/index.ts`:
- `CATEGORIES`: Product categories
- `ORDER_STATUSES`: Order status types
- `ITEMS_PER_PAGE`: Pagination limit (10)
- `LOW_STOCK_THRESHOLD`: Stock warning level (10)

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Deploy the `build` folder to your hosting service:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## 🔧 Configuration

### Tailwind CSS
Configure in `tailwind.config.js`

### TypeScript
Configure in `tsconfig.json`

### PostCSS
Configure in `postcss.config.js`

## 📝 Environment Variables

Create `.env` file for environment-specific configs:
```env
REACT_APP_API_URL=your_api_url
REACT_APP_API_KEY=your_api_key
```

## 🐛 Known Issues

- Image upload stores base64 in localStorage (use cloud storage for production)
- Mock authentication (implement real backend)
- No pagination on orders page (add if needed)

## 🔮 Future Enhancements

- [ ] Payment integration
- [ ] Email notifications
- [ ] Export data (CSV/PDF)
- [ ] Advanced analytics
- [ ] Multi-vendor support
- [ ] Real-time updates (WebSocket)
- [ ] Mobile app
- [ ] Admin dashboard
- [ ] Inventory alerts
- [ ] Customer reviews

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for Create React App
- Tailwind CSS for the styling framework
- React Router for routing solution

## 📞 Support

For support, email support@vrs.com or open an issue in the repository.

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**

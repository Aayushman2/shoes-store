import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import ProductForm from './pages/admin/ProductForm';
import AdminLayout from './components/layout/AdminLayout';
import PublicStore from './components/PublicStore';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout Wrappers
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-gray-50 selection:bg-indigo-100 selection:text-indigo-900">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/store" element={<PublicStore />} /> {/* Public Store route */}
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="product/new" element={<ProductForm />} />
        <Route path="product/edit/:id" element={<ProductForm />} />
      </Route>
    </Routes>
  );
}

export default App;

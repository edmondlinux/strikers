import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import InventoryPage from "./pages/InventoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import ContactPage from "./pages/ContactPage";
import ContactInfoPage from "./pages/ContactInfoPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCartStore } from "./stores/useCartStore";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import FloatingTelegramButton from "./components/FloatingTelegramButton";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;
		getCartItems();
	}, [getCartItems, user]);

	useEffect(() => {
		// Register service worker for PWA
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/sw.js')
					.then((registration) => {
						console.log('SW registered: ', registration);
					})
					.catch((registrationError) => {
						console.log('SW registration failed: ', registrationError);
					});
			});
		}
	}, []);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.3)_0%,rgba(153,27,27,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-10 min-h-screen flex flex-col'>
				<Navbar />

				<main className='flex-1'>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
						<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
						<Route path='/admin-dashboard' element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />} />
						<Route path='/inventory' element={<InventoryPage />} />
						<Route path='/product/:id' element={<ProductDetailsPage />} />
						<Route path='/category/:category' element={<CategoryPage />} />
						<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
						<Route path='/orders' element={user ? <OrdersPage /> : <Navigate to='/login' />} />
						<Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />} />
						<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
						<Route path='/contact' element={<ContactInfoPage />} />
						<Route path='/contact/:productId' element={<ContactPage />} />
						<Route path="/payment" element={<PaymentMethodsPage />} />
					</Routes>
				</main>

				<Footer />
			</div>

			<Toaster />
			<PWAInstallPrompt />
			<FloatingTelegramButton />
			<FloatingWhatsAppButton />
		</div>
	);
}

export default App;

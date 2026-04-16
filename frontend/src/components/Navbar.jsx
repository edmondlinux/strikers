import {
	Car,
	Phone,
	MapPin,
	LogIn,
	LogOut,
	Shield,
	Menu,
	X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md shadow-xl z-50 transition-all duration-300 border-b border-red-600">
			<div className="container mx-auto px-4 py-3">
				{/* Top bar with contact info */}
				<div className="hidden md:flex justify-between items-center text-sm text-gray-300 pb-2 border-b border-gray-700">
					<div className="flex items-center space-x-6">
						
						<div className="flex items-center space-x-2">
							<MapPin size={14} />
							<span></span>
						</div>
					</div>
					<div className="text-red-400 font-medium">
						we've got what you need to get back on the road 
					</div>
				</div>

				{/* Main navigation */}
				<div className="flex justify-between items-center pt-2">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center space-x-3"
						onClick={closeMenu}
					>
						<Car className="text-red-500" size={32} />
						<div>
							<h1 className="text-2xl font-bold text-white">STRIKERS</h1>
							<p className="text-xs text-red-400 font-medium">NO TITLE CARS</p>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex flex-wrap items-center gap-6">
						<Link
							to="/"
							className="text-gray-300 hover:text-red-400 transition duration-300 font-medium"
						>
							Home
						</Link>
						<Link
							to="/inventory"
							className="text-gray-300 hover:text-red-400 transition duration-300 font-medium"
						>
							Inventory
						</Link>
						
						
						<Link
							to="/payment"
							className="text-gray-300 hover:text-red-400 transition duration-300 font-medium"
						>
							Payments
						</Link>

						<Link
							to="/contact"
							className="text-gray-300 hover:text-red-400 transition duration-300 font-medium"
						>
							Contact
						</Link>
						{isAdmin && (
							<Link
								className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
								to="/admin-dashboard"
							>
								<Shield className="inline-block mr-2" size={18} />
								<span className="hidden sm:inline">Admin</span>
							</Link>
						)}
						{user ? (
							<button
								className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
								onClick={logout}
							>
								<LogOut size={18} />
								<span className="hidden sm:inline ml-2">Log Out</span>
							</button>
						) : (
							<Link
								to="/login"
								className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
							>
								<LogIn className="mr-2" size={18} />
								Login
							</Link>
						)}
					</nav>

					{/* Mobile menu button */}
					<button
						className="md:hidden text-white p-2 rounded-md hover:bg-gray-800 transition duration-300"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation Menu */}
				<div
					className={`md:hidden transition-all duration-300 ease-in-out ${
						isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
					} overflow-hidden`}
				>
					<nav className="flex flex-col space-y-4 pt-4 pb-2 border-t border-gray-700 mt-3">
						<Link
							to="/"
							className="text-gray-300 hover:text-red-400 transition duration-300 font-medium py-2"
							onClick={closeMenu}
						>
							Home
						</Link>
						<Link
							to="/inventory"
							className="text-gray-300 hover:text-red-400 transition duration-300 font-medium py-2"
							onClick={closeMenu}
						>
							Inventory
						</Link>
						<Link
							to="/payment"
							className="text-gray-300 hover:text-red-400 transition duration-300 font-medium py-2"
							onClick={closeMenu}
						>
							Payments
						</Link>

						<Link
							to="/contact"
							className="text-gray-300 hover:text-red-400 transition duration-300 font-medium py-2"
							onClick={closeMenu}
						>
							Contact
						</Link>
						{isAdmin && (
							<Link
								className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
								to="/admin-dashboard"
								onClick={closeMenu}
							>
								<Shield className="inline-block mr-2" size={18} />
								<span>Admin</span>
							</Link>
						)}
						{user ? (
							<button
								className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
								onClick={() => {
									logout();
									closeMenu();
								}}
							>
								<LogOut size={18} />
								<span className="ml-2">Log Out</span>
							</button>
						) : (
							<Link
								to="/login"
								className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
								onClick={closeMenu}
							>
								<LogIn className="mr-2" size={18} />
								Login
							</Link>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;

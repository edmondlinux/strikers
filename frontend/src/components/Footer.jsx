import { Car, Phone, MapPin, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useContactSettingsStore } from "../stores/useContactSettingsStore";
import { useEffect } from "react";

const Footer = () => {
        const { contactSettings, fetchContactSettings } = useContactSettingsStore();

        useEffect(() => {
                fetchContactSettings();
        }, []);

        return (
                <footer className='bg-gray-900 border-t border-gray-800'>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                                {/* Main footer content */}
                                <div className='py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                                        {/* Company info */}
                                        <div className='space-y-6'>
                                                <div className='flex items-center space-x-3'>
                                                        <Car className='text-red-500' size={32} />
                                                        <div>
                                                                <h2 className='text-2xl font-bold text-white'>STRIKERS</h2>
                                                                <p className='text-sm text-red-400 font-medium'>NO TITLE CARS</p>
                                                        </div>
                                                </div>
                                                <p className='text-gray-400 leading-relaxed'>
                                                        Your go to crew for solid whips. We hook you up with clean rides, no matter your credit game.
                                                </p>
                                                <div className='flex space-x-4'>
                                                        <a href="#" className='text-gray-400 hover:text-red-500 transition-colors'>
                                                                <Facebook size={24} />
                                                        </a>
                                                        <a href="#" className='text-gray-400 hover:text-red-500 transition-colors'>
                                                                <Twitter size={24} />
                                                        </a>
                                                        <a href="#" className='text-gray-400 hover:text-red-500 transition-colors'>
                                                                <Instagram size={24} />
                                                        </a>
                                                        <a href="#" className='text-gray-400 hover:text-red-500 transition-colors'>
                                                                <Youtube size={24} />
                                                        </a>
                                                </div>
                                        </div>

                                        {/* Quick links 
                                        <div>
                                                <h3 className='text-lg font-semibold text-white mb-6'>Quick Links</h3>
                                                <ul className='space-y-4'>
                                                        <li><Link to="/inventory" className='text-gray-400 hover:text-red-500 transition-colors'>Browse Inventory</Link></li>
                                                        <li><Link to="/financing" className='text-gray-400 hover:text-red-500 transition-colors'>Financing Options</Link></li>
                                                        <li><Link to="/trade-in" className='text-gray-400 hover:text-red-500 transition-colors'>Trade-In Value</Link></li>
                                                        <li><Link to="/warranty" className='text-gray-400 hover:text-red-500 transition-colors'>Extended Warranty</Link></li>
                                                        <li><Link to="/about" className='text-gray-400 hover:text-red-500 transition-colors'>About Us</Link></li>
                                                        <li><Link to="/testimonials" className='text-gray-400 hover:text-red-500 transition-colors'>Customer Reviews</Link></li>
                                                </ul>
                                        </div> */}

                                        {/* Services 
                                        <div>
                                                <h3 className='text-lg font-semibold text-white mb-6'>Our Services</h3>
                                                <ul className='space-y-4'>
                                                        <li><span className='text-gray-400'>No Title Financing</span></li>
                                                        <li><span className='text-gray-400'>Bad Credit Solutions</span></li>
                                                        <li><span className='text-gray-400'>Quick Approval</span></li>
                                                        <li><span className='text-gray-400'>Vehicle Inspection</span></li>
                                                        <li><span className='text-gray-400'>Service Partnerships</span></li>
                                                        <li><span className='text-gray-400'>Insurance Assistance</span></li>
                                                </ul>
                                        </div>
                                */}

                                        {/* Contact info */}
                                        <div>
                                                <h3 className='text-lg font-semibold text-white mb-6'>Contact Info</h3>
                                                <div className='space-y-4'>


                                                                <div>



                                                        </div>
                                                        <div className='flex items-center space-x-3'>
                                                                <Mail className='text-red-500' size={20} />
                                                                <div>
                                                                        <p className='text-white font-medium'>{contactSettings?.email || 'hfvn637909@gmail.com'}</p>
                                                                        <p className='text-gray-400 text-sm'>Email Us</p>
                                                                </div>
                                                        </div>
                                                        <div className='flex items-center space-x-3'>

                                                        </div>

                                                </div>
                                        </div>
                                </div>

                                {/* Bottom bar */}
                                <div className='py-8 border-t border-gray-800'>
                                        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
                                                <p className='text-gray-400 text-sm'>
                                                        © {new Date().getFullYear()} Strikers No Title Cars. All rights reserved.
                                                </p>
                                                <div className='flex space-x-6 text-sm'>
                                                        <Link to="/privacy" className='text-gray-400 hover:text-red-500 transition-colors'>Privacy Policy</Link>
                                                        <Link to="/terms" className='text-gray-400 hover:text-red-500 transition-colors'>Terms of Service</Link>
                                                        <Link to="/sitemap" className='text-gray-400 hover:text-red-500 transition-colors'>Sitemap</Link>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </footer>
        );
};

export default Footer;

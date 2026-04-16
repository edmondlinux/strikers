'use client';

import { Car, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useContactSettingsStore } from "@/stores/useContactSettingsStore";
import { useEffect } from "react";

const Footer = () => {
	const { contactSettings, fetchContactSettings } = useContactSettingsStore();

	useEffect(() => {
		fetchContactSettings();
	}, []);

	return (
		<footer className='bg-gray-900 border-t border-gray-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
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

					<div>
						<h3 className='text-lg font-semibold text-white mb-6'>Contact Info</h3>
						<div className='space-y-4'>
							<div>
							</div>
							<div className='flex items-center space-x-3'>
								<Mail className='text-red-500' size={20} />
								<div>
									<p className='text-white font-medium'>{contactSettings?.email || 'maun5940@gmail.com'}</p>
									<p className='text-gray-400 text-sm'>Email Us</p>
								</div>
							</div>
							<div className='flex items-center space-x-3'>
							</div>
						</div>
					</div>
				</div>

				<div className='py-8 border-t border-gray-800'>
					<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
						<p className='text-gray-400 text-sm'>
							© {new Date().getFullYear()} Strikers No Title Cars. All rights reserved.
						</p>
						<div className='flex space-x-6 text-sm'>
							<Link href="/privacy" className='text-gray-400 hover:text-red-500 transition-colors'>Privacy Policy</Link>
							<Link href="/terms" className='text-gray-400 hover:text-red-500 transition-colors'>Terms of Service</Link>
							<Link href="/sitemap" className='text-gray-400 hover:text-red-500 transition-colors'>Sitemap</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

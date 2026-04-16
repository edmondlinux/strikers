import {
	ArrowRight,
	Star,
	Award,
	Users,
	Zap,
	Shield,
	Clock,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
	const [displayText, setDisplayText] = useState("");
	const [currentLineIndex, setCurrentLineIndex] = useState(0);
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isInView, setIsInView] = useState(false);
	const sectionRef = useRef(null);

	const lines = [
		{ text: "Premium whips", color: "text-white" },
		{ text: "Registration in the system but all stolen cars", color: "text-red-500" },
		{ text: "No time, let's get you a whip", color: "text-white" },
	];

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// Intersection Observer to detect when component is in view
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
				// Reset animation when coming back into view
				if (entry.isIntersecting && displayText === "") {
					setCurrentLineIndex(0);
					setCurrentCharIndex(0);
					setIsDeleting(false);
					setIsWaiting(false);
				}
			},
			{
				threshold: 0.3, // Trigger when 30% of the component is visible
				rootMargin: "0px 0px -50px 0px" // Add some margin to prevent early triggering
			}
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, [displayText]);

	useEffect(() => {
		// Only run the typing animation if the component is in view
		if (!isInView) return;

		const timeout = setTimeout(
			() => {
				if (isWaiting) {
					setIsWaiting(false);
					if (currentLineIndex === lines.length - 1) {
						setIsDeleting(true);
					} else {
						setCurrentLineIndex(currentLineIndex + 1);
						setCurrentCharIndex(0);
					}
					return;
				}

				const currentLine = lines[currentLineIndex];
				const currentText = currentLine.text;

				if (!isDeleting) {
					if (currentCharIndex < currentText.length) {
						setDisplayText((prev) => prev + currentText[currentCharIndex]);
						setCurrentCharIndex(currentCharIndex + 1);
					} else {
						setIsWaiting(true);
					}
				} else {
					if (displayText.length > 0) {
						setDisplayText((prev) => prev.slice(0, -1));
					} else {
						setIsDeleting(false);
						setCurrentLineIndex(0);
						setCurrentCharIndex(0);
					}
				}
			},
			isDeleting ? 50 : isWaiting ? 1500 : 100,
		);

		return () => clearTimeout(timeout);
	}, [currentCharIndex, currentLineIndex, isDeleting, isWaiting, displayText, isInView]);

	const getColoredText = () => {
		const text = displayText;
		let result = [];
		let currentIndex = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const lineText = line.text;
			const endIndex = currentIndex + lineText.length;

			if (currentIndex < text.length) {
				const visiblePart = text.substring(
					currentIndex,
					Math.min(endIndex, text.length),
				);
				if (visiblePart) {
					result.push(
						<span key={i} className={`${line.color} drop-shadow-lg`}>
							{visiblePart}
						</span>,
					);
				}
				currentIndex = endIndex;
			}
		}

		return result;
	};

	const FloatingElement = ({ children, delay, className }) => (
		<div
			className={`absolute ${className}`}
			style={{
				animation: `float 6s ease-in-out infinite ${delay}s`,
			}}
		>
			{children}
		</div>
	);

	return (
		<section 
			ref={sectionRef}
			className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden min-h-screen"
		>
			{/* Animated Background */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-900 opacity-50"></div>

				{/* Floating Elements */}
				<FloatingElement
					delay={0}
					className="top-20 left-10 text-red-500 opacity-20"
				>
					<Star size={24} />
				</FloatingElement>
				<FloatingElement
					delay={2}
					className="top-40 right-20 text-white opacity-10"
				>
					<Zap size={32} />
				</FloatingElement>
				<FloatingElement
					delay={4}
					className="bottom-40 left-20 text-red-400 opacity-15"
				>
					<Shield size={28} />
				</FloatingElement>
				<FloatingElement
					delay={1}
					className="bottom-20 right-10 text-white opacity-10"
				>
					<Clock size={20} />
				</FloatingElement>

				{/* Mouse Trail Effect */}
				<div
					className="absolute pointer-events-none"
					style={{
						left: mousePosition.x - 50,
						top: mousePosition.y - 50,
						width: 100,
						height: 100,
						background:
							"radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
						borderRadius: "50%",
						transition: "all 0.3s ease",
					}}
				/>
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-8">
						<div>
							<h1 className="text-5xl lg:text-8xl font-bold leading-tight h-[200px] flex items-center overflow-hidden">
								<span className="flex flex-wrap break-words max-w-full">
									{getColoredText()}
									<span className="animate-pulse text-red-500 ml-1 filter drop-shadow-lg">
										|
									</span>
								</span>
							</h1>
							<div className="relative">
								<p className="text-xl text-gray-300 mt-6 leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
									Yo, we got over 1000 happy folks rockin' with us, no cap —
									<span className="text-red-400 font-semibold">
										real easy flex financing too.
									</span>
									And best believe, more than
									<span className="text-white font-bold">500+</span>
									still ridin' with us strong. We just gettin' started.
								</p>
								<div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-red-500 to-transparent opacity-0 animate-[slideRight_1s_ease-out_2s_forwards]"></div>
							</div>
						</div>

						<div className="flex flex-wrap gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_2.5s_forwards]">
							<Link to={"/inventory"}>  <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 relative overflow-hidden">
								<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
								<span className="relative z-10">Check our whips</span>
								<ArrowRight
									size={20}
									className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
								/>
							</button> 
								</Link>
							<Link to={"/payments"}> <button className="group border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden">
								<div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
								<span className="relative z-10">How you droppin’ the cash</span>
							</button> </Link>
						</div>

						<div className="flex items-center space-x-8 pt-8 opacity-0 animate-[fadeInUp_1s_ease-out_3s_forwards]">
							<div className="flex items-center space-x-2 group cursor-pointer hover:scale-110 transition-all duration-300">
								<Star
									className="text-yellow-400 group-hover:rotate-12 transition-transform duration-300"
									size={24}
								/>
								<div>
									<p className="text-white font-semibold group-hover:text-yellow-400 transition-colors duration-300">
										4.8/5
									</p>
									<p className="text-gray-400 text-sm">Customer Rating</p>
								</div>
							</div>
							<div className="flex items-center space-x-2 group cursor-pointer hover:scale-110 transition-all duration-300">
								<Award
									className="text-red-500 group-hover:rotate-12 transition-transform duration-300"
									size={24}
								/>
								<div>
									<p className="text-white font-semibold group-hover:text-red-400 transition-colors duration-300">
										5+ Years
									</p>
									<p className="text-gray-400 text-sm">In Business</p>
								</div>
							</div>
							<div className="flex items-center space-x-2 group cursor-pointer hover:scale-110 transition-all duration-300">
								<Users
									className="text-blue-400 group-hover:rotate-12 transition-transform duration-300"
									size={24}
								/>
								<div>
									<p className="text-white font-semibold group-hover:text-blue-400 transition-colors duration-300">
										500+
									</p>
									<p className="text-gray-400 text-sm">Happy Customers</p>
								</div>
							</div>
						</div>
					</div>

					{/* Hero Visual */}
					<div className="relative opacity-0 animate-[fadeInRight_1s_ease-out_1s_forwards]">
						<div className="relative group">
							{/* Glow Effect */}
							<div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

							{/* Main Image Container */}
							<div className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700 hover:rotate-1">
								<img
									src="https://media-public.canva.com/iduGA/MAEp3-iduGA/1/s.png"
									alt="Drive Your Dream Car"
									className="w-full h-auto rounded-2xl object-cover filter hover:brightness-110 transition-all duration-500"
								/>

								{/* Overlay Effects */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

								{/* Floating Action Badge */}
								<div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm transform rotate-12 hover:rotate-0 transition-transform duration-300 animate-pulse">
									🔥 HOT DEALS
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-20px); }
				}

				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fadeInRight {
					from {
						opacity: 0;
						transform: translateX(50px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes slideRight {
					from {
						opacity: 0;
						transform: translateX(-10px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}
			`}</style>
		</section>
	);
};

export default HeroSection;

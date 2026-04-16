import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
        "pk_test_51KZYccCoOZF2UhtOwdXQl3vcizup20zqKqT9hVUIsVzsdBrhqbUI2fE0ZdEVLdZfeHjeyFXtqaNsyCJCmZWnjNZa00PzMAjlcL"
);

const CRYPTO_WALLETS = [
        {
                name: "USDT (TRC20)",
                address: "TQdbH954hGM4KQt5CWZqgDNGDYuUTZym9b",
                color: "text-green-400",
                note: "Send on TRC20 network only",
        },
        {
                name: "Bitcoin (BTC)",
                address: "147wjRuBmYSSc3zjBfSNB1SLDySmWGXCMD",
                color: "text-orange-400",
                note: "Bitcoin network",
        },
];

const OrderSummary = () => {
        const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
        const [showCrypto, setShowCrypto] = useState(false);
        const [copiedAddress, setCopiedAddress] = useState(null);

        const savings = subtotal - total;
        const formattedSubtotal = subtotal.toFixed(2);
        const formattedTotal = total.toFixed(2);
        const formattedSavings = savings.toFixed(2);

        const handleCopy = (address) => {
                navigator.clipboard.writeText(address);
                setCopiedAddress(address);
                setTimeout(() => setCopiedAddress(null), 2000);
        };

        const handlePayment = async () => {
                const stripe = await stripePromise;
                const res = await axios.post("/payments/create-checkout-session", {
                        products: cart,
                        couponCode: coupon ? coupon.code : null,
                });

                const session = res.data;
                const result = await stripe.redirectToCheckout({
                        sessionId: session.id,
                });

                if (result.error) {
                        console.error("Error:", result.error);
                }
        };

        return (
                <motion.div
                        className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                >
                        <p className='text-xl font-semibold text-emerald-400'>Order summary</p>

                        <div className='space-y-4'>
                                <div className='space-y-2'>
                                        <dl className='flex items-center justify-between gap-4'>
                                                <dt className='text-base font-normal text-gray-300'>Original price</dt>
                                                <dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
                                        </dl>

                                        {savings > 0 && (
                                                <dl className='flex items-center justify-between gap-4'>
                                                        <dt className='text-base font-normal text-gray-300'>Savings</dt>
                                                        <dd className='text-base font-medium text-emerald-400'>-${formattedSavings}</dd>
                                                </dl>
                                        )}

                                        {coupon && isCouponApplied && (
                                                <dl className='flex items-center justify-between gap-4'>
                                                        <dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
                                                        <dd className='text-base font-medium text-emerald-400'>-{coupon.discountPercentage}%</dd>
                                                </dl>
                                        )}
                                        <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
                                                <dt className='text-base font-bold text-white'>Total</dt>
                                                <dd className='text-base font-bold text-emerald-400'>${formattedTotal}</dd>
                                        </dl>
                                </div>

                                <motion.button
                                        className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handlePayment}
                                >
                                        Proceed to Checkout
                                </motion.button>

                                {/* Crypto Payment Option */}
                                <div className='border border-gray-600 rounded-lg overflow-hidden'>
                                        <button
                                                onClick={() => setShowCrypto(!showCrypto)}
                                                className='w-full flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 transition-colors text-sm font-medium text-white'
                                        >
                                                <span className='flex items-center gap-2'>
                                                        <span className='text-orange-400 font-bold'>₿</span>
                                                        Pay with Cryptocurrency
                                                </span>
                                                {showCrypto ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>

                                        {showCrypto && (
                                                <div className='bg-gray-800 p-4 space-y-4'>
                                                        <p className='text-gray-400 text-xs'>Send the exact amount to one of the wallets below, then contact us to confirm your payment.</p>
                                                        {CRYPTO_WALLETS.map((wallet) => (
                                                                <div key={wallet.name} className='bg-gray-900 rounded-lg p-3 border border-gray-700'>
                                                                        <div className='flex items-center justify-between mb-1'>
                                                                                <span className={`text-sm font-bold ${wallet.color}`}>{wallet.name}</span>
                                                                                <span className='text-gray-500 text-xs'>{wallet.note}</span>
                                                                        </div>
                                                                        <div className='flex items-center gap-2'>
                                                                                <p className='text-white text-xs font-mono break-all flex-1'>{wallet.address}</p>
                                                                                <button
                                                                                        onClick={() => handleCopy(wallet.address)}
                                                                                        className='flex-shrink-0 text-gray-400 hover:text-white transition-colors'
                                                                                        title='Copy address'
                                                                                >
                                                                                        {copiedAddress === wallet.address
                                                                                                ? <Check size={14} className='text-green-400' />
                                                                                                : <Copy size={14} />
                                                                                        }
                                                                                </button>
                                                                        </div>
                                                                        {copiedAddress === wallet.address && (
                                                                                <p className='text-green-400 text-xs mt-1'>Copied!</p>
                                                                        )}
                                                                </div>
                                                        ))}
                                                        <p className='text-gray-400 text-xs text-center'>
                                                                After sending, contact us at{' '}
                                                                <a href='mailto:hfvn637909@gmail.com' className='text-red-400 hover:underline'>hfvn637909@gmail.com</a>
                                                                {' '}or via Telegram to confirm.
                                                        </p>
                                                </div>
                                        )}
                                </div>

                                <div className='flex items-center justify-center gap-2'>
                                        <span className='text-sm font-normal text-gray-400'>or</span>
                                        <Link
                                                to='/'
                                                className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
                                        >
                                                Continue Shopping
                                                <MoveRight size={16} />
                                        </Link>
                                </div>
                        </div>
                </motion.div>
        );
};
export default OrderSummary;

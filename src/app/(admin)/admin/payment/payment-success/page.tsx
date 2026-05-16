"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle, Send } from "lucide-react";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const PaymentSuccess: React.FC = () => {
    const router = useRouter();
    const { t } = useLocalLanguage();

    const handleSubmitToKitchen = () => {
        router.push("/admin/production");
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

                {/* Left column — Pending Payment */}
                <div className="md:col-span-1">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-3 text-sm">{t.pendingPayment}</h3>
                        <div
                            className="text-white p-4 rounded-xl shadow-sm relative"
                            style={{
                                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)",
                            }}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-sm">Order #1</span>
                                <span
                                    className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                                    style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }}
                                >
                                    {t.paid}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs opacity-80 mb-1">
                                <Clock size={11} />
                                <span>11:05 AM</span>
                            </div>
                            <div className="text-xs opacity-80 mb-2">{t.takeawayOrderType}</div>
                            <div className="text-sm font-semibold">Rp 55,000</div>
                        </div>
                    </div>
                </div>

                {/* Right column — Order Details & Success */}
                <div className="md:col-span-2">
                    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">

                        {/* Header */}
                        <div className="mb-1">
                            <h2 className="text-base font-semibold text-gray-800">Order #1</h2>
                            <p className="text-xs text-gray-400 mt-0.5">jhffv • 11:05 AM</p>
                        </div>

                        {/* Order item + total */}
                        <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
                            <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                                <span>Grilled Chicken×1</span>
                                <span className="font-medium">Rp 55,000</span>
                            </div>

                            <div className="border-t border-dashed border-gray-200 pt-4">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="font-semibold text-gray-800">{t.total}</span>
                                    <span className="text-red-600 font-bold text-xl">Rp 55,000</span>
                                </div>
                            </div>

                            {/* Paid Status Box */}
                            <div
                                className="rounded-xl p-4 mb-4"
                                style={{
                                    backgroundColor: "#ECFDF5",
                                    border: "1px solid #A7F3D0",
                                }}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle size={22} className="text-green-500" fill="#22C55E" stroke="#fff" />
                                    <span className="font-semibold text-green-700 text-sm">{t.paid}</span>
                                </div>
                                <p className="text-xs text-green-600 ml-7.5">{t.paymentMethod}: {t.card}</p>
                            </div>

                            {/* Submit Order to Kitchen Button */}
                            <button
                                onClick={handleSubmitToKitchen}
                                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                                style={{
                                    background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                                    boxShadow: "0 4px 14px rgba(220, 38, 38, 0.3)",
                                }}
                            >
                                <Send size={16} className="-rotate-45" />
                                {t.submitOrderToKitchen}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
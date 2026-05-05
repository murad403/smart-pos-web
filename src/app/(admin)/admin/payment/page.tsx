"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReceiptCustomizationModal from "@/components/modal/ReceiptCustomizationModal";
import { DollarSign, CreditCard, Camera, Clock, Printer } from "lucide-react";
import { FormValues, paymentSchema } from "@/validation/auth.validation";
import Image from "next/image";

const Payment: React.FC = () => {
    const router = useRouter();
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [amountReceivedState, setAmountReceivedState] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer" | "card">("cash");

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: { paymentMethod: "cash", amountReceived: 0 },
    });

    const total = 55000;
    const changeAmount = useMemo(() => Math.max(0, amountReceivedState - total), [amountReceivedState]);

    const handlePaymentMethod = (method: "cash" | "transfer" | "card") => {
        setPaymentMethod(method);
        setValue("paymentMethod", method);
    };

    const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setPaymentProof(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleRemoveProof = () => {
        setPaymentProof(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    const onSubmit = (data: FormValues) => {
        console.log("submit payment", data, paymentProof);
        router.push("/admin/payment/payment-success");
    };

    return (
        <div className="p-4 sm:p-6 min-h-screen bg-[#F5F5F0]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

                {/* Left column — Pending Payment */}
                <div className="md:col-span-1">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Pending Payment</h3>
                        <div className="bg-blue-600 text-white p-4 rounded-xl shadow-sm">
                            <div className="font-semibold text-sm mb-1">Order #1</div>
                            <div className="flex items-center gap-1 text-xs opacity-80 mb-1">
                                <Clock size={11} />
                                <span>09:03 AM</span>
                            </div>
                            <div className="text-xs opacity-80 mb-2">Takeaway</div>
                            <div className="text-sm font-semibold">Rp 55,000</div>
                        </div>
                    </div>
                </div>

                {/* Right column — Payment Form */}
                <div className="md:col-span-2">
                    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">

                        {/* Header */}
                        <div className="flex items-start justify-between mb-1">
                            <div>
                                <h2 className="text-base font-semibold text-gray-800">Order #1</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Grace • 09:03 AM</p>
                            </div>
                        </div>

                        {/* Order item + total */}
                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                                <span>Grilled Chicken×1</span>
                                <span className="font-medium">Rp 55,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-5">
                                <span className="font-semibold text-gray-800">Total</span>
                                <span className="text-blue-600 font-bold text-lg">Rp 55,000</span>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                {/* Payment Method */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Payment Method</label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handlePaymentMethod("cash")}
                                            className={`flex-1 py-3 rounded-xl text-sm font-medium flex flex-col items-center gap-1 transition-all border ${paymentMethod === "cash"
                                                    ? "bg-blue-600 text-white border-blue-600"
                                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                }`}
                                        >
                                            <DollarSign size={16} />
                                            <span>Cash</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handlePaymentMethod("transfer")}
                                            className={`flex-1 py-3 rounded-xl text-sm font-medium flex flex-col items-center gap-1 transition-all border ${paymentMethod === "transfer"
                                                    ? "bg-blue-600 text-white border-blue-600"
                                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                }`}
                                        >
                                            <CreditCard size={16} />
                                            <span>Transfer</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Amount Received */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Amount Received</label>
                                    <input
                                        type="number"
                                        step="1"
                                        value={amountReceivedState}
                                        onChange={(e) => {
                                            const v = Number(e.target.value || 0);
                                            setAmountReceivedState(v);
                                            setValue("amountReceived", v);
                                        }}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    />
                                    {errors.amountReceived && (
                                        <div className="text-xs text-red-500 mt-1">{String(errors.amountReceived?.message)}</div>
                                    )}
                                </div>

                                {/* Change Amount */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Change Amount</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={changeAmount === 0 ? "0" : `Rp ${changeAmount.toLocaleString("id-ID")}`}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500"
                                    />
                                </div>

                                {/* Payment Proof */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Payment Proof</label>
                                    <label className="flex items-center justify-center gap-2 cursor-pointer border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all">
                                        <Camera size={15} className="text-gray-500" />
                                        <span className="text-sm text-gray-500">
                                            {paymentProof ? paymentProof.name : "Take Proof Photo"}
                                        </span>
                                        <input
                                            onChange={handleProofChange}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>

                                    {/* Image Preview */}
                                    {previewUrl && (
                                        <div className="mt-2 relative w-full rounded-xl overflow-hidden border border-gray-200">
                                            <Image
                                                src={previewUrl}
                                                alt="Payment proof preview"
                                                className="w-full max-h-48 object-cover"
                                                width={500}
                                                height={300}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveProof}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-all"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Printer */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Printer</label>
                                    <div className="flex items-center gap-2">
                                        <select
                                            {...register("printer")}
                                            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        >
                                            <option>Kitchen printer</option>
                                            <option>Receipt printer</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => setShowReceiptModal(true)}
                                            className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-all whitespace-nowrap"
                                        >
                                            <Printer size={14} />
                                            Print Receipt
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-1">
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all"
                                    >
                                        Paid
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ReceiptCustomizationModal
                open={showReceiptModal}
                onClose={() => setShowReceiptModal(false)}
                onPrint={(payload) => {
                    console.log("receipt printed with", payload);
                    setShowReceiptModal(false);
                }}
            />
        </div>
    );
};

export default Payment;
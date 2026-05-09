"use client";
import Link from "next/link";
import React, { useState } from "react";
import useLocalLanguage from "@/hooks/useLocalLanguage";

type Order = {
    orderId: string;
    customerName: string;
    tableNumber: number;
    item: string;
    quantity: number;
    amount: number;
    status: "new" | "done";
    paymentStatus: "just_arrived" | "paid";
    time: string;
};

const unpaidOrders: Order[] = [
    {
        orderId: "#01",
        customerName: "Grace",
        tableNumber: 4,
        item: "Nasi Goreng Spesial",
        quantity: 1,
        amount: 45000,
        status: "new",
        paymentStatus: "just_arrived",
        time: "12.45Am",
    },
    {
        orderId: "#01",
        customerName: "Grace",
        tableNumber: 4,
        item: "Nasi Goreng Spesial",
        quantity: 1,
        amount: 45000,
        status: "new",
        paymentStatus: "just_arrived",
        time: "12.45Am",
    },
];

const paidOrders: Order[] = [
    {
        orderId: "#01",
        customerName: "Grace",
        tableNumber: 4,
        item: "Nasi Goreng Spesial",
        quantity: 1,
        amount: 45000,
        status: "done",
        paymentStatus: "paid",
        time: "12.45Am",
    },
    {
        orderId: "#03",
        customerName: "Grace",
        tableNumber: 4,
        item: "Nasi Goreng Spesial",
        quantity: 1,
        amount: 45000,
        status: "done",
        paymentStatus: "paid",
        time: "12.45Am",
    },
];

function formatRupiah(amount: number): string {
    if (amount >= 1000) {
        return `Rp ${amount / 1000}k`;
    }
    return `Rp ${amount}`;
}

function OrderCard({
    order,
    showMarkAsPaid,
}: {
    order: Order;
    showMarkAsPaid: boolean;
}) {
    const { t } = useLocalLanguage();

    return (
        <div className="bg-white rounded-xl border-l-2 border-red-400 px-5 py-4 flex items-start justify-between shadow-sm">
            {/* Left side */}
            <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-medium">
                    {t.orderIdLabel}{" "}
                    <span className="text-gray-600 font-semibold">{order.orderId}</span>
                </span>
                <p className="text-base font-bold text-gray-800">{order.customerName}</p>
                <p className="text-sm text-gray-700">{t.table} {order.tableNumber}</p>
                <p className="text-sm text-gray-700">
                    {order.item} x{order.quantity}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 mt-1">
                    {order.paymentStatus === "just_arrived" ? (
                        <span className="text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-0.5">
                            {t.justArrived}
                        </span>
                    ) : (
                        <span className="text-xs font-semibold text-blue-500 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5">
                            {t.paid}
                        </span>
                    )}
                    <span className="text-xs text-gray-400">{order.time}</span>
                </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end gap-2 min-w-27.5">
                {/* Status badge */}
                <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${order.status === "new"
                        ? "bg-blue-500 text-white"
                        : "bg-pink-500 text-white"
                        }`}
                >
                    {order.status === "new" ? t.newLabel : t.completed}
                </span>

                <span className="text-base font-bold text-gray-800">
                    {formatRupiah(order.amount)}
                </span>

                {showMarkAsPaid ? (
                    <Link href={`/admin/payment/${23}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white text-xs font-semibold rounded-lg px-4 py-2">
                            {t.markAsPaid}
                        </button>
                    </Link>
                ) : (
                    <button className="bg-gray-100 text-gray-500 text-xs font-semibold rounded-lg px-5 py-2 cursor-default">
                        {t.paid}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function OrdersPage() {
    const { t } = useLocalLanguage();
    const [activeTab, setActiveTab] = useState<"paid" | "unpaid">("paid");

    return (
        <div className="max-w-7xl mx-auto min-h-screen px-4 py-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab("paid")}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === "paid"
                        ? "bg-blue-500 text-white shadow"
                        : "bg-white text-gray-500 border border-gray-200"
                        }`}
                >
                    {t.paid}
                </button>
                <button
                    onClick={() => setActiveTab("unpaid")}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === "unpaid"
                        ? "bg-blue-500 text-white shadow"
                        : "bg-white text-gray-500 border border-gray-200"
                        }`}
                >
                    {t.unpaidOrders}
                </button>
            </div>

            {activeTab === "paid" ? (
                <div className="flex flex-col gap-6">
                    {/* Waiting for Payment */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">
                            {t.waitingForPayment}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {unpaidOrders.map((order, idx) => (
                                <OrderCard key={idx} order={order} showMarkAsPaid={true} />
                            ))}
                        </div>
                    </section>

                    {/* Recently Paid */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">
                            {t.recentlyPaid}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {paidOrders.map((order, idx) => (
                                <OrderCard key={idx} order={order} showMarkAsPaid={false} />
                            ))}
                        </div>
                    </section>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {unpaidOrders.map((order, idx) => (
                        <OrderCard key={idx} order={order} showMarkAsPaid={true} />
                    ))}
                </div>
            )}
        </div>
    );
}
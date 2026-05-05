"use client";
import React from "react";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl p-8 shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-2">Payment Successful</h2>
        <p className="text-sm text-gray-600 mb-6">The order has been marked as paid.</p>

        <div className="flex gap-3">
          <Link href="/admin/payment" className="flex-1 py-2 rounded-lg bg-gray-100">Back to Payments</Link>
          <Link href="/admin" className="flex-1 py-2 rounded-lg bg-blue-600 text-white">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { MenuItem } from "../shared/MenuCard";
import useLocalLanguage from "@/hooks/useLocalLanguage";

interface AddOrderModalProps {
  items: MenuItem[];
  onBack: () => void;
  onPayAtCounter: (name: string) => void;
}

const AddOrderModal = ({ items, onBack, onPayAtCounter }: AddOrderModalProps) => {
  const { t } = useLocalLanguage();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(items.map((item) => [item.id, 1]))
  );
  const [customerName, setCustomerName] = useState("");

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 1),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t.yourOrder}</h2>

          {/* Items */}
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                  <p className="text-blue-600 text-sm font-medium">
                    Rp{item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                {/* Qty controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold">
                    {quantities[item.id] || 1}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700"
                  >
                    <Plus size={13} className="text-white" />
                  </button>
                </div>
                <span className="text-gray-900 font-semibold text-sm w-20 text-right">
                  Rp{(item.price * (quantities[item.id] || 1)).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>

          {/* Subtotal / Total */}
          <div className="border-t pt-3 mb-4 space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t.subtotal}</span>
              <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>{t.total}</span>
              <span className="text-blue-600">Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Name input */}
          <div className="mb-5">
            <label className="text-sm text-gray-600 mb-1 block">{t.enterYourName}</label>
            <input
              type="text"
              placeholder={t.yourName}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
            >
              {t.back}
            </button>
            <button
              onClick={() => onPayAtCounter(customerName)}
              className="flex-1 py-2.5 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-all"
            >
              {t.payAtCounter}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderModal;
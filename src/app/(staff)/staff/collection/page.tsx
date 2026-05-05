"use client";
import React, { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import useLocalLanguage from "@/hooks/useLocalLanguage";

type OrderStatus = "ready" | "processing" | "accepted";

interface OrderItem {
  id: string;
  name: string;
  qty: number;
}

interface Order {
  id: string;
  orderNumber: number;
  time: string;
  status: OrderStatus;
  table?: string;
  items: OrderItem[];
  elapsedTime?: string;
  type: "dine-in" | "takeaway";
}

const CollectionPage = () => {
  const { t } = useLocalLanguage();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("ready");
  const [expandedHistory, setExpandedHistory] = useState(false);

  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: 39,
      time: "12:30",
      status: "ready",
      table: "Table 2",
      items: [
        { id: "1a", name: "Curry Noodles", qty: 2 },
        { id: "1b", name: "Fried Rice", qty: 1 },
      ],
      type: "dine-in",
    },
    {
      id: "2",
      orderNumber: 38,
      time: "12:25",
      status: "processing",
      elapsedTime: "7 min 3s",
      table: "Take Away",
      items: [
        { id: "2a", name: "Curry Noodles", qty: 2 },
        { id: "2b", name: "Duck Rice", qty: 1 },
      ],
      type: "takeaway",
    },
    {
      id: "3",
      orderNumber: 38,
      time: "12:20",
      status: "accepted",
      table: "Take Away",
      items: [
        { id: "3a", name: "Curry Noodles", qty: 2 },
        { id: "3b", name: "Fried Rice", qty: 1 },
      ],
      type: "takeaway",
    },
  ];

  const historyOrders = [
    {
      id: "h1",
      orderNumber: 41,
      time: "11:30 AM",
      status: "COMPLETED",
      items: `2 ${t.qty} . ${t.takeawayShort}`,
    },
    {
      id: "h2",
      orderNumber: 44,
      time: "11:25 AM",
      status: "COMPLETED",
      items: `3 ${t.qty} . ${t.delivery}`,
    },
    {
      id: "h3",
      orderNumber: 40,
      time: "11:10 AM",
      status: "COMPLETED",
      items: `2 ${t.qty} . ${t.dineInShort}`,
    },
    {
      id: "h4",
      orderNumber: 36,
      time: "10:50 AM",
      status: "COMPLETED",
      items: `2 ${t.qty} . ${t.delivery}`,
    },
  ];

  const filteredOrders = mockOrders.filter((order) => order.status === orderStatus);

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "ready":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeLabel = (status: OrderStatus) => {
    switch (status) {
      case "ready":
        return t.ready;
      case "processing":
        return t.inProcessing;
      case "accepted":
        return t.toBeAccepted;
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.collection}</h1>
        <p className="text-sm text-gray-600 mt-1">{t.activeOrders}</p>
      </div>

      {/* Order Status Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["ready", "processing", "accepted"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setOrderStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              orderStatus === status
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status === "ready"
              ? t.ready
              : status === "processing"
              ? t.inProcessing
              : t.accepted}
          </button>
        ))}
      </div>

      {/* Orders Container */}
      <div className="space-y-4 mb-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No {getStatusBadgeLabel(orderStatus)} {t.orders}</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`border-l-4 rounded-lg shadow-sm ${
                order.status === "ready"
                  ? "border-red-500 bg-red-50"
                  : order.status === "processing"
                  ? "border-blue-500 bg-blue-50"
                  : "border-orange-500 bg-orange-50"
              }`}
            >
              {/* Order Header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">
                      {order.table} — {order.time}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(order.status)}`}>
                      {getStatusBadgeLabel(order.status)}
                    </span>
                    {order.elapsedTime && (
                      <span className="text-xs text-blue-600 font-medium">
                        {order.elapsedTime}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {t.order} #{order.orderNumber}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell size={20} />
                </button>
              </div>

              {/* Order Items */}
              <div className="px-4 pb-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-gray-600 ml-2">{t.qty}: {item.qty}</span>
                    </div>
                    {order.status === "ready" && (
                      <div className="flex gap-2">
                        <button className="px-3 py-2 cursor-pointer bg-gray-300 text-gray-600 rounded font-medium text-xs hover:bg-gray-400 transition-colors">
                          {t.cancel}
                        </button>
                        <button className="px-3 py-2 cursor-pointer bg-red-600 text-white rounded font-medium text-xs hover:bg-red-700 transition-colors">
                          {t.pickup}
                        </button>
                      </div>
                    )}
                    {order.status === "processing" && (
                      <div className="flex gap-2">
                        <button className="px-3 py-2 cursor-pointer bg-gray-300 text-gray-600 rounded font-medium text-xs hover:bg-gray-400 transition-colors">
                          {t.cancel}
                        </button>
                        <button className="px-3 py-2 cursor-pointer bg-blue-600 text-white rounded font-medium text-xs hover:bg-blue-700 transition-colors">
                          {t.pickup}
                        </button>
                      </div>
                    )}
                    {order.status === "accepted" && (
                      <div className="flex gap-2">
                        <button className="px-3 py-2 cursor-pointer bg-gray-300 text-gray-600 rounded font-medium text-xs hover:bg-gray-400 transition-colors">
                          {t.cancel}
                        </button>
                        <button className="px-3 py-2 cursor-pointer bg-red-600 text-white rounded font-medium text-xs hover:bg-red-700 transition-colors">
                          {t.accepted}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <button
          onClick={() => setExpandedHistory(!expandedHistory)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg  transition-colors"
        >
          <h2 className="font-semibold text-gray-900">{t.orderHistory} (1)</h2>
          <ChevronDown
            size={20}
            className={`text-gray-600 transition-transform ${expandedHistory ? "rotate-180" : ""}`}
          />
        </button>

        {expandedHistory && (
          <div className="border-t border-gray-200 divide-y divide-gray-200">
            {historyOrders.map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {t.order} #{order.orderNumber} <span className="text-gray-600 text-sm ml-2">{order.time}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{order.items}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                    {order.status}
                  </span>
                  <button className="ml-3 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
                    {t.cancel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;

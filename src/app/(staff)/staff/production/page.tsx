"use client";
import React, { useState } from "react";
import { Bell, X, Clock } from "lucide-react";

type StaffRole = "kitchen" | "bar";
type OrderStatus = "new" | "processing" | "completed";

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
  customerName?: string;
  items: OrderItem[];
  elapsedTime?: string;
  type: "dine-in" | "takeaway";
}

const ProductionPage = () => {
  const [staffRole, setStaffRole] = useState<StaffRole>("kitchen");
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("new");

  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: 39,
      time: "12:30",
      status: "new",
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
      status: "completed",
      table: "Take Away",
      items: [
        { id: "3a", name: "Curry Noodles", qty: 2 },
        { id: "3b", name: "Fried Rice", qty: 1 },
      ],
      type: "takeaway",
    },
    {
      id: "4",
      orderNumber: 39,
      time: "12:30",
      status: "processing",
      elapsedTime: "5m 38s",
      table: "Table 4",
      customerName: "Amy",
      items: [
        { id: "4a", name: "Curry Noodles", qty: 2 },
        { id: "4b", name: "Curry Noodles", qty: 2 },
        { id: "4c", name: "Curry Noodles", qty: 2 },
      ],
      type: "dine-in",
    },
  ];

  const filteredOrders = mockOrders.filter((order) => order.status === orderStatus);

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeLabel = (status: OrderStatus) => {
    switch (status) {
      case "new":
        return "NEW ORDER";
      case "processing":
        return "Processing";
      case "completed":
        return "COMPLETED";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Production</h1>
        <div className="flex items-center gap-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <span>System Last</span>
            <span className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
          </button>
          <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Bell size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Staff Role Tabs */}
      <div className="flex gap-2 mb-6">
        {["kitchen", "bar"].map((role) => (
          <button
            key={role}
            onClick={() => setStaffRole(role as StaffRole)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              staffRole === role
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {role === "kitchen" ? "Kitchen Staff" : "Bar Staff"}
          </button>
        ))}
      </div>

      {/* Order Status Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["new", "processing", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setOrderStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              orderStatus === status
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status === "new" ? "New order" : status === "processing" ? "Processing" : "Completed"}
          </button>
        ))}
      </div>

      {/* Orders Container */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No {orderStatus} orders</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className={`border-l-4 rounded-lg shadow-sm ${
              order.status === "new"
                ? "border-red-500 bg-red-50"
                : order.status === "processing"
                ? "border-blue-500 bg-blue-50"
                : "border-green-500 bg-green-50"
            }`}>
              {/* Order Header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">
                      ORDER #{order.orderNumber} — {order.time}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(order.status)}`}>
                      {getStatusBadgeLabel(order.status)}
                    </span>
                    {order.elapsedTime && (
                      <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                        <Clock size={14} />
                        {order.elapsedTime}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {order.customerName ? (
                      <span>{order.table} | {order.customerName}</span>
                    ) : (
                      <span>{order.table}</span>
                    )}
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
                      <span className="text-gray-600 ml-2">Qty: {item.qty}</span>
                    </div>
                    {order.status === "new" && (
                      <div className="flex gap-2">
                        <button className="px-3 cursor-pointer py-2 bg-gray-300 text-gray-600 rounded font-medium text-xs hover:bg-gray-400 transition-colors">
                          CANCEL
                        </button>
                        <button className="px-3 py-2 cursor-pointer bg-red-600 text-white rounded font-medium text-xs hover:bg-red-700 transition-colors">
                          PICKUP
                        </button>
                      </div>
                    )}
                    {order.status === "processing" && (
                      <div className="flex gap-2">
                        <button className="px-3 cursor-pointer py-2 bg-gray-300 text-gray-600 rounded font-medium text-xs hover:bg-gray-400 transition-colors">
                          CANCEL
                        </button>
                        <button className="px-3 py-2 cursor-pointer bg-blue-600 text-white rounded font-medium text-xs hover:bg-blue-700 transition-colors">
                          READY
                        </button>
                      </div>
                    )}
                    {order.status === "completed" && (
                      <button className="px-3 py-2 cursor-pointer bg-green-200 text-green-800 rounded font-medium text-xs hover:bg-green-300 transition-colors">
                        Remind
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductionPage;

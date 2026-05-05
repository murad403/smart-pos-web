"use client";
import React, { useState } from "react";
import { Pencil, Plus, Star } from "lucide-react";
import AddMenuModal from "@/components/modal/AddMenuModal";
import EditMenuModal from "@/components/modal/EditMenuModal";
import { MenuItemFormValues } from "@/validation/settings.validation";

type Category = "Starter" | "Main" | "Dessert" | "Drinks";

type MenuItem = {
  id: string;
  itemNumber: string;
  name: string;
  price: number;
  promoPrice?: number;
  inventory: number;
  stock: number;
  status: string;
  rating?: number;
  image?: string;
  labels?: string[];
};

type Section = {
  id: string;
  title: string;
  layoutType: "Image" | "List";
  items: MenuItem[];
};

const DEMO_IMAGE_ITEMS: MenuItem[] = [
  { id: "1", itemNumber: "01-01", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, labels: ["Must Try"] },
  { id: "2", itemNumber: "01-02", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, labels: ["Must Try"] },
  { id: "3", itemNumber: "01-03", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, labels: ["Must Try"] },
  { id: "4", itemNumber: "01-04", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, labels: ["Must Try"] },
  { id: "5", itemNumber: "01-05", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, labels: ["Must Try"] },
  { id: "6", itemNumber: "01-06", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, labels: ["Must Try"] },
];

const DEMO_LIST_ITEMS: MenuItem[] = [
  { id: "7", itemNumber: "02", name: "Soup", price: 8000, promoPrice: 5000, inventory: 6, stock: 6, status: "On the menu" },
  { id: "8", itemNumber: "03", name: "Cheese Pizza", price: 12000, inventory: 8, stock: 8, status: "On the menu" },
  { id: "9", itemNumber: "04", name: "Nuggets", price: 13000, inventory: 10, stock: 10, status: "On the menu" },
  { id: "10", itemNumber: "05", name: "Curry Chicken Rice", price: 20000, promoPrice: 16000, inventory: 10, stock: 10, status: "On the menu" },
];

const DEMO_SECTIONS: Section[] = [
  { id: "s1", title: "Section 1", layoutType: "Image", items: DEMO_IMAGE_ITEMS },
  { id: "s2", title: "Section 2", layoutType: "List", items: DEMO_LIST_ITEMS },
];

const CATEGORIES: Category[] = ["Starter", "Main", "Dessert", "Drinks"];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={11}
        className={s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}
      />
    ))}
  </div>
);

const ImageCard = ({ item, onEdit }: { item: MenuItem; onEdit: () => void }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
    {/* Image placeholder */}
    <div className="relative w-full h-28 bg-orange-100">
      <div className="absolute top-1.5 left-1.5">
        <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
          Promo 10% OFF
        </span>
      </div>
      {item.labels?.includes("Must Try") && (
        <div className="absolute top-1.5 right-1.5">
          <span className="bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            MUST TRY
          </span>
        </div>
      )}
      <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
        <span className="text-orange-400 text-2xl">🍜</span>
      </div>
    </div>

    {/* Info */}
    <div className="p-2">
      <p className="text-[10px] text-red-500 font-medium">Item # {item.itemNumber}</p>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-red-500 truncate max-w-[80px]">{item.name}</p>
        <p className="text-[11px] font-semibold text-gray-800">Rp{item.price.toLocaleString("id-ID")}</p>
      </div>
      <div className="flex items-center justify-between mt-0.5 text-[9px] text-gray-500">
        <span>Inventory: {item.inventory}</span>
        <span>Stock: {item.stock}</span>
        <span>{item.status}</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-[9px] text-gray-500">
          Promo Price: <span className="font-medium">Rp{(item.promoPrice ?? 0).toLocaleString("id-ID")}</span>
        </p>
        {item.rating && <StarRating rating={item.rating} />}
      </div>
    </div>
  </div>
);

const MenuLayout = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Starter");
  const [sections, setSections] = useState<Section[]>(DEMO_SECTIONS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState<(Partial<MenuItemFormValues> & { imageUrl?: string }) | undefined>();

  const handleSaveItem = (data: MenuItemFormValues & { image?: File | null }) => {
    console.log("New item:", data);
  };

  const handleEditItem = (data: MenuItemFormValues & { image?: File | null }) => {
    console.log("Edited item:", data);
  };

  return (
    <>
      {/* Section title */}
      <div className="mb-3">
        <h2 className="text-base font-bold text-gray-900">Menu</h2>
        <p className="text-xs text-gray-400">Track stock levels and identify shortages</p>
      </div>

      {/* Category tabs + action buttons */}
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeCategory === cat
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all">
            <Plus size={13} />
            Add Category
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-all"
          >
            <Plus size={13} />
            Add Item
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-all">
            Save
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-2xl overflow-hidden">
            {/* Section header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                {section.title} | Layout Type: {section.layoutType}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-all"
                >
                  <Plus size={12} />
                  Add Item
                </button>
                <button className="flex items-center gap-1 text-xs text-blue-600 font-medium border border-blue-200 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
                  <Pencil size={11} />
                  Editing Enabled
                </button>
              </div>
            </div>

            <div className="p-4 bg-white">
              {section.layoutType === "Image" ? (
                /* Image grid layout */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {section.items.map((item) => (
                    <ImageCard
                      key={item.id}
                      item={item}
                      onEdit={() => {
                        setEditTarget({ itemName: item.name, price: item.price });
                        setShowEditModal(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                /* List layout */
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b border-gray-100">
                      <th className="text-left pb-2 font-medium">ID</th>
                      <th className="text-left pb-2 font-medium">Item Name</th>
                      <th className="text-right pb-2 font-medium">Stock</th>
                      <th className="text-right pb-2 font-medium">Price</th>
                      <th className="text-right pb-2 font-medium">Promo Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 text-xs text-gray-500">{item.itemNumber}</td>
                        <td className="py-2 text-xs text-gray-800 font-medium">{item.name}</td>
                        <td className="py-2 text-xs text-gray-600 text-right">{item.stock}</td>
                        <td className="py-2 text-xs text-gray-800 text-right">
                          Rp{item.price.toLocaleString("id-ID")}
                        </td>
                        <td className="py-2 text-xs text-gray-500 text-right">
                          {item.promoPrice ? `Rp${item.promoPrice.toLocaleString("id-ID")}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddMenuModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveItem}
      />
      <EditMenuModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditItem}
        initialData={editTarget}
      />
    </>
  );
};

export default MenuLayout;
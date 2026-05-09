"use client";
import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import food1 from "@/assets/images/food1.jpg";
import food2 from "@/assets/images/food2.png";
import MenuCard, { MenuItem } from "@/components/shared/MenuCard";
import AddOrderModal from "@/components/modal/AddOrderModal";
import useLocalLanguage from "@/hooks/useLocalLanguage";

type Category = "All" | "Starters" | "Mains" | "Drinks" | "Desserts";

const generateItems = (): MenuItem[] => {
  const baseItems: Omit<MenuItem, "id">[] = [
    {
      itemNumber: "01-01",
      name: "Spicy Chicken Noodles",
      price: 15000,
      promoPrice: 13500,
      inventory: 15,
      stock: 0,
      image: food1,
      isPromo: true,
      promoPercent: 10,
      isMustTry: true,
      status: "On the menu",
    },
    {
      itemNumber: "01-01",
      name: "Malibu and Cola Drink Recipe",
      price: 15000,
      promoPrice: 13500,
      inventory: 15,
      stock: 0,
      image: food2,
      isPromo: true,
      promoPercent: 10,
      isMustTry: true,
      status: "On the menu",
    },
  ];

  const items: MenuItem[] = [];
  for (let i = 0; i < 68; i++) {
    const base = baseItems[i % baseItems.length];
    items.push({ ...base, id: `item-${i}` });
  }
  return items;
};

const ALL_ITEMS = generateItems();

const MenuSection = () => {
  const { t } = useLocalLanguage();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const categories: Category[] = ["All", "Starters", "Mains", "Drinks", "Desserts"];

  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSearch = (val: string) => {
    setSearch(val);
  };

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
  };

  const handleSelect = (item: MenuItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id);
      return [...prev, item];
    });
  };

  const handlePayAtCounter = () => {
    setShowModal(false);
    setSelectedItems([]);
  };

  const catLabel = (cat: Category) => {
    const map: Record<Category, string> = {
      All: t.all,
      Starters: t.starters,
      Mains: t.mains,
      Drinks: t.drinks,
      Desserts: t.desserts,
    };
    return map[cat];
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/70 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-6">
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchMenu}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  category === cat
                    ? "border-blue-600 bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {catLabel(cat)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                isSelected={!!selectedItems.find((s) => s.id === item.id)}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom selected bar */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-[60] flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 shadow-lg sm:bottom-0">
          <span className="text-gray-700 font-medium text-sm">
            {selectedItems.length} {t.itemsSelected}
          </span>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
          >
            {t.next} →
          </button>
        </div>
      )}

      {/* Order Modal */}
      {showModal && selectedItems.length > 0 && (
        <AddOrderModal
          items={selectedItems}
          onBack={() => setShowModal(false)}
          onPayAtCounter={handlePayAtCounter}
        />
      )}
    </div>
  );
};

export default MenuSection;
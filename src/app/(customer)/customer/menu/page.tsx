"use client";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import food1 from "@/assets/images/food1.jpg";
import food2 from "@/assets/images/food2.png";
import MenuCard, { MenuItem } from "@/components/shared/MenuCard";
import CustomPagination from "@/components/shared/CustomPagination";
import AddOrderModal from "@/components/modal/AddOrderModal";
import useLocalLanguage from "@/hooks/useLocalLanguage";

const ITEMS_PER_PAGE = 8;

type Category = "All" | "Starters" | "Mains" | "Drinks" | "Desserts";

// Generate demo menu items
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

const Menu = () => {
  const { t } = useLocalLanguage();
  const searchParams = useSearchParams();
  const tableId = searchParams.get("table") || "4";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const categories: Category[] = ["All", "Starters", "Mains", "Drinks", "Desserts"];

  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const handleSelect = (item: MenuItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id);
      return [...prev, item];
    });
  };

  const handlePayAtCounter = (name: string) => {
    setShowModal(false);
    setSelectedItems([]);
    // Handle order submission
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
    <div className="min-h-screen bg-gray-50">
      {/* Table indicator */}
      {tableId && (
        <div className="bg-white border-b px-4 py-2 flex items-center justify-end gap-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            Table {tableId}
          </span>
          <span className="text-gray-600 text-sm font-medium">Table {tableId}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t.searchMenu}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {paginated.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              isSelected={!!selectedItems.find((s) => s.id === item.id)}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Pagination */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Bottom bar */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg px-4 py-3 flex items-center justify-between z-40">
          <span className="text-gray-700 font-medium text-sm">
            {selectedItems.length} {t.itemsSelected}
          </span>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all"
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

export default Menu;
"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddMenuModal from "@/components/modal/AddMenuModal";
import EditMenuModal from "@/components/modal/EditMenuModal";
import { MenuItemFormValues } from "@/validation/settings.validation";
import food1 from "@/assets/images/food1.jpg";
import food2 from "@/assets/images/food2.png";
import { MenuItem, Section } from "@/type/all.type";
import ImageRowCard from "@/components/shared/ImageRowCard";
import ImageListCard from "@/components/shared/ImageListCard";
import ListViewTable from "@/components/shared/ListViewTable";
import SectionHeader from "@/components/shared/SectionHeader";

type Category = "Starter" | "Main" | "Dessert" | "Drinks";


/* ─── Demo Data ─── */
const IMAGE_ROW_ITEMS: MenuItem[] = [
  { id: "1", itemNumber: "01-01", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, image: food1, labels: ["Must Try"] },
  { id: "2", itemNumber: "01-01", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, image: food1, labels: ["Must Try"] },
  { id: "3", itemNumber: "01-01", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, image: food1, labels: ["Must Try"] },
];

const IMAGE_LIST_ITEMS: MenuItem[] = [
  { id: "4", itemNumber: "02-01", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, image: food2, labels: ["Must Try"] },
  { id: "5", itemNumber: "02-02", name: "Spicy Chicken Noodles", price: 15000, promoPrice: 13500, inventory: 15, stock: 0, status: "On the menu", rating: 4, image: food2, labels: ["Must Try"] },
];

const LIST_VIEW_ITEMS: MenuItem[] = [
  { id: "6", itemNumber: "02", name: "Soup", price: 8000, promoPrice: 5000, inventory: 6, stock: 6, status: "On the menu" },
  { id: "7", itemNumber: "03", name: "Cheese Pizza", price: 12000, promoPrice: undefined, inventory: 8, stock: 8, status: "On the menu" },
  { id: "8", itemNumber: "04", name: "Nuggets", price: 13000, promoPrice: undefined, inventory: 10, stock: 10, status: "On the menu" },
  { id: "9", itemNumber: "05", name: "Curry Chicken Rice", price: 20000, promoPrice: 16000, inventory: 10, stock: 10, status: "On the menu" },
];

const DEMO_SECTIONS: Section[] = [
  { id: "s1", title: "Section 1", layoutType: "3 Image Row", items: IMAGE_ROW_ITEMS },
  { id: "s2", title: "Section 2", layoutType: "Image List", items: IMAGE_LIST_ITEMS },
  { id: "s3", title: "Section 3", layoutType: "List View", items: LIST_VIEW_ITEMS },
];

const CATEGORIES: Category[] = ["Starter", "Main", "Dessert", "Drinks"];




const MenuLayout = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Starter");
  const [sections, setSections] = useState<Section[]>(DEMO_SECTIONS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState<
    (Partial<MenuItemFormValues> & { imageUrl?: string }) | undefined
  >();

  const handleSaveItem = (data: MenuItemFormValues & { image?: File | null }) => {
    console.log("New item:", data);
    setShowAddModal(false);
  };

  const handleEditItem = (data: MenuItemFormValues & { image?: File | null }) => {
    console.log("Edited item:", data);
    setShowEditModal(false);
  };

  const renderSectionContent = (section: Section) => {
    switch (section.layoutType) {
      case "3 Image Row":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {section.items.map((item) => (
              <ImageRowCard key={item.id} item={item} />
            ))}
          </div>
        );
      case "Image List":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.items.map((item) => (
              <ImageListCard key={item.id} item={item} />
            ))}
          </div>
        );
      case "List View":
        return <ListViewTable items={section.items} />;
    }
  };

  return (
    <>
      {/* Page title */}
      <div className="mt-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">Menu</h2>
        <p className="text-sm text-gray-400">Track stock levels and identify shortages</p>
      </div>

      {/* Category tabs + action buttons */}
      <div className="flex items-center justify-between gap-2 mb-4 mt-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${activeCategory === cat
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all">
            <Plus size={13} />
            Add New Section
          </button> */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-all"
          >
            <Plus size={13} />
            <span className="whitespace-nowrap">Add Item</span>
          </button>
          <button className="px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-all">
            Save
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-gray-200 rounded-2xl overflow-hidden"
          >
            <SectionHeader
              section={section}
              onAddItem={() => setShowAddModal(true)}
            />
            <div className="p-4 bg-white">
              {renderSectionContent(section)}
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
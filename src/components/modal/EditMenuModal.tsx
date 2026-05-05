/* eslint-disable react-hooks/incompatible-library */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { MenuItemFormValues, menuItemSchema } from "@/validation/settings.validation";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave?: (data: MenuItemFormValues & { image?: File | null }) => void;
  initialData?: Partial<MenuItemFormValues> & { imageUrl?: string };
};

const LABEL_OPTIONS = [
  "Best Seller",
  "Recommended",
  "Favorite",
  "Must Try",
  "New",
  "Vegetarian",
  "Kids Choice",
  "Spicy",
];

const PRODUCTION_DESTINATIONS = ["Kitchen", "Bar", "Pastry", "Grill"];

const EditMenuModal: React.FC<Props> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      itemName: "",
      price: 0,
      productionDestination: "Kitchen",
      inventory: "",
      promoName: "",
      promoPrice: 0,
      labels: [],
      outOfStock: false,
      maxItemsInPacket: undefined,
      choiceSections: undefined,
      sectionName: "",
      maxChoices: undefined,
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedLabels = watch("labels") || [];
  const outOfStock = watch("outOfStock") || false;
  const maxChoices = watch("maxChoices") || 0;

  // Populate form when initialData changes
  useEffect(() => {
    if (initialData && open) {
      reset({
        itemName: initialData.itemName ?? "",
        price: initialData.price ?? 0,
        productionDestination:
          initialData.productionDestination ?? "Kitchen",
        inventory: initialData.inventory ?? "",
        promoName: initialData.promoName ?? "",
        promoPrice: initialData.promoPrice ?? 0,
        labels: initialData.labels ?? [],
        outOfStock: initialData.outOfStock ?? false,
        maxItemsInPacket: initialData.maxItemsInPacket,
        choiceSections: initialData.choiceSections,
        sectionName: initialData.sectionName ?? "",
        maxChoices: initialData.maxChoices,
      });
      if (initialData.imageUrl) {
        setImagePreview(initialData.imageUrl);
      }
    }
  }, [initialData, open, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const toggleLabel = (label: string) => {
    const current = selectedLabels;
    if (current.includes(label)) {
      setValue(
        "labels",
        current.filter((l) => l !== label)
      );
    } else {
      setValue("labels", [...current, label]);
    }
  };

  const onSubmit = (data: MenuItemFormValues) => {
    onSave?.({ ...data, image: imageFile });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-110 max-h-[92vh] overflow-y-auto">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Edit Menu</h2>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Item Name
              </label>
              <input
                {...register("itemName")}
                placeholder="Enter item name"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-400 ${
                  errors.itemName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200"
                }`}
              />
              {errors.itemName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.itemName.message}
                </p>
              )}
            </div>

            {/* Price & Production Destination */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="0"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-400 ${
                    errors.price
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-200"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Production Destination
                </label>
                <select
                  {...register("productionDestination")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#3366CC] text-white font-medium appearance-none cursor-pointer"
                >
                  {PRODUCTION_DESTINATIONS.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inventory */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Inventory (Optional)
              </label>
              <input
                {...register("inventory")}
                placeholder="Optional"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-400"
              />
            </div>

            {/* Upload Product Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Upload Product Image
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Upload size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Upload
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview && (
                <div className="mt-2 relative w-full h-48 rounded-xl overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Promotion */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Promotion
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Promo Name
                  </label>
                  <input
                    {...register("promoName")}
                    placeholder="e.g., Summer Special"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Promo Price
                  </label>
                  <input
                    type="number"
                    {...register("promoPrice", { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Label Selector */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-0.5">
                Label Selector
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Pick multiple tags from options:
              </p>
              <input
                type="text"
                readOnly
                value={selectedLabels.join(", ") || ""}
                placeholder="Label name"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white placeholder:text-gray-400 mb-3 cursor-default"
              />
              <div className="flex flex-wrap gap-2">
                {LABEL_OPTIONS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleLabel(label)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedLabels.includes(label)
                        ? "bg-[#3366CC] text-white border-[#3366CC]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Out of Stock Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Out of Stock
              </span>
              <button
                type="button"
                onClick={() => setValue("outOfStock", !outOfStock)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  outOfStock ? "bg-[#3366CC]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    outOfStock ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Packet Configuration */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">
                Packet Configuration
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {/* Left column */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Max Items In Packet (Up to 100)
                    </label>
                    <input
                      type="number"
                      {...register("maxItemsInPacket", { valueAsNumber: true })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Choice Sections (Up to 50)
                    </label>
                    <input
                      type="number"
                      {...register("choiceSections", { valueAsNumber: true })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Section 1 Name :
                    </label>
                    <input
                      {...register("sectionName")}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Right column — Section 1 Choices */}
                <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 mb-2">
                    Section 1 Choices
                  </span>
                  <div className="mt-auto">
                    <label className="block text-xs text-gray-600 mb-1">
                      Max # :
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setValue("maxChoices", Math.max(0, maxChoices - 1))
                        }
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {maxChoices}
                      </span>
                      <button
                        type="button"
                        onClick={() => setValue("maxChoices", maxChoices + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#3366CC] text-white font-semibold text-sm hover:bg-[#2952a3] transition-all"
              >
                Save Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMenuModal;

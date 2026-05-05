"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload } from "lucide-react";
import Image from "next/image";

const schema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  autoPrintOrders: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const RestaurantInfo = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [autoPrint, setAutoPrint] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      restaurantName: "SmartPOS Restaurant",
      autoPrintOrders: true,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Restaurant info saved:", data, imageFile);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">

        {/* Restaurant Name */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Restaurant Name
          </label>
          <input
            {...register("restaurantName")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Upload restaurant image */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Upload restaurant image
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 bg-white hover:bg-gray-50 transition-colors text-sm text-gray-600"
          >
            <Upload size={15} />
            Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {imagePreview && (
            <div className="mt-3 relative w-full h-44 rounded-xl overflow-hidden">
              <Image src={imagePreview} alt="Restaurant" fill className="object-cover" />
            </div>
          )}
        </div>

        {/* Auto Print Orders toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">Auto Print Orders</span>
          <button
            type="button"
            onClick={() => {
              setAutoPrint((v) => !v);
              setValue("autoPrintOrders", !autoPrint);
            }}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              autoPrint ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                autoPrint ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

      </div>
    </form>
  );
};

export default RestaurantInfo;
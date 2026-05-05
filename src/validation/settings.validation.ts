import { z } from "zod";

export const menuItemSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  price: z.number().min(0, "Price must be at least 0"),
  productionDestination: z.string().optional(),
  inventory: z.string().optional(),
  promoName: z.string().optional(),
  promoPrice: z.number().min(0).optional(),
  labels: z.array(z.string()).optional(),
  outOfStock: z.boolean().optional(),
  maxItemsInPacket: z.number().int().positive().max(100).optional(),
  choiceSections: z.number().int().min(0).max(50).optional(),
  sectionName: z.string().optional(),
  maxChoices: z.number().int().min(0).optional(),
});

export type MenuItemFormValues = z.infer<typeof menuItemSchema>;

export const qrCodeSchema = z.object({
  tableNumber: z
    .string()
    .min(1, "Table number is required")
    .regex(/^\d+$/, "Table number must be numeric"),
});

export type QRCodeFormValues = z.infer<typeof qrCodeSchema>;

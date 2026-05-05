"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Printer } from "lucide-react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  onPrint?: (data: { companyName?: string; contactInfo?: string; customNote?: string }) => void;
};

const schema = z.object({
  companyName: z.string().optional(),
  contactInfo: z.string().optional(),
  customNote: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

const ReceiptCustomizationModal: React.FC<Props> = ({ open, onClose, onPrint }) => {
  const { register, handleSubmit } = useForm<SchemaType>({ resolver: zodResolver(schema) });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
    if (file) setLogoPreview(URL.createObjectURL(file));
    else setLogoPreview(null);
  };

  const handlePrint = (data: SchemaType) => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Segoe UI', sans-serif;
              background: #fff;
              padding: 32px 24px;
              max-width: 380px;
              margin: 0 auto;
              color: #1a1a1a;
            }

            /* Header */
            .header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 16px;
            }
            .logo {
              width: 52px;
              height: 52px;
              border-radius: 50%;
              object-fit: cover;
              border: 2px solid #e5e7eb;
            }
            .logo-placeholder {
              width: 52px;
              height: 52px;
              border-radius: 50%;
              background: #d1fae5;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 22px;
            }
            .company-name {
              font-size: 16px;
              font-weight: 700;
              color: #111;
            }
            .contact-info {
              font-size: 11px;
              color: #6b7280;
              margin-top: 2px;
              line-height: 1.5;
            }

            /* Divider */
            .divider {
              border: none;
              border-top: 1px dashed #d1d5db;
              margin: 14px 0;
            }
            .divider-solid {
              border: none;
              border-top: 1px solid #e5e7eb;
              margin: 14px 0;
            }

            /* Receipt title */
            .receipt-title {
              text-align: center;
              font-size: 15px;
              font-weight: 600;
              margin-bottom: 14px;
            }

            /* Order type badge */
            .order-type-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 8px 12px;
              font-size: 13px;
              margin-bottom: 14px;
            }
            .order-type-label { color: #6b7280; }
            .order-type-value {
              display: flex;
              align-items: center;
              gap: 6px;
              font-weight: 600;
            }
            .badge-green {
              background: #10b981;
              color: white;
              border-radius: 50%;
              width: 18px;
              height: 18px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-size: 10px;
            }

            /* Meta row */
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              margin-bottom: 14px;
            }
            .meta-label { font-size: 11px; color: #9ca3af; margin-bottom: 2px; }
            .meta-value { font-size: 13px; font-weight: 500; }

            /* Table number */
            .table-section { margin-bottom: 14px; }
            .table-icon { font-size: 18px; margin-bottom: 4px; }
            .table-number { font-size: 22px; font-weight: 700; }

            /* Items */
            .section-title {
              font-size: 13px;
              font-weight: 700;
              margin-bottom: 10px;
            }
            .item-row {
              display: flex;
              justify-content: space-between;
              font-size: 13px;
              margin-bottom: 10px;
            }
            .item-name { font-weight: 500; }
            .item-qty { color: #6b7280; margin-right: 4px; }
            .item-price { font-weight: 500; }

            /* Summary */
            .summary-row {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 6px;
            }
            .summary-row.total {
              font-size: 14px;
              font-weight: 700;
              color: #111;
              margin-top: 8px;
            }

            /* Feedback box */
            .feedback-box {
              border: 1px solid #e5e7eb;
              border-radius: 10px;
              padding: 14px;
              display: flex;
              align-items: center;
              gap: 12px;
              margin-top: 18px;
            }
            .feedback-emoji { font-size: 26px; }
            .feedback-text { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
            .feedback-link { font-size: 13px; font-weight: 700; color: #111; }

            /* Custom note */
            .custom-note {
              font-size: 11px;
              color: #9ca3af;
              text-align: center;
              margin-top: 14px;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <!-- Header -->
          <div class="header">
            ${logoPreview
              ? `<img src="${logoPreview}" class="logo" alt="logo" />`
              : `<div class="logo-placeholder">☕</div>`
            }
            <div>
              <div class="company-name">${data.companyName || "COMMON SPACE"}</div>
              <div class="contact-info">${(data.contactInfo || "Jl. Sudirman No. 22, Jakarta, Indonesia\n+62 812-3456-7890\ninfo@commonspace.id").replace(/\n/g, "<br/>")}</div>
            </div>
          </div>

          <hr class="divider" />

          <!-- Receipt title -->
          <div class="receipt-title">Receipt</div>

          <!-- Order type -->
          <div class="order-type-row">
            <span class="order-type-label">Order Type</span>
            <span class="order-type-value">
              Dine In
              <span class="badge-green">✓</span>
            </span>
          </div>

          <!-- Meta -->
          <div class="meta-grid">
            <div>
              <div class="meta-label">Date</div>
              <div class="meta-value">26 Apr 2026, 13:16</div>
            </div>
            <div>
              <div class="meta-label">Order Number</div>
              <div class="meta-value" style="font-size:11px;">🖨 CMNSCMNSOIOTZY</div>
            </div>
          </div>

          <!-- Table -->
          <div class="table-section">
            <div class="table-icon">🪑</div>
            <div class="meta-label">Table Number</div>
            <div class="table-number">H3</div>
          </div>

          <hr class="divider-solid" />

          <!-- Items -->
          <div class="section-title">Ordered Items</div>
          <div class="item-row">
            <div><span class="item-qty">2x</span><span class="item-name">DIRTY LATTE</span></div>
            <div class="item-price">Rp70.000</div>
          </div>
          <hr class="divider-solid" />
          <div class="item-row">
            <div><span class="item-qty">1x</span><span class="item-name">BEEF AGLIO E OLIO</span></div>
            <div class="item-price">Rp45.000</div>
          </div>
          <hr class="divider-solid" />
          <div class="item-row">
            <div><span class="item-qty">1x</span><span class="item-name">GRILLED CHICKEN STEAK</span></div>
            <div class="item-price">Rp58.000</div>
          </div>
          <hr class="divider-solid" />

          <!-- Summary -->
          <div class="summary-row"><span>Subtotal (3 menu)</span><span>Rp173.000</span></div>
          <div class="summary-row"><span>Platform Fee</span><span>Rp1.800</span></div>
          <div class="summary-row"><span>Other fees ▾</span><span>Rp17.300</span></div>
          <div class="summary-row"><span>Payment Method</span><span>QRIS</span></div>
          <div class="summary-row total"><span>Total</span><span>Rp192.100</span></div>

          <!-- Feedback -->
          <div class="feedback-box">
            <div class="feedback-emoji">🤙</div>
            <div>
              <div class="feedback-text">Let's give feedback on our service!</div>
              <div class="feedback-link">Give Feedback</div>
            </div>
          </div>

          ${data.customNote ? `<div class="custom-note">${data.customNote}</div>` : ""}
        </body>
      </html>
    `;

    const w = window.open("", "PRINT", "height=700,width=420");
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(() => {
        w.print();
        w.close();
      }, 500);
    }
    onPrint?.(data);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-6 shadow-xl">

        {/* Title */}
        <h3 className="text-base font-bold text-center text-gray-900 mb-5">Receipt Customization</h3>

        <form onSubmit={handleSubmit(handlePrint)} className="space-y-4">

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
            <input
              {...register("companyName")}
              placeholder="Type...."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-300"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Info</label>
            <input
              {...register("contactInfo")}
              placeholder="Type...."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-300"
            />
          </div>

          {/* Upload Logo */}
          <div>
            <label className="flex items-center justify-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-xl px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all">
              {logoPreview
                ? <Image width={500} height={500} src={logoPreview} alt="logo" className="w-8 h-8 rounded-full object-cover" />
                : <Camera size={16} className="text-gray-400" />
              }
              <span className="text-sm text-gray-500">
                {logoFile ? logoFile.name : "Upload Logo"}
              </span>
              <input onChange={handleLogoChange} type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          {/* Custom Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Custom Note</label>
            <textarea
              {...register("customNote")}
              placeholder="Type...."
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-300 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all"
            >
              <Printer size={15} />
              Print Receipt
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReceiptCustomizationModal;
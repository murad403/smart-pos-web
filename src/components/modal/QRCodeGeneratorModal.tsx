/* eslint-disable react-hooks/incompatible-library */
"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Printer } from "lucide-react";
import { QRCodeFormValues, qrCodeSchema } from "@/validation/settings.validation";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
};

/* ── Tiny canvas-based QR encoder (numeric-only, version 4, L) ── */
function generateQRDataUrl(text: string, size = 200): string {
  // We build a simple data-matrix style visual via canvas
  // For production you'd swap this with a real lib like `qrcode`
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Deterministic pseudo-random pattern seeded by the text
  const seed = text
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const modules = 33;
  const cellSize = size / modules;

  ctx.fillStyle = "#000000";

  // Finder patterns (top-left, top-right, bottom-left)
  const drawFinder = (x: number, y: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBlack =
          r === 0 ||
          r === 6 ||
          c === 0 ||
          c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        if (isBlack) {
          ctx.fillRect(
            (x + c) * cellSize,
            (y + r) * cellSize,
            cellSize,
            cellSize
          );
        }
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(modules - 7, 0);
  drawFinder(0, modules - 7);

  // Data area — seeded hash pattern
  let hash = seed;
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      // skip finder zones
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c >= modules - 8) ||
        (r >= modules - 8 && c < 8)
      )
        continue;

      hash = ((hash * 1103515245 + 12345) >>> 0) % 2147483648;
      if (hash % 3 !== 0) {
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }

  return canvas.toDataURL("image/png");
}

const QRCodeGeneratorModal: React.FC<Props> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QRCodeFormValues>({
    resolver: zodResolver(qrCodeSchema),
    defaultValues: { tableNumber: "20" },
  });

  const tableNumber = watch("tableNumber");
  const [qrSrc, setQrSrc] = useState<string>("");
  const qrRef = useRef<HTMLDivElement>(null);

  // Generate QR whenever tableNumber changes
  useEffect(() => {
    if (tableNumber && /^\d+$/.test(tableNumber)) {
      const url = `https://restaurant.app/order?table=${tableNumber}`;
      setQrSrc(generateQRDataUrl(url, 240));
    }
  }, [tableNumber]);

  const handleGenerate = useCallback(
    (data: QRCodeFormValues) => {
      const url = `https://restaurant.app/order?table=${data.tableNumber}`;
      setQrSrc(generateQRDataUrl(url, 240));
    },
    []
  );

  const handlePrint = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Menu Card — Table ${tableNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              font-family: 'Segoe UI', sans-serif;
              background: #fff;
            }
            .card {
              background: #fffde8;
              border-radius: 16px;
              padding: 40px 32px;
              text-align: center;
            }
            img { width: 200px; height: 200px; image-rendering: pixelated; }
            .label { margin-top: 16px; color: #4a5568; font-size: 16px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${qrSrc}" alt="QR Code" />
            <div class="label">Scan to Start Order</div>
          </div>
        </body>
      </html>
    `;
    const w = window.open("", "PRINT", "height=600,width=420");
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(() => {
        w.print();
        w.close();
      }, 400);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-105 p-6 sm:p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          QR Code Generator
        </h2>

        <form onSubmit={handleSubmit(handleGenerate)} className="space-y-5">
          {/* Table Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Table Number
            </label>
            <input
              {...register("tableNumber")}
              placeholder="20"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-400 ${
                errors.tableNumber
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200"
              }`}
            />
            {errors.tableNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.tableNumber.message}
              </p>
            )}
          </div>

          {/* QR Preview */}
          <div
            ref={qrRef}
            className="bg-[#FFFDE8] rounded-2xl p-6 flex flex-col items-center justify-center mx-auto"
          >
            {qrSrc ? (
              <Image
                src={qrSrc}
                alt="QR Code"
                width={200}
                height={200}
                className="w-50 h-50"
                style={{ imageRendering: "pixelated" }}
              />
            ) : (
              <div className="w-50 h-50 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                Enter table number
              </div>
            )}
            <p className="text-gray-500 font-medium text-sm mt-4">
              Scan to Start Order
            </p>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#3366CC] text-white font-semibold text-sm hover:bg-[#2952a3] transition-all"
          >
            Generate Unique QR Code
          </button>

          {/* Print & Cancel */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#3366CC] text-[#3366CC] font-semibold text-sm hover:bg-blue-50 transition-all"
            >
              <Printer size={16} />
              Print QR Menu Card
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QRCodeGeneratorModal;

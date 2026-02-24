"use client"

import { useEffect } from "react";

export function Favicon() {
  useEffect(() => {
    // Create a canvas to generate the favicon
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 64, 64);
      gradient.addColorStop(0, "#2563eb"); // blue-600
      gradient.addColorStop(1, "#06b6d4"); // cyan-500

      // Draw rounded rectangle background
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(0, 0, 64, 64, 12);
      ctx.fill();

      // Draw checkmark circles (habit tracking representation)
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(19, 22, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(32, 22, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.beginPath();
      ctx.arc(45, 22, 5, 0, Math.PI * 2);
      ctx.fill();

      // Draw flow wave
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(10, 42);
      ctx.quadraticCurveTo(19, 36, 29, 42);
      ctx.quadraticCurveTo(39, 48, 54, 42);
      ctx.stroke();

      // Draw checkmarks
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // First checkmark
      ctx.beginPath();
      ctx.moveTo(17, 22);
      ctx.lineTo(19, 24);
      ctx.lineTo(22, 20);
      ctx.stroke();

      // Second checkmark
      ctx.beginPath();
      ctx.moveTo(30, 22);
      ctx.lineTo(32, 24);
      ctx.lineTo(35, 20);
      ctx.stroke();

      // Convert canvas to favicon
      const faviconUrl = canvas.toDataURL("image/png");

      // Update or create favicon link
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, []);

  return null;
}

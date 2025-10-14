import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const danger = variant === "danger";

  return createPortal(
    <div
      aria-modal
      role="dialog"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(2px)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#0b1220",
          border: "1px solid #1f2937",
          borderRadius: 12,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          color: "#e5e7eb",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 18px", background: "#0f172a", borderBottom: "1px solid #1f2937" }}>
          <div id="confirm-title" style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
        </div>
        <div style={{ padding: 18, lineHeight: 1.6 }}>
          <div id="confirm-desc" style={{ color: "#cbd5e1", fontSize: 14 }}>{message}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: 16, borderTop: "1px solid #1f2937" }}>
          <button
            onClick={onClose}
            autoFocus
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #374151",
              background: "#0b1220",
              color: "#e5e7eb",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#111827";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#4b5563";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#0b1220";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#374151";
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: `1px solid ${danger ? "#7f1d1d" : "#0ea5b5"}`,
              background: danger ? "#3b1d1d" : "#06b6d4",
              color: danger ? "#fca5a5" : "#0b1220",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = danger ? "#5b2525" : "#0fbad9";
              (e.currentTarget as HTMLButtonElement).style.borderColor = danger ? "#a11f1f" : "#0fbad9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = danger ? "#3b1d1d" : "#06b6d4";
              (e.currentTarget as HTMLButtonElement).style.borderColor = danger ? "#7f1d1d" : "#0ea5b5";
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

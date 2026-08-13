import { useState, useRef, useCallback } from "react";

const FILE_ICONS = {
  pdf: "📄",
  png: "🖼️",
  jpg: "🖼️",
  jpeg: "🖼️",
};

function getFileIcon(filename) {
  const ext = filename?.split(".").pop()?.toLowerCase();
  return FILE_ICONS[ext] || "📁";
}

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadBox({ onFileSelect, onProcess, loading }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback(
    (selectedFile) => {
      if (!selectedFile) return;
      setFile(selectedFile);
      if (onFileSelect) onFileSelect(selectedFile);
    },
    [onFileSelect]
  );

  function handleChange(e) {
    handleFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleClick() {
    inputRef.current?.click();
  }

  function handleRemove(e) {
    e.stopPropagation();
    setFile(null);
    if (onFileSelect) onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      {/* Drag & Drop Zone */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `2px dashed ${isDragging ? "#6366f1" : file ? "#22c55e" : "#cbd5e1"}`,
          borderRadius: "16px",
          padding: "40px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: isDragging
            ? "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)"
            : file
            ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          transition: "all 0.25s ease",
          userSelect: "none",
          boxShadow: isDragging
            ? "0 0 0 4px rgba(99,102,241,0.15)"
            : file
            ? "0 0 0 4px rgba(34,197,94,0.12)"
            : "none",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
          style={{ display: "none" }}
        />

        {file ? (
          <div style={{ pointerEvents: "none" }}>
            <div style={{ fontSize: "3rem", marginBottom: "8px" }}>
              {getFileIcon(file.name)}
            </div>
            <p style={{ fontWeight: 700, fontSize: "1rem", color: "#16a34a", marginBottom: "4px", wordBreak: "break-all" }}>
              {file.name}
            </p>
            <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
              {formatSize(file.size)}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#86efac", marginTop: "6px", fontStyle: "italic" }}>
              Click to change file
            </p>
            <button
              onClick={handleRemove}
              style={{
                pointerEvents: "all",
                marginTop: "12px",
                background: "transparent",
                border: "1px solid #fca5a5",
                color: "#ef4444",
                borderRadius: "8px",
                padding: "4px 14px",
                fontSize: "0.78rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              ✕ Remove
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "12px",
                transition: "transform 0.2s",
                transform: isDragging ? "scale(1.15)" : "scale(1)",
              }}
            >
              {isDragging ? "📂" : "☁️"}
            </div>
            <p style={{ fontWeight: 700, fontSize: "1.05rem", color: isDragging ? "#4f46e5" : "#374151", marginBottom: "6px" }}>
              {isDragging ? "Drop it here!" : "Drag & drop your invoice"}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "16px" }}>
              or{" "}
              <span style={{ color: "#6366f1", textDecoration: "underline", fontWeight: 600 }}>
                browse files
              </span>
            </p>
            <p style={{ fontSize: "0.72rem", color: "#9ca3af", background: "#f1f5f9", display: "inline-block", padding: "4px 12px", borderRadius: "999px" }}>
              PDF, PNG, JPG, JPEG supported
            </p>
          </>
        )}
      </div>

      {/* Process Invoice Button */}
      <button
        onClick={onProcess}
        disabled={loading || !file}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          background: loading || !file
            ? "#e2e8f0"
            : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          color: loading || !file ? "#94a3b8" : "#fff",
          fontWeight: 700,
          fontSize: "1rem",
          cursor: loading || !file ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          boxShadow: loading || !file ? "none" : "0 4px 14px rgba(99,102,241,0.35)",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={(e) => {
          if (!loading && file) e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {loading ? "⏳ Processing..." : "⚡ Process Invoice"}
      </button>

      {loading && (
        <p style={{ marginTop: "10px", textAlign: "center", color: "#6366f1", fontSize: "0.85rem" }}>
          Analysing your invoice, please wait…
        </p>
      )}
    </div>
  );
}

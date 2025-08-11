"use client";
import React, { useRef, useState, useEffect } from "react";

export default function AutoResizeTextarea({
  placeholder = "Leave a comment",
  maxHeight = "30em",
  className = "",
  ...props
}) {
  const textareaRef = useRef(null);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Auto-resize effect
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto"; // reset before measuring
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Apply max height limit
    if (textarea.scrollHeight > parseInt(maxHeight)) {
      textarea.style.height = maxHeight;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
  }, [value, maxHeight]);

  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={` w-full outline-0 rounded-xl px-6 py-4 text-[0.95em] text-gray-700 resize-none h-fit max-h-[${maxHeight}] ${className}`}
        {...props}
      />
    </div>
  );
}

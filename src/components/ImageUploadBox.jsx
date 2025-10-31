import React from "react";

/**
 * ImageUploadBox
 * Props:
 *  - preview (string | null) : preview image URL
 *  - onChange (fn) : file change handler (receives event)
 *
 * Usage: this is the bottom upload box for signup (A2 style)
 */
export default function ImageUploadBox({ preview, onChange }) {
  return (
    <label
      className="w-full mt-4 cursor-pointer rounded-xl border-2 border-dashed border-white/20
                 bg-white/5 dark:bg-black/10 p-3 flex flex-col items-center justify-center
                 gap-3 transition hover:border-purple-400"
    >
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white/90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m10 12V8M3 20h18" />
          </svg>
          <span className="text-sm text-white/80 mt-1">Upload profile image</span>
          <span className="text-xs text-white/60 mt-1">PNG, JPG or WEBP. Optional.</span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        name="profileImage"
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

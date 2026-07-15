import { resolveUploadUrl } from "../utils/media";

export default function Avatar({ src, name = "", size = "h-10 w-10" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const resolved = src ? resolveUploadUrl(src) : null;

  if (resolved) {
    return (
      <img
        src={resolved}
        alt={name}
        className={`${size} rounded-full object-cover ring-2 ring-white shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold ring-2 ring-white shadow-sm`}
    >
      {initials || "?"}
    </div>
  );
}

// El backend expone /uploads de forma estatica. Segun el endpoint, las
// rutas de imagen llegan de formas distintas (a veces ya absolutas,
// a veces relativas sin el prefijo "uploads/"). Estos helpers normalizan
// cualquier variante a una URL que el navegador pueda cargar.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export function resolveUploadUrl(rawPath) {
  if (!rawPath) return null;
  if (rawPath.startsWith("http://") || rawPath.startsWith("https://")) {
    return rawPath;
  }

  const normalized = rawPath.replace(/\\/g, "/").replace(/^\/+/, "");

  if (normalized.startsWith("uploads/")) {
    return `${API_ORIGIN}/${normalized}`;
  }

  return `${API_ORIGIN}/uploads/${normalized}`;
}

export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-DO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("es-DO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  if (Number.isNaN(number)) return null;
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(number);
}

export function normalizeWebsite(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

// Convierte un objeto de formulario en FormData, omitiendo campos vacios
// para no chocar con validadores backend que rechazan "" en campos
// opcionales tipo email()/url().
export function toFormData(fields, files = {}) {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) return;
    formData.append(key, value);
  });

  Object.entries(files).forEach(([key, file]) => {
    if (file) formData.append(key, file);
  });

  return formData;
}

export function extractFieldErrors(error) {
  const data = error?.response?.data;
  const fieldErrors = data?.errors?.fieldErrors || data?.errors;

  if (fieldErrors && typeof fieldErrors === "object") {
    const firstKey = Object.keys(fieldErrors)[0];
    const firstValue = fieldErrors[firstKey];
    const message = Array.isArray(firstValue) ? firstValue[0] : firstValue;
    if (firstKey && message) return `${firstKey}: ${message}`;
  }

  return data?.message || "Ocurrio un error inesperado.";
}

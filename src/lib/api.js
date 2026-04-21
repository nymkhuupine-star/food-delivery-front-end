const RAW_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://food-delivery-back-end-gq7z.onrender.com";

export const apiBaseUrl = RAW_API_BASE_URL.replace(/\/+$/, "");

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};

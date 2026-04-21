"use client";

export const ORDERS_STORAGE_KEY = "nomnom-orders";
export const CURRENT_USER_STORAGE_KEY = "nomnom-current-user";
export const ORDERS_UPDATED_EVENT = "nomnom-orders-updated";
export const USER_UPDATED_EVENT = "nomnom-user-updated";

const canUseBrowser = () => typeof window !== "undefined";

const safeJsonParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const sanitizeUser = (user) => {
  if (!user || typeof user !== "object") return null;

  const { password, ...safeUser } = user;
  return safeUser;
};

const dispatchBrowserEvent = (eventName) => {
  if (!canUseBrowser()) return;
  window.dispatchEvent(new Event(eventName));
};

const decodeTokenPayload = (token) => {
  if (!token) return null;

  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );
    const decoded = window.atob(padded);

    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const formatOrderDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || "-";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export const getStoredOrders = () => {
  if (!canUseBrowser()) return [];

  const parsed = safeJsonParse(
    window.localStorage.getItem(ORDERS_STORAGE_KEY),
    []
  );

  return Array.isArray(parsed) ? parsed : [];
};

export const saveStoredOrders = (orders) => {
  if (!canUseBrowser()) return;

  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  dispatchBrowserEvent(ORDERS_UPDATED_EVENT);
};

export const addStoredOrder = (order) => {
  const nextOrders = [order, ...getStoredOrders()];
  saveStoredOrders(nextOrders);
  return nextOrders;
};

export const getCurrentUser = () => {
  if (!canUseBrowser()) return null;

  const storedUser = sanitizeUser(
    safeJsonParse(window.localStorage.getItem(CURRENT_USER_STORAGE_KEY), null)
  );

  if (storedUser) return storedUser;

  const decodedToken = decodeTokenPayload(window.localStorage.getItem("token"));
  return sanitizeUser(decodedToken?.user);
};

export const setCurrentUser = (user) => {
  if (!canUseBrowser()) return null;

  const safeUser = sanitizeUser(user);

  if (!safeUser) {
    window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    dispatchBrowserEvent(USER_UPDATED_EVENT);
    return null;
  }

  window.localStorage.setItem(
    CURRENT_USER_STORAGE_KEY,
    JSON.stringify(safeUser)
  );
  dispatchBrowserEvent(USER_UPDATED_EVENT);

  return safeUser;
};

export const updateCurrentUser = (patch) => {
  const currentUser = getCurrentUser();

  if (!currentUser) return null;

  return setCurrentUser({ ...currentUser, ...patch });
};

export const getCustomerDisplayName = (user) => {
  if (user?.firstName?.trim()) return user.firstName.trim();
  if (user?.email?.trim()) return user.email.trim();
  return "Guest";
};

export const createStoredOrder = ({
  cartItems,
  deliveryAddress,
  user,
  shipping,
}) => {
  const createdAt = new Date().toISOString();
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.totalPrice),
    0
  );
  const normalizedShipping = Number(shipping || 0);
  const total = itemsTotal + normalizedShipping;

  return {
    id: `ord-${Date.now()}`,
    customer: getCustomerDisplayName(user),
    customerEmail: user?.email || "",
    userId: user?._id || "",
    foods: cartItems.map((item) => ({
      name: item.foodName,
      qty: item.qty,
      image: item.image,
      price: Number(item.price),
      total: Number(item.totalPrice),
    })),
    date: formatOrderDate(createdAt),
    createdAt,
    total: Number(total.toFixed(2)),
    itemsTotal: Number(itemsTotal.toFixed(2)),
    shipping: Number(normalizedShipping.toFixed(2)),
    address: deliveryAddress.trim(),
    status: "Pending",
  };
};

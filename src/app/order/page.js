"use client";

import SideBar from "@/_components/SideBar";
import ProfileAvatarButton from "@/_components/ProfileAvatarButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  formatOrderDate,
  getStoredOrders,
  ORDERS_UPDATED_EVENT,
  saveStoredOrders,
} from "@/lib/orderStorage";

const STATUS_OPTIONS = ["Pending", "Delivered", "Cancelled"];

const STATUS_STYLES = {
  Pending: "border-[#FB7185] text-[#18181B] bg-white",
  Delivered: "border-[#86EFAC] text-[#18181B] bg-white",
  Cancelled: "border-[#E4E4E7] text-[#18181B] bg-white",
};

const getStatusClassName = (status) =>
  `inline-flex h-8 min-w-[92px] items-center justify-between gap-2 rounded-full border px-3 text-xs font-medium ${
    STATUS_STYLES[status] || STATUS_STYLES.Pending
  }`;

const getOrderTimestamp = (order) => {
  const value = order.createdAt || order.date;
  const timestamp = new Date(value).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortAsc, setSortAsc] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("Delivered");

  useEffect(() => {
    const syncOrders = () => {
      setOrders(getStoredOrders());
    };

    syncOrders();

    window.addEventListener(ORDERS_UPDATED_EVENT, syncOrders);
    window.addEventListener("storage", syncOrders);

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, syncOrders);
      window.removeEventListener("storage", syncOrders);
    };
  }, []);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => orders.some((order) => order.id === id))
    );
  }, [orders]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const left = getOrderTimestamp(a);
      const right = getOrderTimestamp(b);
      return sortAsc ? left - right : right - left;
    });
  }, [orders, sortAsc]);

  const allSelected =
    sortedOrders.length > 0 &&
    sortedOrders.every((order) => selectedIds.includes(order.id));

  const persistOrders = (nextOrders) => {
    setOrders(nextOrders);
    saveStoredOrders(nextOrders);
  };

  const toggleSelectAll = (checked) => {
    if (checked === true) {
      setSelectedIds(sortedOrders.map((order) => order.id));
      return;
    }

    setSelectedIds([]);
  };

  const toggleSelectOrder = (orderId, checked) => {
    if (checked === true) {
      setSelectedIds((prev) =>
        prev.includes(orderId) ? prev : [...prev, orderId]
      );
      return;
    }

    setSelectedIds((prev) => prev.filter((id) => id !== orderId));
  };

  const updateOrderStatus = (orderId, nextStatus) => {
    const nextOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: nextStatus } : order
    );

    persistOrders(nextOrders);
  };

  const handleSaveBulkStatus = () => {
    const nextOrders = orders.map((order) =>
      selectedIds.includes(order.id)
        ? { ...order, status: bulkStatus }
        : order
    );

    persistOrders(nextOrders);
    setIsBulkDialogOpen(false);
  };

  const itemCountLabel = `${orders.length} item${orders.length === 1 ? "" : "s"}`;

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px]">
        <SideBar />

        <div className="flex min-w-0 flex-1 flex-col px-5 py-8">
          <div className="mb-5 flex justify-end">
            <ProfileAvatarButton />
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#E4E4E7] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E4E4E7] px-4 py-3">
              <div>
                <p className="text-[28px] font-semibold tracking-[-0.03em] text-[#18181B]">
                  Orders
                </p>
                <p className="mt-1 text-xs text-[#71717A]">{itemCountLabel}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-10 items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-4 text-sm text-[#3F3F46]">
                  <CalendarDays className="h-4 w-4 text-[#71717A]" />
                  <span>Stored order history</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    selectedIds.length > 0 && setIsBulkDialogOpen(true)
                  }
                  disabled={selectedIds.length === 0}
                  className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition ${
                    selectedIds.length > 0
                      ? "bg-[#18181B] text-white hover:bg-[#27272A]"
                      : "bg-[#E4E4E7] text-[#A1A1AA]"
                  }`}
                >
                  <span>Change delivery state</span>
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                      selectedIds.length > 0
                        ? "bg-white text-[#18181B]"
                        : "bg-[#D4D4D8] text-[#71717A]"
                    }`}
                  >
                    {selectedIds.length}
                  </span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left">
                <thead>
                  <tr className="bg-white text-xs text-[#71717A]">
                    <th className="w-10 border-b border-[#E4E4E7] px-4 py-3 font-medium">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={toggleSelectAll}
                        className="border-[#A1A1AA] data-[state=checked]:border-[#18181B] data-[state=checked]:bg-[#18181B]"
                      />
                    </th>
                    <th className="w-12 border-b border-[#E4E4E7] px-2 py-3 font-medium">
                      No.
                    </th>
                    <th className="min-w-[130px] border-b border-[#E4E4E7] px-3 py-3 font-medium">
                      Customer
                    </th>
                    <th className="min-w-[110px] border-b border-[#E4E4E7] px-3 py-3 font-medium">
                      Food
                    </th>
                    <th className="min-w-[110px] border-b border-[#E4E4E7] px-3 py-3 font-medium">
                      <button
                        type="button"
                        onClick={() => setSortAsc((prev) => !prev)}
                        className="flex items-center gap-1"
                      >
                        <span>Date</span>
                        <ChevronsUpDown className="h-3.5 w-3.5" />
                      </button>
                    </th>
                    <th className="min-w-[90px] border-b border-[#E4E4E7] px-3 py-3 font-medium">
                      Total
                    </th>
                    <th className="min-w-[200px] border-b border-[#E4E4E7] px-3 py-3 font-medium">
                      Delivery Address
                    </th>
                    <th className="min-w-[130px] border-b border-[#E4E4E7] px-3 py-3 font-medium">
                      <div className="flex items-center gap-1">
                        <span>Delivery state</span>
                        <ChevronsUpDown className="h-3.5 w-3.5" />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sortedOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-16 text-center text-sm text-[#71717A]"
                      >
                        No saved orders yet. Place an order from the home page
                        and it will appear here.
                      </td>
                    </tr>
                  ) : (
                    sortedOrders.map((order, index) => {
                      const isSelected = selectedIds.includes(order.id);

                      return (
                        <tr
                          key={order.id}
                          className={`text-sm text-[#3F3F46] ${
                            isSelected ? "bg-[#F4F4F5]" : "bg-white"
                          }`}
                        >
                          <td className="border-b border-[#EAEAEA] px-4 py-3">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) =>
                                toggleSelectOrder(order.id, checked)
                              }
                              className="border-[#A1A1AA] data-[state=checked]:border-[#18181B] data-[state=checked]:bg-[#18181B]"
                            />
                          </td>

                          <td className="border-b border-[#EAEAEA] px-2 py-3 text-[#18181B]">
                            {index + 1}
                          </td>

                          <td className="border-b border-[#EAEAEA] px-3 py-3">
                            {order.customer || order.customerEmail || "-"}
                          </td>

                          <td className="border-b border-[#EAEAEA] px-3 py-3">
                            <div className="group relative inline-flex items-center gap-1">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 text-sm text-[#52525B]"
                              >
                                <span>{order.foods.length} foods</span>
                                <ChevronDown className="h-3.5 w-3.5" />
                              </button>

                              <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-[188px] rounded-[14px] border border-[#E4E4E7] bg-white p-2 opacity-0 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition group-hover:pointer-events-auto group-hover:opacity-100">
                                {order.foods.map((food, foodIndex) => (
                                  <div
                                    key={`${order.id}-${foodIndex}`}
                                    className="flex items-center gap-2 rounded-xl px-1 py-1.5"
                                  >
                                    <img
                                      src={food.image}
                                      alt={food.name}
                                      className="h-8 w-8 rounded-lg object-cover"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-[11px] text-[#18181B]">
                                        {food.name}
                                      </p>
                                    </div>
                                    <span className="text-[11px] text-[#52525B]">
                                      x {food.qty}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>

                          <td className="border-b border-[#EAEAEA] px-3 py-3">
                            {formatOrderDate(order.createdAt || order.date)}
                          </td>

                          <td className="border-b border-[#EAEAEA] px-3 py-3">
                            ${Number(order.total).toFixed(2)}
                          </td>

                          <td className="border-b border-[#EAEAEA] px-3 py-3 text-xs text-[#71717A]">
                            <p
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {order.address || "-"}
                            </p>
                          </td>

                          <td className="border-b border-[#EAEAEA] px-3 py-3">
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild>
                                <button
                                  type="button"
                                  className={getStatusClassName(order.status)}
                                >
                                  <span>{order.status}</span>
                                  <ChevronDown className="h-3.5 w-3.5 text-[#71717A]" />
                                </button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                align="end"
                                className="w-[112px] rounded-[14px] border border-[#E4E4E7] bg-white p-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                              >
                                {STATUS_OPTIONS.map((status) => (
                                  <DropdownMenuItem
                                    key={status}
                                    onClick={() =>
                                      updateOrderStatus(order.id, status)
                                    }
                                    className="rounded-[10px] px-3 py-2 text-xs text-[#3F3F46] focus:bg-[#F4F4F5] focus:text-[#18181B]"
                                  >
                                    {status}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-5">
              <button className="flex h-7 w-7 items-center justify-center rounded-full text-[#A1A1AA] transition hover:bg-[#F4F4F5]">
                <ChevronLeft className="h-4 w-4" />
              </button>

              {[1].map((page) => (
                <button
                  key={page}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3F3F46] text-xs text-white transition"
                >
                  {page}
                </button>
              ))}

              <button className="flex h-7 w-7 items-center justify-center rounded-full text-[#A1A1AA] transition hover:bg-[#F4F4F5]">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
        <DialogContent className="w-[260px] border-none bg-transparent p-0 shadow-none sm:max-w-[260px]">
          <DialogTitle className="sr-only">Change delivery state</DialogTitle>

          <div className="rounded-[20px] bg-white p-4 shadow-[0_32px_64px_rgba(15,23,42,0.18)]">
            <div className="mb-5 flex items-start justify-between">
              <p className="text-sm font-semibold text-[#18181B]">
                Change delivery state
              </p>

              <button
                type="button"
                onClick={() => setIsBulkDialogOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F4F5] text-[#71717A] transition hover:bg-[#E4E4E7]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mb-4 flex gap-2">
              {STATUS_OPTIONS.map((status) => {
                const isActive = bulkStatus === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setBulkStatus(status)}
                    className={`flex-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      isActive
                        ? "bg-[#FEF2F2] text-[#EF4444]"
                        : "bg-[#F4F4F5] text-[#52525B]"
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleSaveBulkStatus}
              className="w-full rounded-full bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#27272A]"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

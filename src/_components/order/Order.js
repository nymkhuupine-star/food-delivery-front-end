"use client";

import FoodIcon from "@/_icons/FoodIcon";
import LineIcon from "@/_icons/LineIcon";
import OrderFoodIcon from "@/_icons/OrderFoodIcon";
import { Badge } from "@/components/ui/badge";
import {
  getCurrentUser,
  getStoredOrders,
  ORDERS_UPDATED_EVENT,
  USER_UPDATED_EVENT,
} from "@/lib/orderStorage";
import { useEffect, useMemo, useState } from "react";

const STATUS_STYLES = {
  Pending: "border-[#F87171] bg-white text-[#18181B]",
  Delivered: "border-[#86EFAC] bg-white text-[#18181B]",
  Cancelled: "border-[#E4E4E7] bg-white text-[#18181B]",
};

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const syncData = () => {
      setOrders(getStoredOrders());
      setCurrentUser(getCurrentUser());
    };

    syncData();

    window.addEventListener(ORDERS_UPDATED_EVENT, syncData);
    window.addEventListener(USER_UPDATED_EVENT, syncData);
    window.addEventListener("storage", syncData);

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, syncData);
      window.removeEventListener(USER_UPDATED_EVENT, syncData);
      window.removeEventListener("storage", syncData);
    };
  }, []);

  const customerOrders = useMemo(() => {
    if (!currentUser?._id && !currentUser?.email) {
      return [];
    }

    return orders.filter((order) => {
      if (currentUser._id && order.userId === currentUser._id) return true;
      if (currentUser.email && order.customerEmail === currentUser.email) {
        return true;
      }

      return false;
    });
  }, [orders, currentUser]);

  const pendingOrdersCount = customerOrders.filter(
    (order) => order.status === "Pending"
  ).length;
  const grandTotal = customerOrders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );
  const itemsTotal = customerOrders.reduce(
    (sum, order) => sum + Number(order.itemsTotal ?? order.total),
    0
  );
  const shipping = customerOrders.reduce(
    (sum, order) => sum + Number(order.shipping ?? 0),
    0
  );
  const badgeLabel =
    pendingOrdersCount > 0
      ? `${pendingOrdersCount} pending`
      : customerOrders.length > 0
        ? "Completed"
        : "No orders";
  const badgeClassName =
    pendingOrdersCount > 0 ? STATUS_STYLES.Pending : STATUS_STYLES.Delivered;

  return (
    <>
      <div className="mt-3 flex min-h-[620px] flex-col rounded-[24px] bg-white px-4 py-4 shadow-[0_16px_45px_rgba(15,23,42,0.14)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold text-[#18181B]">
            Order history
          </p>
          <Badge
            className={`rounded-full px-3 py-1 shadow-none ${badgeClassName}`}
          >
            {badgeLabel}
          </Badge>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden pr-1">
          {customerOrders.length === 0 ? (
            <div className="flex h-[182px] flex-col items-center justify-center rounded-[20px] bg-[#F4F4F5] p-4 text-center">
              <FoodIcon />
              <p className="mt-3 text-base font-bold leading-7 text-zinc-950">
                No orders yet?
              </p>
              <p className="text-xs leading-4 text-zinc-500">
                You haven&apos;t placed any orders yet. Start exploring our menu
                and satisfy your cravings!
              </p>
            </div>
          ) : (
            customerOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-[#F4F4F5] px-3 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF1F2] text-[#EF4444]">
                      <OrderFoodIcon />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#18181B]">
                        {order.foods.length} foods ordered
                      </p>
                      <p className="mt-1 text-xs text-[#71717A]">
                        {order.address}
                      </p>
                    </div>
                  </div>

                  <Badge
                    className={`rounded-full px-3 py-1 shadow-none ${
                      STATUS_STYLES[order.status] || STATUS_STYLES.Pending
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="mt-3 space-y-2">
                  {order.foods.map((food, index) => (
                    <div
                      key={`${order.id}-${food.name}-${index}`}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-[#EF4444]" />
                        <p className="truncate text-[#18181B]">{food.name}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-[#71717A]">
                        <span>x {food.qty}</span>
                        <span className="font-medium text-[#18181B]">
                          ${Number(food.total).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#F4F4F5] pt-3 text-xs text-[#71717A]">
                  <span>{order.date}</span>
                  <span className="font-semibold text-[#18181B]">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-5 border-t border-[#E4E4E7] pt-4">
          <div className="flex items-center justify-between text-[15px] font-semibold text-[#18181B]">
            <p>Total</p>
            <p>${grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[24px] bg-white px-4 py-5 shadow-[0_16px_45px_rgba(15,23,42,0.14)]">
        <p className="text-[15px] font-semibold text-[#71717A]">Payment info</p>

        <div className="mt-5 flex items-center justify-between text-base text-[#71717A]">
          <p>Items</p>
          <p className="font-semibold text-[#18181B]">
            ${itemsTotal.toFixed(2)}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between text-base text-[#71717A]">
          <p>Shipping</p>
          <p className="font-semibold text-[#18181B]">
            ${shipping.toFixed(2)}
          </p>
        </div>

        <LineIcon className="mt-5 w-full" />

        <div className="mt-5 flex items-center justify-between text-[15px]">
          <p className="text-[#71717A]">Total</p>
          <p className="text-[28px] font-semibold leading-none text-[#18181B]">
            ${grandTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
}

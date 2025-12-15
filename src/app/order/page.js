"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";




import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SideBar from "@/_components/SideBar";

export default function OrdersTable() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const orders = [
    {
      id: 1,
      customer: "test@gmail.com",
      foods: [
        { name: "Sunshine Stackers", qty: 1 },
        { name: "Sunshine Stackers", qty: 1 },
      ],
      date: "2024/12/20",
      total: "$26.97",
      address: "Монгол, СБД, 12-р хороо, ...",
      status: "Pending",
    },
    {
      id: 2,
      customer: "test@gmail.com",
      foods: [{ name: "Sunshine Stackers", qty: 1 }],
      date: "2024/12/20",
      total: "$26.97",
      address: "Монгол, СБД, 12-р хороо, ...",
      status: "Delivered",
    },
  ];

  const toggleExpand = (index) =>
    setExpandedRow(expandedRow === index ? null : index);

  const toggleSort = () => setSortAsc(!sortAsc);

  const sortedOrders = [...orders].sort((a, b) =>
    sortAsc
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );

  const statusStyle = {
    Pending: "border-red-400 text-red-500",
    Delivered: "border-green-400 text-green-600",
    Cancelled: "border-gray-400 text-gray-500",
  };

  return (
    <div>
       <div className="min-h-screen w-full bg-zinc-200 flex justify-center">
   <SideBar  className="w-64"/>

    
    <div className="p-6 ">
          
      <div className="text-xl bg-white font-semibold rounded-t-sm shadow px-4 py-3">Orders</div>

      <Table className="bg-white rounded-b-xl shadow">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>

            <TableHead
              className="cursor-pointer flex items-center gap-1"
              onClick={toggleSort}
            >
              Date
              {sortAsc ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </TableHead>

            <TableHead>Total</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead>Delivery state</TableHead>
          </TableRow>
        </TableHeader>
        

        <TableBody>
          {sortedOrders.map((item, index) => (
            <>
              <TableRow
                key={index}
                className="cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.customer}</TableCell>

                {/* FOOD DROPDOWN */}
                <TableCell className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[120px] flex justify-between"
                      >
                        {item.foods.length} foods
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="p-2 space-y-2">
                      {item.foods.map((f, i) => (
                        <div
                          key={i}
                          className="flex justify-between gap-2 text-sm"
                        >
                          <span>{f.name}</span>
                          <span>x{f.qty}</span>
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell>{item.date}</TableCell>
                <TableCell>{item.total}</TableCell>

                <TableCell className="max-w-[250px] truncate">
                  {item.address}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`border px-3 py-1 rounded-full ${statusStyle[item.status]}`}
                    variant="outline"
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>

              {expandedRow === index && (
                <TableRow className="bg-gray-50">
                  <TableCell colSpan={7}>
                    <div className="p-3 space-y-2">
                      <div className="font-medium">Food details:</div>

                      {item.foods.map((f, i) => (
                        <div
                          key={i}
                          className="flex justify-between border-b pb-1"
                        >
                          <span>{f.name}</span>
                          <span>x{f.qty}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
        
      </Table>
    </div>
     </div>
       </div>
  );
}

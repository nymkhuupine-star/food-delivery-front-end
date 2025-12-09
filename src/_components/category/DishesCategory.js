
// "use client";

// import CancelIcon from "@/_icons/CancelIcon";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { PlusIcon } from "lucide-react";
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import FoodList from "../food/FoodList";
// import HomeFoodList from "../food/HomeFoodList";

// export default function DishesCategory({ formik, categories, getCategory,  isDialogOpen,
//   setIsDialogOpen }) {
//   const { values, handleChange, handleBlur, handleSubmit } = formik;
  

//   const handleAddCategory =async (e) => {
//     e.preventDefault();
//     if (values.categoryName.trim() !== "") {
//       await handleSubmit();
//        setIsDialogOpen(false);
     
//     } else {
//       toast.error("Category name cannot be empty!");
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(`http://localhost:1000/category/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Deleted successfully");
//       getCategory();
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="pt-[84px] flex flex-col pl-[24px]">
//       <div className="h-[176px] bg-white w-[1171px] rounded-md p-6">
//         <p className="text-xl">Dishes category</p>

//         <div className="flex flex-wrap gap-2 mt-4">
//           {categories.map((category) => (
//             <div
//               key={category._id}
//               className="bg-white h-[36px] px-4 text-black border border-[#E4E4E7] rounded-full relative flex items-center"
//             >
//               <button
//                 onClick={() => handleDeleteCategory(category._id)}
//                 className="absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-300"
//               >
//                 <CancelIcon className="w-3 h-3" />
//               </button>

//               <span className="mx-2">{category.categoryName}</span>
//               <Badge className="ml-2">1</Badge>
//             </div>
//           ))}

//           <Button
//             className="bg-red-500 w-[36px] h-[36px] rounded-3xl"
//             onClick={() => setIsDialogOpen(true)}
//           >
//             <PlusIcon />
//           </Button>
//         </div>

//         {isDialogOpen && (
//           <form onSubmit={handleAddCategory}>
//             <div className="fixed inset-0 flex items-center justify-center z-50">
//               <div className="w-[412px] h-[224px] bg-white rounded-lg p-5 shadow-xl">
//                 <div className="flex justify-between">
//                   <h3 className="text-xl font-bold">Add New Category</h3>
//                   <button
//                     onClick={() => setIsDialogOpen(false)}
//                     className="px-3 py-3 bg-gray-200 rounded-full"
//                   >
//                     <CancelIcon />
//                   </button>
//                 </div>

//                 <h5 className="text-sm pt-[30px] pb-[8px]">Category name</h5>

//                 <Input
//                   type="text"
//                   name="categoryName"
//                   value={values.categoryName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter category name..."
//                   className="w-full px-4 py-2 border border-neutral-400 rounded-lg mb-4"
//                 />

//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-black text-white rounded-lg"
//                   >
//                     Add category
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         )}
//       </div>

//       <div className="space-y-6">
//         <FoodList categories={categories} />
        
//       </div>
//     </div>
//   );
// }



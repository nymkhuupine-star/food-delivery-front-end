import CancelIcon from "@/_icons/CancelIcon";
import Image from "next/image";

export default function Test() {
  return (
    <>
      <div className="bg-white border border-neutral-200  w-[397.33px] h-[342px] rounded-xl flex flex-col">
        <div className="flex justify-center mt-[16px] ml-[16px] w-[365.33px] h-[210px] relative">
          <image src="./Product.png" fill className="object-cover" />
        </div>
        <div className="pt-[20px] pl-[15px] pr-[16px]">
          <div className=" flex flex-row justify-between ">
            <p className="text-red-500 text-sm "> name</p>
            <p className="text-xs">price</p>
          </div>

          <p className="text-sm text-gray-600 mt-1">ingredients</p>
        </div>
      </div>
    </>
  );
}

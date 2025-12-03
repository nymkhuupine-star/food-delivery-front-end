"use client";

export default function MiniFoodCard() {
  return (
    <div className="bg-white border border-neutral-200  w-[270.75px] h-[241px] rounded-xl flex flex-col">
      <div className="flex justify-center pt-[16px]">
        {" "}
        <img src="./Product.png" width={238.75} height={129} />{" "}
      </div >
      <div className="pt-[20px] pl-[15px] pr-[16px]">
      <div className=" flex flex-row justify-between ">
        < p className="text-red-500 text-sm "> Finger food </p>
        <p className="text-xs"> $12.99</p>
      </div>
      
      <p className="text-xs ">
        {" "}
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
      </div>
    </div>
  );
}

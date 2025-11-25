"use client";

export default function FoodCard() {
  return (
    <div className="bg-gray-50  w-[397.33px] h-[342px] rounded-xl flex flex-col">
      <div className="flex justify-center pt-[16px]">
        {" "}
        <img src="./Product.png" width={365.33} height={210} />{" "}
      </div>
      <div className=" flex flex-row">
        <p> Finger food </p>
        <p> $12.99</p>
      </div>
      <p>
        {" "}
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
    </div>
  );
}

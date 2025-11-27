"use client";

export default function MiniFoodCard() {
  return (
    <div className="bg-white border border-indigo-600  w-[270.75px] h-[241px] rounded-xl flex flex-col">
      <div className="flex justify-center pt-[16px]">
        {" "}
        <img src="./Product.png" width={238.75} height={129} />{" "}
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

"use client";

export default function FoodCard({ image, name, price, description }) {
  return (
    <div className="bg-gray-50  w-[397.33px] h-[342px] rounded-xl flex flex-col">
      <div className="flex justify-center pt-[16px]">
        {" "}
        <img src={image} width={365.33} height={210} />{" "}
      </div>
      <div className=" flex flex-row">
        <p> {name}</p>
        <p> {price}</p>
      </div>
      <p>{description}</p>
    </div>
  );
}

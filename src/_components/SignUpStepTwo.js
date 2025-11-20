"use client";
import { useState } from "react";
import LoginIcon from "@/_icons/loginIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { useRouter } from "next/navigation";

const SignUpStepTwo = ({ onBack, formik }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { values, handleChange, handleBlur, errors, touched } = formik;
  return (
    <div className=" flex flex-row justify-center items-center gap-[48px] h-screen">
      <div className="flex flex-col">
        <div
          className="flex flex-wrap items-center gap-2 md:flex-row cursor-pointer"
          onClick={onBack}
        >
          <Button
            className="w-[36px] h-[36px]  "
            variant="outline"
            size="icon"
            aria-label="Submit"
          >
            <LoginIcon />
          </Button>
        </div>
        <p className="text-2xl pt-[24px] pb-[4px]">Create a strong password</p>
        <p className="text-base pb-[24px]">
          Create a strong password with letters, numbers.
        </p>
        <div
          className={`flex flex-col gap-[16px] ${
            errors.confirmPassword && touched.confirmPassword
              ? "pb-[8px]"
              : "pb-[4px]"
          }`}
        >
          <Input
            className={`w-[416px] h-[36px] border px-2 rounded ${
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-300 bg-white"
            }`}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
          />
          <div>
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm">{errors.password} </div>
            )}
          </div>
          <Input
            className={`w-[416px] h-[36px] border px-2 rounded ${
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-500"
                : "border-gray-300 bg-white"
            }`}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm"
            onChange={handleChange}
            value={values.confirmPassword}
            onBlur={handleBlur}
          />
          <div>
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-500 text-sm">
                {errors.confirmPassword}{" "}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 pb-[24px]">
          <Checkbox
            id="terms"
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(checked)}
          />
          <label htmlFor="terms">Show password</label>
        </div>

        <Badge
          className={`oklch(55.2% 0.016 285.938) w-[416px] h-[36px] text-sm ${
            !errors.confirmPassword
              ? "bg-[#18181B] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } `}
          variant="secondary"
        >
          Let's Go
        </Badge>
        <div className="flex flex-row pt-[24px] gap-[5px]">
          <p className="pl-[85px] text-base">Already have an account?</p>
          <p className="text-base  text-sky-400"> Log in </p>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <img src="/bike.png" width={856} height={904} />
      </div>
    </div>
  );
};

export default SignUpStepTwo;

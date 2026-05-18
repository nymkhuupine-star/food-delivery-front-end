"use client";

import { useState } from "react";
import LoginIcon from "@/_icons/loginIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const SignUpStepTwo = ({ onBack, formik }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;

  const isSubmitDisabled =
    !values.password ||
    !values.confirmPassword ||
    Boolean(errors.password) ||
    Boolean(errors.confirmPassword);

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="mx-auto w-full max-w-md">
            <div className="flex items-center gap-2">
              <Button
                className="h-9 w-9"
                variant="outline"
                size="icon"
                aria-label="Back"
                type="button"
                onClick={onBack}
              >
                <LoginIcon />
              </Button>
            </div>

            <p className="pt-6 text-2xl">Create a strong password</p>
            <p className="pb-6 text-base text-zinc-600">
              Create a strong password with letters, numbers, and symbols.
            </p>

            <div className="space-y-4">
              <div>
                <Input
                  className={`h-10 w-full ${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <div className="pt-2 text-sm text-red-500">
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <Input
                  className={`h-10 w-full ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="pt-2 text-sm text-red-500">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
                />
                <label htmlFor="show-password" className="text-sm text-zinc-700">
                  Show password
                </label>
              </div>

              <Button
                type="button"
                className={`h-10 w-full text-sm transition-colors ${
                  isSubmitDisabled
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-[#18181B] text-white hover:bg-[#27272A]"
                }`}
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Let&apos;s Go
              </Button>
            </div>

            <div className="pt-6 text-center text-sm">
              <span className="text-zinc-700">Already have an account?</span>{" "}
              <Link href="/login" className="text-sky-500 underline">
                Log in
              </Link>
            </div>
          </div>

          <div className="hidden items-center justify-center md:flex">
            <img
              src="/bike.png"
              alt="Delivery rider illustration"
              className="h-auto w-full max-w-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpStepTwo;

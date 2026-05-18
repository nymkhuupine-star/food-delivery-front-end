"use client";

import LoginIcon from "@/_icons/loginIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignUpStepOne = ({ onNext, formik }) => {
  const { values, handleChange, handleBlur, errors, touched } = formik;
  const isNextDisabled = Boolean(errors.email) || !values.email;

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
                aria-label="Create account"
                type="button"
              >
                <LoginIcon />
              </Button>
            </div>

            <p className="pt-6 text-2xl">Create your account</p>
            <p className="pb-6 text-base text-zinc-600">
              Sign up to explore your favorite dishes.
            </p>

            <div className="space-y-4">
              <div>
                <Input
                  className={`h-10 w-full ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email address"
                />
                {errors.email && touched.email && (
                  <div className="pt-2 text-sm text-red-500">
                    Invalid email. Use a format like example@email.com
                  </div>
                )}
              </div>

              <Button
                type="button"
                className={`h-10 w-full text-sm transition-colors ${
                  isNextDisabled
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-[#18181B] text-white hover:bg-[#27272A]"
                }`}
                variant="secondary"
                onClick={() => !isNextDisabled && onNext()}
                disabled={isNextDisabled}
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

export default SignUpStepOne;

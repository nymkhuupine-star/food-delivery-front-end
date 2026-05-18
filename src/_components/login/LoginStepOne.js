"use client";

import LoginIcon from "@/_icons/loginIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const LoginStepOne = ({ formik }) => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;

  const isSubmitDisabled =
    !values.email ||
    !values.password ||
    Boolean(errors.email) ||
    Boolean(errors.password);

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
              >
                <LoginIcon />
              </Button>
            </div>

            <p className="pt-6 text-2xl">Log in</p>
            <p className="pb-6 text-base text-zinc-600">
              Log in to enjoy your favorite dishes.
            </p>

            <div className="space-y-4">
              <div>
                <Input
                  className="h-10 w-full"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  type="email"
                  placeholder="Enter your email address"
                />
                {errors.email && touched.email && (
                  <div className="pt-2 text-sm text-red-500">
                    Invalid email. Use a format like example@email.com
                  </div>
                )}
              </div>

              <div>
                <Input
                  className="h-10 w-full"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                  placeholder="Password"
                />
                {errors.password && touched.password && (
                  <div className="pt-2 text-sm text-red-500">
                    Incorrect password. Please try again.
                  </div>
                )}
              </div>

              <p className="text-sm underline">Forgot password?</p>

              <Button
                type="button"
                className={`h-10 w-full text-sm transition-colors ${
                  isSubmitDisabled
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-[#18181B] text-white hover:bg-[#27272A]"
                }`}
                variant="secondary"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Let&apos;s Go
              </Button>
            </div>

            <div className="pt-6 text-center text-sm">
              <span className="text-zinc-700">Don&apos;t have an account?</span>{" "}
              <Link href="/sign-up" className="text-sky-500 underline">
                Sign up
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

export default LoginStepOne;

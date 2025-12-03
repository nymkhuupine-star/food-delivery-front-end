"use client";
import LoginIcon from "@/_icons/loginIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginStepOne = ({ formik }) => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;
  return (
    <div className=" flex flex-row justify-center items-center gap-[48px] h-screen">
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button
            className="w-[36px] h-[36px]  "
            variant="outline"
            size="icon"
            aria-label="Submit"
          >
            <LoginIcon />
          </Button>
        </div>
        <p className="text-2xl pt-[24px] pb-[4px]">Log in</p>
        <p className="text-base pb-[24px]">
          Log in to enjoy your favorite dishes.
        </p>
        <div className="flex flex-col gap-[16px]">
          <Input
            className="w-[416px] h-[36px] "
            name="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            type="email"
            placeholder="Enter your email address"
          />
          <div>
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm pb-[24px]">
                {" "}
                Invalid email. Use a format like example@email.com
              </div>
            )}
          </div>
          <Input
            className="w-[416px] h-[36px]"
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            placeholder="Password"
          />
          <div>
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm pb-[24px]">
                {" "}
                Incorrect password. Please try again.
              </div>
            )}
          </div>
          <p className="underline  text-sm pb-[24px]">Forgot password ?</p>
        </div>

        <Button
          className="oklch(55.2% 0.016 285.938) w-[416px] h-[36px] text-sm "
          variant="secondary"
          onClick={handleSubmit}
        >
          Let's Go
        </Button>
        <div className="flex flex-row pt-[24px] gap-[5px]">
          <p className="pl-[85px] text-base">Don’t have an account?</p>
          <p className="text-base  text-sky-400"> Sign up </p>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <img src="./bike.png" width={856} height={904} />
      </div>
    </div>
  );
};
export default LoginStepOne;

"use client";
import LoginIcon from "@/_icons/loginIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpStepOne = ({ onNext, formik }) => {
  const router = useRouter();

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;
  console.log("values", values);

  // const handleNextStep = () => {
  //   router.push(`/sign-up/step2`);
  // };
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
        <p className="text-2xl pt-[24px] pb-[4px]">Create your account</p>
        <p className="text-base pb-[24px]">
          Sign up to explore your favorite dishes.
        </p>
        <div
          className={`flex flex-col gap-[16px] ${
            errors.email && touched.email ? "pb-[8px]" : "pb-[24px]"
          }`}
        >
          <Input
            className={`w-[416px] h-[36px] border px-2 rounded ${
              errors.email && touched.email
                ? "border-red-500"
                : "border-gray-300 bg-white"
            }`}
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email address"
          />
        </div>
        <div>
          {errors.email && touched.email && (
            <div className="text-red-500 text-sm pb-[24px]">
              {" "}
              Invalid email. Use a format like example@email.com
            </div>
          )}
        </div>

        <Button
          className={`oklch(55.2% 0.016 285.938) w-[416px] h-[36px] text-sm ${
            !errors.email
              ? "bg-[#18181B] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } `}
          variant="secondary"
          onClick={() => {
            if (!errors.email && values.email) {
              onNext();
            }
          }}
          disabled={errors.email || !values.email}
        >
          Let's Go
        </Button>
        <div className="flex flex-row pt-[24px] gap-[5px]">
          <p className="pl-[85px] text-base">Already have an account?</p>
         <Link href="/login" className="text-base text-sky-400">
        Log in
      </Link>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <img src="/bike.png" width={856} height={904} />
      </div>
    </div>
  );
};

export default SignUpStepOne;






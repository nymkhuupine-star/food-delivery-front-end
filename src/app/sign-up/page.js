"use client";
import SignUpStepOne from "@/_components/signUp/SignUpStepOne";
import SignUpStepTwo from "@/_components/signUp/SignUpStepTwo";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const goToStepTwo = () => setStep(2);
  const goToStepOne = () => setStep(1);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "At least 8 characters required ")
      .matches(/[A-Za-z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Password not match"
    ),
  });

  const [message, setMessage] = useState("");

  const createUser = async (email, password) => {
  try {
    const response = await axios.post(
      "https://food-delivery-back-end-gq7z.onrender.com/authentication/sign-up",
      { email, password }
    );

    toast.success("Account created successfully. Please log in.");
    router.push("/login");

  } catch (error) {
    if (error.response?.status === 409) {
      toast.error("This email is already registered");
    } else if (error.response?.status === 400) {
      toast.error("Invalid email or password");
    } else {
      toast.error("Something went wrong. Please try again");
    }
  }
};


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      await createUser(email, password);
     
    },
  });

  return (
    <div>
      {step === 1 && <SignUpStepOne onNext={goToStepTwo} formik={formik} />}
      {step === 2 && <SignUpStepTwo onBack={goToStepOne} formik={formik} />}
    </div>
  );
}








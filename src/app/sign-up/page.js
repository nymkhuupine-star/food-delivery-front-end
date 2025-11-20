"use client";
import SignUpStepOne from "@/_components/SignUpStepOne";
import SignUpStepTwo from "@/_components/SignUpStepTwo";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    console.log(email, password);
    try {
      const response = await axios.post(
        "http://localhost:1000/authentication/sign-up",
        {
          email: email,
          password: password,
        }
      );
      router.push("/login");
      setMessage(response.data.message || "amjilttai bolloo");
      alert("amjilttai bolloo");
    } catch (error) {
      setMessage(error.response?.data?.message || "amjiltgui bolloo");
      alert("amjiltgui bolloo");
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
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      {step === 1 && <SignUpStepOne onNext={goToStepTwo} formik={formik} />}
      {step === 2 && <SignUpStepTwo onBack={goToStepOne} formik={formik} />}
    </div>
  );
}

"use client";
import LoginStepOne from "@/_components/login/LoginStepOne";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "At least 8 characters required ")
      .required("Required"),
  });

  const [message, setMessage] = useState("");

  const createUser = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post(
        "https://food-delivery-back-end-gq7z.onrender.com/authentication/login",
        {
          email: email,
          password: password,
        }
      );
      router.push("/");
     
      localStorage.setItem("token", response.data.token);
     toast.success("Login successful");
    } catch (error) {
       toast.error(
      error.response?.data?.message ||
      "Invalid email or password"
    );
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      await createUser(email, password);
    },
  });

  return (
    <div>
      <LoginStepOne formik={formik} />
      {/* <LoginForgetPass /> */}
    </div>
  );
}

"use client";
import LoginStepOne from "@/_components/LoginStepOne";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        "http://localhost:1000/authentication/login",
        {
          email: email,
          password: password,
        }
      );
      router.push("/home");
      setMessage(response.data.message || "amjilttai bolloo");
      alert("amjilttai bolloo");
    } catch (error) {
      setMessage(error.response?.data?.message || "amjiltgui bolloo");
      alert("Имэйл бүртгэлгүй байна");
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
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <LoginStepOne formik={formik} />
      {/* <LoginForgetPass /> */}
    </div>
  );
}

"use client";
import LoginStepOne from "@/_components/login/LoginStepOne";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiUrl } from "@/lib/api";
import { setCurrentUser } from "@/lib/orderStorage";

export default function Login() {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "At least 8 characters required ")
      .required("Required"),
  });

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(apiUrl("/authentication/login"), {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setCurrentUser(response.data.user);
      toast.success("Login successful");
      router.replace("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
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
      await loginUser(email, password);
    },
  });

  return (
    <div>
      <LoginStepOne formik={formik} />
      {/* <LoginForgetPass /> */}
    </div>
  );
}

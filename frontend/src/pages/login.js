"use client";

import React,{useState} from "react";
import { LinkButton } from "@/ui/components/LinkButton";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";

function LoginScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
      email: "",
      password: "",
      general: "",
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    };
     const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);
       setErrors({ email: "", password: "", general: "" });
       try {
         if (!formData.email) {
           setErrors((prev) => ({
             ...prev,
             email: "Email is required",
           }));
           return;
         }

         if (!formData.password) {
           setErrors((prev) => ({
             ...prev,
             password: "Password is required",
           }));
           return;
         }
         const response = await axios.post(
           "http://localhost:8000/user/login/",
           formData,
           {
             headers: {
               "Content-Type": "application/json",
             },
           }
         );

         if (response.status === 200) {
           localStorage.setItem("user", JSON.stringify(response.data.user));
           router.push("/dashboard");
         }
       } catch (error) {
         if (error.response) {
           
           if (error.response.status === 400) {
             setErrors((prev) => ({
               ...prev,
               general: error.response.data.error,
             }));
           } else if (error.response.status === 401) {
             setErrors((prev) => ({
               ...prev,
               general: "Invalid email or password",
             }));
           }
         } else {
           setErrors((prev) => ({
             ...prev,
             general: "Network error. Please try again.",
           }));
         }
       } finally {
         setLoading(false);
       }
     };
  return (
    <div className="min-h-screen w-[100vw] bg-white flex justify-center items-center">
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start mobile:flex-col mobile:flex-wrap mobile:gap-0">
          <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-6 self-stretch px-12 py-12">
            <div className="flex w-full max-w-[448px] flex-col items-center justify-center gap-8">
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <img
                  className="flex-none mobile:h-auto mobile:w-auto mobile:flex-none"
                  src="https://res.cloudinary.com/subframe/image/upload/v1739949962/uploads/282/bjccj7sjy8q8kzzjpbpp.png"
                />
                <span className="text-heading-2 font-heading-2 text-default-font">
                  Login Account
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <span className="text-body font-body text-subtext-color">
                    By signing up you agree to the
                  </span>
                  <LinkButton variant="brand" onClick={() => {}}>
                    Terms of Service
                  </LinkButton>
                  <span className="text-body font-body text-subtext-color">
                    and
                  </span>
                  <LinkButton variant="brand" onClick={() => {}}>
                    Privacy Policy
                  </LinkButton>
                </div>
              </div>
              {errors.general && (
                <div className="w-full p-3 bg-error-50 text-error-600 rounded-md text-center">
                  {errors.general}
                </div>
              )}
              <div className="flex w-full flex-col items-start justify-center gap-6">
                <TextField
                  className="h-auto w-full flex-none"
                  label="Email address"
                  helpText={errors.email}
                  error={!!errors.email}
                >
                  <TextField.Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </TextField>
                <TextField
                  className="h-auto w-full flex-none"
                  label="Password"
                  helpText={errors.password}
                  error={!!errors.password}
                >
                  <TextField.Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </TextField>
                <Button
                  className="h-10 w-full flex-none"
                  size="large"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={loading}
                >
                  Continue
                </Button>
              </div>
              <div className="flex flex-wrap items-start gap-2">
                <span className="text-body font-body text-subtext-color">
                  Don&#39;t have an account?
                </span>
                <LinkButton
                  variant="brand"
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;

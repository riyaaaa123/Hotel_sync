"use client";

import React,{useState,useEffect} from "react";
import { Progress } from "@/ui/components/Progress";
import { OnboardingStepItem } from "@/ui/components/OnboardingStepItem";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";

function OnboardingLocationStep2() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "", 
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate form
      const newErrors = {};
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = "Please enter a valid email";

      if (!formData.password.trim())
        newErrors.password = "Password is required";

      if (formData.password !== formData.confirm_password) {
        newErrors.confirm_password = "Passwords don't match";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      const hotelDetails = JSON.parse(localStorage.getItem("hotelDetails"));

      if (!hotelDetails) {
        setErrors({
          general: "Missing hotel details. Please start from step 1.",
        });
        return;
      }
      const userData = {
        ...hotelDetails,
        email: formData.email,
        password: formData.password,
      };

      // Call API to create user
      const response = await axios.post(
        "http://localhost:8000/user/register/",
        userData
      );

      if (response.status === 201) {
        localStorage.setItem("email", formData.email);
        localStorage.removeItem("hotelDetails");
        router.push("/locate");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response?.data) {
        // Handle backend validation errors
        setErrors({
          ...errors,
          ...error.response.data,
          general: error.response.data.detail || "Failed to create account",
        });
      } else {
        setErrors({ general: "Network error. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-[100vw] bg-white">
      <div className="container max-w-none flex h-full w-full items-start mobile:flex-col mobile:flex-nowrap mobile:gap-6">
        <div className="flex w-80 flex-none flex-col items-start self-stretch border-r border-solid border-neutral-border mobile:h-auto mobile:w-full mobile:flex-none mobile:border-b mobile:border-solid mobile:border-neutral-border mobile:px-0 mobile:py-0">
          <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-6 py-6 mobile:px-6 mobile:py-6">
            <div className="flex w-full flex-col items-start gap-1">
              <span className="w-full text-heading-3 font-heading-3 text-default-font text-xl">
                Getting started
              </span>
              <span className="text-body font-body text-subtext-color text-md">
                Set up your hotel information
              </span>
            </div>
            <div className="flex w-full items-center gap-4">
              <Progress value={50} />
              <span className="text-caption-bold font-caption-bold text-default-font">
                2/4 completed
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start px-2 py-2 mobile:px-0 mobile:py-0">
            <OnboardingStepItem completed={true} icon="FeatherDatabase">
              Hotel Details
            </OnboardingStepItem>
            <OnboardingStepItem selected={true} icon="FeatherUser">
              Account Details
            </OnboardingStepItem>
            <OnboardingStepItem icon="FeatherMapPin">
              Select location
            </OnboardingStepItem>
            <OnboardingStepItem icon="FeatherRocket">
              Upload Data
            </OnboardingStepItem>
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch px-6 py-6 mobile:h-auto mobile:w-full mobile:flex-none mobile:flex-col mobile:flex-nowrap mobile:gap-0 mobile:px-0 mobile:py-0">
          <div className="flex flex-col items-start gap-4">
            <span className="text-heading-3 font-heading-3 text-default-font text-xl">
              Account Details
            </span>
            {errors.general && (
              <div className="w-full p-3 bg-error-50 text-error-600 rounded-md">
                {errors.general}
              </div>
            )}
            <TextField
              className="h-auto w-full flex-none mobile:h-auto mobile:w-full mobile:flex-none "
              label="Email"
              helpText={errors.email}
              error={!!errors.email}
            >
              <TextField.Input
                placeholder="Enter your email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Set Password"
              helpText={errors.password}
              error={!!errors.password}
            >
              <TextField.Input
                placeholder="Create a password "
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Re-enter Password"
              helpText={errors.confirm_password}
              error={!!errors.confirm_password}
            >
              <TextField.Input
                placeholder="Confirm your password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </TextField>
          </div>
          <div className="flex w-full items-center gap-2">
            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
              className="min-w-[120px]"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLocationStep2;

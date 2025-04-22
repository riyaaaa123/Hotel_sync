"use client";
import React,{useState} from "react";
import { Progress } from "@/ui/components/Progress";
import { OnboardingStepItem } from "@/ui/components/OnboardingStepItem";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LinkButton } from "@/ui/components/LinkButton";

function OnboardingLocationStep1() {
   const router = useRouter();
   const [formData, setFormData] = useState({
     owner_name: "",
     hotel_name: "",
     contact_number: "",
   });
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState({});

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({
       ...prev,
       [name]: value,
     }));
   };

   const handleSubmit = async () => {
     setLoading(true);
     try {
       // Validate form
       const newErrors = {};
       if (!formData.hotel_name.trim())
         newErrors.hotel_name = "Hotel name is required";
       if (!formData.owner_name.trim())
         newErrors.owner_name = "Owner name is required";
       if (!formData.contact_number.trim())
         newErrors.contact_number = "Contact number is required";

       if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
       }

       // Store in local storage to use in next steps
       localStorage.setItem("hotelDetails", JSON.stringify(formData));
       router.push("/account");
     } catch (error) {
       console.error("Error saving hotel details:", error);
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
              <span className="text-body font-body text-subtext-color">
                Set up your hotel information
              </span>
            </div>
            <div className="flex w-full items-center gap-4">
              <Progress value={25} />
              <span className="text-caption-bold font-caption-bold text-default-font">
                1/4 completed
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start px-2 py-2 mobile:px-0 mobile:py-0">
            <OnboardingStepItem selected={true} icon="FeatherDatabase">
              Hotel Details
            </OnboardingStepItem>
            <OnboardingStepItem icon="FeatherUser">
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
              Hotel Details
            </span>
            <TextField
              className="h-auto w-full flex-none mobile:h-auto mobile:w-full mobile:flex-none"
              label="Hotel Name"
              helpText={errors.hotel_name}
              error={!!errors.hotel_name}
            >
              <TextField.Input
                placeholder="Enter hotel name"
                name="hotel_name"
                value={formData.hotel_name}
                onChange={handleChange}
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Owner Name"
              helpText={errors.owner_name}
              error={!!errors.owner_name}
            >
              <TextField.Input
                placeholder="Enter owner name"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleChange}
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Contact Number"
              helpText={errors.contact_number}
              error={!!errors.contact_number}
            >
              <TextField.Input
                placeholder="Enter contact number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
              />
            </TextField>
          </div>
          <div className="flex w-full items-center ">
            <Button onClick={handleSubmit} loading={loading} disabled={loading}>
              Next
            </Button>
          </div>
          <div className="flex flex-wrap items-start gap-2 ">
            <span className="text-body font-body text-black">
              Already have an account?
            </span>
            <LinkButton className="mt-[-2]" variant="brand" onClick={() => router.push("/login")}>
              Login
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLocationStep1;

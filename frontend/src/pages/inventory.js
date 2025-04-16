"use client";

import React, { useState } from "react";
import { OnboardingStepItem } from "@/ui/components/OnboardingStepItem";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";

function Settings2() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    daily_quantity: "",
    order_frequency: "",
    order_day: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get the hotel ID from wherever you store it (localStorage, context, etc.)
     const id = localStorage.getItem("id"); // or from your auth context

      if (!id) {
        throw new Error("Hotel ID not found");
      }

      const payload = {
        id: id,
        ...formData,
      };

      const response = await axios.post(
        "http://localhost:8000/user/create_inventory/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      setFormData({
        name: "",
        price: "",
        daily_quantity: "",
        order_frequency: "",
        order_day: "",
      });
      router.push('/inventory');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] min-h-screen bg-white">
      <div className="container max-w-none flex h-full w-full items-start mobile:flex-col mobile:flex-nowrap mobile:gap-6">
        <div className="flex w-80 flex-none flex-col items-start self-stretch border-r border-solid border-neutral-border mobile:h-auto mobile:w-full mobile:flex-none mobile:border-b mobile:border-solid mobile:border-neutral-border mobile:px-0 mobile:py-0">
          <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-6 py-6 mobile:px-6 mobile:py-6">
            <span className="w-full text-heading-1 font-heading-1  text-xl">
              Settings
            </span>
          </div>
          <div className="flex w-full flex-col items-start px-2 py-2 mobile:px-0 mobile:py-0">
            <OnboardingStepItem selected={true} icon="FeatherFolder">
              Inventory
            </OnboardingStepItem>
            {/* <OnboardingStepItem icon="FeatherDatabase">
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
            </OnboardingStepItem> */}
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch px-6 py-6 mobile:h-auto mobile:w-full mobile:flex-none mobile:flex-col mobile:flex-nowrap mobile:gap-0 mobile:px-0 mobile:py-0">
          <div className="flex flex-col items-start gap-4">
            <span className="text-heading-3 font-heading-3 text-xl">
              Inventory
            </span>
            {error && <div className="text-red-500">Error: {error}</div>}

            {success && (
              <div className="text-green-500">
                Inventory item added successfully!
              </div>
            )}
            <TextField
              className="h-auto w-full text-[15px] flex-none mobile:h-auto mobile:w-full mobile:flex-none"
              label="Name"
              helpText=""
            >
              <TextField.Input
                name="name"
                placeholder="Item name"
                value={formData.name}
                onChange={handleChange}
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Price"
              helpText=""
            >
              <TextField.Input
                name="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Quantity Required Daily"
              helpText=""
            >
              <TextField.Input
                name="daily_quantity"
                type="number"
                placeholder="0"
                value={formData.daily_quantity}
                onChange={handleChange}
                min="0"
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Frequency of Order"
              helpText=""
            >
              <div className="w-[95%] py-[1.5px]">
                <select
                  name="order_frequency"
                  value={formData.order_frequency}
                  onChange={handleChange}
                  className="w-full bg-transparent text-[12px] "
                >
                  <option value=""></option>
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>
            </TextField>
            {formData.order_frequency === "WEEKLY" && (
              <TextField
                className="h-auto w-full flex-none"
                label="Usual Order Day"
                helpText=""
              >
                <div className="w-[95%] py-[1.5px]">
                  <select
                    name="order_day"
                    value={formData.order_day}
                    onChange={handleChange}
                    className="w-full bg-transparent text-[12px]"
                  >
                    <option value="MON">Monday</option>
                    <option value="TUE">Tuesday</option>
                    <option value="WED">Wednesday</option>
                    <option value="THU">Thursday</option>
                    <option value="FRI">Friday</option>
                    <option value="SAT">Saturday</option>
                    <option value="SUN">Sunday</option>
                  </select>
                </div>
              </TextField>
            )}
          </div>
          <div className="flex w-full items-center gap-2">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Add Inventory"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings2;

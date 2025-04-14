"use client";

import React,{useState} from "react";
import { OnboardingStepItem } from "@/ui/components/OnboardingStepItem";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import { useRouter } from "next/navigation";

function Settings2() {
    const router = useRouter();
  return (
    <div className="w-[100vw] min-h-screen bg-white">
    <div className="container max-w-none flex h-full w-full items-start mobile:flex-col mobile:flex-nowrap mobile:gap-6">
      <div className="flex w-80 flex-none flex-col items-start self-stretch border-r border-solid border-neutral-border mobile:h-auto mobile:w-full mobile:flex-none mobile:border-b mobile:border-solid mobile:border-neutral-border mobile:px-0 mobile:py-0">
        <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-6 py-6 mobile:px-6 mobile:py-6">
          <span className="w-full text-heading-1 font-heading-1 text-default-font">
            Settings
          </span>
        </div>
        <div className="flex w-full flex-col items-start px-2 py-2 mobile:px-0 mobile:py-0">
          <OnboardingStepItem selected={true} icon="FeatherFolder">
            Inventory
          </OnboardingStepItem>
          <OnboardingStepItem icon="FeatherDatabase">
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
          <span className="text-heading-3 font-heading-3 text-default-font">
            Inventory
          </span>
          <TextField
            className="h-auto w-full flex-none mobile:h-auto mobile:w-full mobile:flex-none"
            label="Name"
            helpText=""
          >
            <TextField.Input
              placeholder=""
              value=""
              onChange={() => {}}
            />
          </TextField>
          <TextField
            className="h-auto w-full flex-none"
            label="Price"
            helpText=""
          >
            <TextField.Input
              placeholder=""
              value=""
              onChange={() => {}}
            />
          </TextField>
          <TextField
            className="h-auto w-full flex-none"
            label="Quantity Required Daily"
            helpText=""
          >
            <TextField.Input
              placeholder=""
              value=""
              onChange={() => {}}
            />
          </TextField>
          <TextField
            className="h-auto w-full flex-none"
            label="Frequency of Order"
            helpText=""
          >
            <TextField.Input
              placeholder=""
              value=""
              onChange={() => {}}
            />
          </TextField>
          <TextField
            className="h-auto w-full flex-none"
            label="Usual Order Day"
            helpText=""
            iconRight="FeatherChevronDown"
          >
            <TextField.Input
              placeholder=""
              value=""
              onChange={() => {}}
            />
          </TextField>
        </div>
        <div className="flex w-full items-center gap-2">
          <Button onClick={() => {}}>
            Add More
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Settings2;

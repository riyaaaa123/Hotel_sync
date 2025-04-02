"use client";

import React from "react";
import { Progress } from "@/ui/components/Progress";
import { OnboardingStepItem } from "@/ui/components/OnboardingStepItem";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";

function OnboardingLocationStep2() {
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
          <TextField
            className="h-auto w-full flex-none mobile:h-auto mobile:w-full mobile:flex-none "
            label="Email"
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
            label="Set Password"
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
            label="Re-enter Password"
            helpText=""
          >
            <TextField.Input
              placeholder=""
              value=""
              onChange={() => {}}
            />
          </TextField>
        </div>
        <div className="flex w-full items-center gap-2">
          <Button  onClick={() => {}}>
            Next
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default OnboardingLocationStep2;

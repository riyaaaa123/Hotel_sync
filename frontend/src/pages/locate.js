"use client";

import React,{useState} from "react";
import { Progress } from "@/ui/components/Progress";
import { OnboardingStepItem } from "@/ui/components/OnboardingStepItem";
import { TextField } from "@/ui/components/TextField";
import { Button } from "@/ui/components/Button";
import dynamic from "next/dynamic";

// Dynamically import LocationSelector with SSR disabled
const LocationSelector = dynamic(
  () => import("../components/LocationSelector"),
  { ssr: false }
);

function OnboardingLocationStep3() {
    const [location, setLocation] = useState(null);
    const email = localStorage.getItem("email");

  return (
    <div className="min-h-screen w-[100vw] bg-white">
      <div className="container max-w-none flex h-full w-full items-start mobile:flex-col mobile:flex-nowrap mobile:gap-0">
        <div className="flex w-80 flex-none flex-col items-start self-stretch border-r border-solid border-neutral-border mobile:h-auto mobile:w-full mobile:flex-none mobile:border-b mobile:border-solid mobile:border-neutral-border">
          <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-6 py-6">
            <div className="flex w-full flex-col items-start gap-1">
              <span className="w-full text-heading-3 font-heading-3 text-default-font text-xl">
                Getting started
              </span>
              <span className="text-body font-body text-subtext-color">
                Set up your hotel
              </span>
            </div>
            <div className="flex w-full items-center gap-4">
              <Progress value={75} />
              <span className="text-caption-bold font-caption-bold text-default-font">
                3/4 completed
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start px-2 py-2">
            <OnboardingStepItem completed={true} icon="FeatherBrush">
              Hotel Details
            </OnboardingStepItem>
            <OnboardingStepItem completed={true} icon="FeatherLayoutTemplate">
              Account Details
            </OnboardingStepItem>
            <OnboardingStepItem selected={true} icon="FeatherMapPin">
              Select location
            </OnboardingStepItem>
            <OnboardingStepItem icon="FeatherRocket">
              Upload Data
            </OnboardingStepItem>
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch px-6 py-6 mobile:h-auto mobile:w-full mobile:flex-none">
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-1">
              <span className="text-heading-3 font-heading-3 text-default-font text-xl">
                Location
              </span>
              <span className="text-body font-body text-subtext-color text-[13px]">
                Pick a location on the map for your hotel
              </span>
            </div>
            <div className="w-full h-[500px] rounded-lg overflow-hidden ">
              <LocationSelector email={email} setLocation={setLocation} />
            </div>
            {location && (
              <div className="w-full p-4 bg-neutral-50 rounded-lg">
                <p className="text-body font-body text-default-font">
                  Selected Location: Latitude: {location.lat}, Longitude:{" "}
                  {location.lng}
                </p>
              </div>
            )}
          </div>
          <div className="flex w-full items-center gap-2">
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLocationStep3;

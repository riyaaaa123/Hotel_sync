"use client";

import React, { useState, useEffect, useRef } from "react";
import { Progress } from "@/ui/components/Progress";
import { OnboardingStepItem } from "@/ui/components/OnboardingStepItem";
import { Button } from "@/ui/components/Button";
import * as SubframeCore from "@subframe/core";
import { useRouter } from "next/navigation";
import axios from "axios";

function OnboardingLocationStep4() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setUserId(id);
    }
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setError("");
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one file to upload");
      return;
    }

    if (!userId) {
      setError(
        "User identification failed. Please restart the onboarding process"
      );
      return;
    }

    const formData = new FormData();
    formData.append("hotel_user", userId);

    selectedFiles.forEach((file) => {
      formData.append("file", file);
    });

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/user/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        router.push("/dashboard");
      } else {
        setError("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        error.response?.data?.message ||
          "Network error during upload. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] min-h-screen bg-white">
      <div className="container max-w-none flex h-full w-full items-start mobile:flex-col mobile:flex-nowrap mobile:gap-6">
        {/* Sidebar */}
        <div className="flex w-80 flex-none flex-col items-start self-stretch border-r border-solid border-neutral-border mobile:w-full mobile:border-b mobile:px-0 mobile:py-0">
          <div className="flex w-full flex-col items-start gap-4 border-b border-solid border-neutral-border px-6 py-6">
            <div className="flex w-full flex-col items-start gap-1">
              <span className="w-full text-heading-3 font-heading-3 text-default-font text-xl">
                Getting started
              </span>
              <span className="text-body font-body text-subtext-color">
                Set up your hotel information
              </span>
            </div>
            <div className="flex w-full items-center gap-4">
              <Progress value={90} />
              <span className="text-caption-bold font-caption-bold text-default-font">
                4/4 completed
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start px-2 py-2">
            <OnboardingStepItem completed={true} icon="FeatherDatabase">
              Hotel Details
            </OnboardingStepItem>
            <OnboardingStepItem completed={true} icon="FeatherUser">
              Account Details
            </OnboardingStepItem>
            <OnboardingStepItem completed={true} icon="FeatherMapPin">
              Select location
            </OnboardingStepItem>
            <OnboardingStepItem selected={true} icon="FeatherRocket">
              Upload Data
            </OnboardingStepItem>
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch px-6 py-6 mobile:h-auto mobile:w-full mobile:flex-none mobile:flex-col mobile:flex-nowrap mobile:gap-4 mobile:px-0 mobile:py-0">
          <div className="flex flex-col items-start gap-4 mobile:h-auto mobile:w-full mobile:flex-none">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font text-xl">
                Upload Data
              </span>
              <a href="/template.csv" download>
                <Button variant="brand-secondary">
                  Download Template
                </Button>
              </a>
            </div>
            <div className="flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
              <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-6 py-4">
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Upload files
                </span>
                <span className="text-body font-body text-subtext-color">
                  (CSV, JSON)
                </span>
              </div>

              <div className="flex w-full flex-col items-start gap-4 px-6 py-6">
                <div
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-brand-600 px-6 py-8 cursor-pointer hover:bg-brand-50 transition-colors"
                  onClick={triggerFileInput}
                >
                  <SubframeCore.Icon
                    className="text-heading-1 font-heading-1 text-brand-700"
                    name="FeatherUploadCloud"
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-body font-body text-default-font text-center">
                      Click to select files or drag to upload
                    </span>
                  </div>

                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    ref={fileInputRef}
                    accept=".csv,.json"
                  />

                  <Button
                    variant="neutral-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput();
                    }}
                  >
                    Choose Files
                  </Button>
                </div>

                {error && (
                  <div className="w-full p-3 bg-error-50 text-error-600 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {selectedFiles.length > 0 && (
                  <div className="w-full mt-4">
                    <div className="text-body-bold font-body-bold text-default-font mb-2">
                      Selected Files ({selectedFiles.length}):
                    </div>
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between text-body text-default-font bg-neutral-50 p-2 rounded"
                        >
                          <span className="truncate max-w-xs">{file.name}</span>
                          <span className="text-caption text-subtext-color">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex  items-center justify-end gap-2">
            <Button
              variant="neutral-secondary"
              onClick={() => router.push("/dashboard")}
              disabled={loading}
            >
              Skip
            </Button>
            <Button
              onClick={handleUpload}
              loading={loading}
              disabled={loading || selectedFiles.length === 0}
              className="min-w-[120px]"
            >
              {loading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLocationStep4;

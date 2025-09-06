"use client"
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import axios from "axios"
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";



 function Onboarding() {
  const { token } = useAuth();
  const [pageIndex, setPageIndex] = useState(0);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");


  const agegroupMutation= useMutation({
  mutationFn: () => {

    // ✅ return the Axios call
    return axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`, {
      age_group: "<Kid> <Teen> or <Adult>"
    }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  },
  onSuccess: (res) => {
    console.log("Mutation succeeded age_group updated, raw response:", res);

    // If your API wraps data, log deeper
    if (res?.data) {
      console.log("OTP API returned:", res.data);
      router.push("/onboarding")

      // Uncomment when you're ready
      // login(user, token);
      // window.location.href = isNewUser ? "/quiz" : "/dashboard";
    }
  },
  onError: (error) => {
    console.log("Mutation failed:", error.message);

    if (error.response) {
      console.log("Error response data:", error.response.data);
    }
  },
});
  

  return (
    <>
    {(!tab || tab === "1") && <Step1 />}
    {tab === "2" && <Step2 />}
    {tab === "3" && <Step3 />}
    {tab === "4" && <Step4 />}
    {tab === "5" && <Step5 />}
    {tab === "6" && <Step6 />}
    </>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <Onboarding />
    </Suspense>
  );
}
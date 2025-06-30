"use client"
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";



export default function page() {
  const [pageIndex, setPageIndex] = useState(0);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  

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
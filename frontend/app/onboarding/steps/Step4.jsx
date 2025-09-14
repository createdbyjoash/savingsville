"use client";
import React, { useState } from "react";
import WhiteButton from "@/components/WhiteButton";
import AccentButton from "@/components/AccentButton";
import Image from "next/image";
import SquareButton from "@/components/SquareButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";

const questions = [
  {
    image: "/kid.png",
    alt: "beginner",
    label: "Kid",
    smallText: "(7-12)",
  },
  {
    image: "/teen.png",
    alt: "beginner",
    label: "Teen",
    smallText: "(13-17)",
  },
  {
    image: "/young_adult.png",
    alt: "beginner",
    label: "Adult",
    smallText: "(18-25)",
  },
];

export default function Step4() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { token } = useAuth();

  const agegroupMutation = useMutation({
    mutationFn: (ageGroup) => {
      return axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
        { age_group: ageGroup },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      console.log("✅ Age group updated:", res.data);
      router.push(`?tab=6`)
    },
    onError: (error) => {
      console.error("❌ Mutation failed:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    },
  });

  return (
    <main className="grid items-center xl:max-w-[1600px] mx-auto">
      <section className="grid min-[875px]:grid-cols-2 gap-2 lg:w-[85%] xl:w-[80%] mx-auto w-[95%] my-auto h-[100vh]">
        <div className="max-[901px]:w-fit max-[901px]:mx-auto space-y-8 mt-[3.5em] max-sm:w-[90vw]">
          {/* Logo */}
          <div className="flex">
            <Image
              src="/logo_icon.png"
              alt="Logo"
              width={10}
              height={10}
              className="my-auto max-lg:w-[60px] max-lg:h-[60px] w-[50px] h-[50px]"
              unoptimized
            />
            <h1 className="max-sm:text-xl mt-2 font-heading font-bold text-xl font-display text-center text-secondary ml-[-4px]">
              Savingsville
            </h1>
          </div>

          {/* Progress */}
          <div className="space-y-2 w-fit">
            <span className="flex gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`${
                    i === 3 ? "bg-secondary" : "bg-secondary opacity-35"
                  } h-[6px] w-[2.5em] rounded-md`}
                />
              ))}
            </span>
            <small className="text-secondary font-medium">4 of 6</small>
          </div>

          {/* Question */}
          <h2 className="font-baloo font-bold max-sm:text-2xl text-4xl md:max-w-[15em] max-sm:w-[90vw]">
            Which <span className="text-secondary">age group?</span> best
            describes you?
          </h2>

          {/* Options */}
          <div className="flex gap-3 md:p-5 md:gap-5 max-md:bg-[#E9E9E9] md:bg-[#E9E9E9] md:shadow-2xl md:w-fit max-md:w-fit rounded-[2em] max-sm:bg-primary max-sm:mx-auto">
            {questions.map((item, index) => (
              <SquareButton
                key={index}
                image={item.image}
                alt={item.alt}
                label={item.label}
                smallText={item.smallText}
                active={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-fit">
            <WhiteButton label="Back" onClick={() => router.push(`?tab=3`)} />
            <AccentButton
              label={agegroupMutation.isPending ? "Saving..." : "Continue"}
              disabled={agegroupMutation.isPending}
              onClick={() => {
                if (activeIndex === null) {
                  setError("Please select your age group before continuing.");
                  return;
                }
                setError("");
                const chosenAgeGroup = questions[activeIndex].label;
                console.log("Selected age group:", chosenAgeGroup);
                agegroupMutation.mutate(chosenAgeGroup);
              }}
            />
          </div>
          {error && <p className="text-red-500 font-medium mt-2">{error}</p>}
        </div>

        {/* Right side image */}
        <div className="max-[890px]:hidden grid w-full h-full place-items-center">
          <div className="grid min-[901px]:w-[60%] min-[950px]:w-[75%] h-[90%] relative object-cover items-center mx-auto xl:min-h-[380px]">
            <Image
              src="/onboarding-4.png"
              alt="onboarding"
              fill
              unoptimized
              className="object-cover rounded-[2em]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

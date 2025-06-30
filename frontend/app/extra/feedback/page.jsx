"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from "../../../components/Sidebar";

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'Go to Settings > Account > Reset Password. Follow the instructions sent to your email.'
  },
  {
    question: 'How do I track my progress?',
    answer: 'Your progress is visible on your profile page, including streaks, experience, and leaderboard rank.'
  },
  {
    question: 'How can I contact support?',
    answer: 'Use the Feedback button below or email us at support@savingsville.com.'
  },
  {
    question: 'Where can I find more resources?',
    answer: 'Check the Resources section in the sidebar for curated financial education materials.'
  }
];

export default function FeedbackPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-[#e6cafd] flex flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col px-10 pt-6 pb-8">
        {/* Breadcrumb + Banner + Stats */}
        {/* Breadcrumb + Stats */}
        {/* Breadcrumb + Stats */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Image src="/home.svg" alt="Home" width={28} height={28} className="inline-block" />
            <span className="text-[#ffb300] font-bold">Home</span>
            <span className="mx-1 text-[#7c3aed]">»</span>
            <span className="text-[#7c3aed] font-bold">Extra</span>
            <span className="mx-1 text-[#7c3aed]">»</span>
            <span className="text-[#7c3aed] font-bold">Settings</span>
            <span className="mx-1 text-[#7c3aed]">»</span>
            <span className="text-black font-bold">Feedback</span>
          </div>
          <div className="flex items-center gap-4 text-base font-bold">
            <span className="flex items-center gap-1 text-[#ffb300]">
              <Image src="/streak.svg" alt="Streak" width={22} height={22} /> 1
            </span>
            <span className="flex items-center gap-1 text-[#ff5a7b]">
              <Image src="/lives.svg" alt="Lives" width={22} height={22} /> 4
            </span>
            <span className="flex items-center gap-1 text-[#ffb300]">
              <Image src="/experince.svg" alt="Coins" width={22} height={22} /> 15
            </span>
          </div>
        </div>
        {/* Banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#c08bfa] to-[#a16ae8] rounded-2xl px-12 py-8 mb-6 shadow-lg">
          <div>
            <div className="font-extrabold text-2xl mb-1">Set Make Cent to your taste</div>
            <div className="text-[#8c7fae] font-medium text-base">Have the flexibility to customize<br />to your perfect taste</div>
          </div>
          <Image src="/settings.svg" alt="Settings" width={100} height={100} />
        </div>

        {/* FAQ Section */}
        <div className="flex-1 px-0 py-0 w-full max-w-2xl mx-auto">
          <h2 className="text-center font-extrabold text-3xl mb-6 mt-2">Frequently Asked Questions</h2>
          <div className="flex flex-col divide-y divide-[#a16ae8] border-y border-[#a16ae8] mb-10">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <button
                  className="w-full flex justify-between items-center px-6 py-5 focus:outline-none group"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="text-lg font-bold text-left text-black group-hover:text-[#a16ae8] transition-colors">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 text-[#a16ae8] transform transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === idx && (
                  <div className="bg-transparent text-[#6B7280] text-base px-6 pb-5 pt-0">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center font-extrabold text-2xl mb-4 mt-10">Still unsure about something?</div>
          <div className="flex justify-center">
            <button
              className="bg-[#00e38c] hover:bg-[#00b86b] text-black font-extrabold text-lg px-10 py-4 rounded-xl shadow transition"
              onClick={() => alert('Feedback form coming soon!')}
            >
              SEND FEEDBACK
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <Link href="/extra/settings" className="text-xs text-[#7c3aed] hover:underline">&larr; Back to Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

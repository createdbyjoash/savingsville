import React from 'react';
import Image from 'next/image';

export default function GamesTab() {
  return (
    <div className="min-h-screen bg-[#e6cafd] flex flex-col items-center py-8 px-2 md:px-0">
      {/* Breadcrumb */}
      <div className="w-full max-w-6xl mb-4">
        <div className="flex items-center gap-2 text-lg font-heading font-bold">
          <Image src="/home.svg" alt="Home" width={32} height={32} />
          <span className="text-[#7c3aed] opacity-60">Home</span>
          <span className="mx-1 text-[#7c3aed] opacity-60">»</span>
          <span className="text-black font-extrabold">Game</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl items-start justify-center">
        {/* Game Image Section */}
        <div className="flex-1 flex items-start justify-center">
          <div className="bg-white rounded-[32px] shadow-lg p-2 w-full flex items-center justify-center" style={{minHeight: 500}}>
            <Image src="/gamesimg.png" alt="Game City" width={700} height={500} className="rounded-[32px] object-cover w-full h-auto" />
          </div>
        </div>
        {/* Stats & Actions */}
        <div className="flex flex-col gap-6 w-full md:w-[340px] items-stretch justify-start">
          {/* Stats Cards */}
          <div className="w-full flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
              <Image src="/cashbalance.svg" alt="Cash Balance" width={48} height={48} />
              <div>
                <div className="font-heading font-bold text-base text-black">Cash Balance</div>
                <div className="font-heading font-extrabold text-2xl text-black">$5,000,000</div>
              </div>
            </div>
            <div className="bg-[#f3e6ff] rounded-2xl shadow p-4 flex items-center gap-4">
              <Image src="/assets.svg" alt="Asset" width={48} height={48} />
              <div>
                <div className="font-heading font-bold text-base text-black">Asset</div>
                <div className="font-heading font-extrabold text-2xl text-[#00c896]">$890,000</div>
              </div>
            </div>
            <div className="bg-[#f3e6ff] rounded-2xl shadow p-4 flex items-center gap-4">
              <Image src="/debt.svg" alt="Debt" width={48} height={48} />
              <div>
                <div className="font-heading font-bold text-base text-black">Debt</div>
                <div className="font-heading font-extrabold text-2xl text-[#ff5a7b]">- $150,000</div>
              </div>
            </div>
            <div className="bg-[#f3e6ff] rounded-2xl shadow p-4 flex items-center gap-4">
              <Image src="/liabilities.svg" alt="Liabilities" width={48} height={48} />
              <div>
                <div className="font-heading font-bold text-base text-black">Liabilities</div>
                <div className="font-heading font-extrabold text-2xl text-[#ff5a7b]">- $470,000</div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex flex-col gap-4 w-full mt-2">
            <button className="bg-[#00c896] hover:bg-[#00b386] text-white font-heading font-bold text-xl rounded-2xl py-3 w-full shadow">BUY</button>
            <button className="bg-[#ff5a7b] hover:bg-[#e04c6a] text-white font-heading font-bold text-xl rounded-2xl py-3 w-full shadow">SELL</button>
            <button className="bg-white hover:bg-[#f3e6ff] text-[#7c3aed] font-heading font-bold text-xl rounded-2xl py-3 w-full shadow border border-[#e6cafd]">TRADE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import { useAuth } from "@/app/context/AuthContext";
import ProfileHeader from '@/components/ProfileHeader'

export default function GoalsTab() {
  const { user } = useAuth();
  return (
    <div className='w-full h-screen flex flex-col gap-5 scrollbar-hide pt-[3em] xl:pt-0'>
      <ProfileHeader username={user?.name} />
    </div>
  )
}
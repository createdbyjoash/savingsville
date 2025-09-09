
import React from 'react'
import Input from '@/components/Input'
import Image from 'next/image'
import AccentButton from '@/components/AccentButton'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CreateAccountPage(
  { 
    handleFormStep, 
    name, 
    email, 
    password, 
    setName, 
    setEmail, 
    setPassword,
    isNewUser,
    setIsNewUser,
    handleClose = () => {} // fallback to no-op if not provided
   }){

    const { login } = useAuth();
    const router = useRouter();

   const signupMutation = useMutation({
    mutationFn: () => {
      if (!name || !email || !password) {
        alert("Please fill in all required fields.");
        return Promise.reject(new Error("Missing fields")); // reject so mutation handles it
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return Promise.reject(new Error("Invalid email format"));
      }
  
      // ✅ return the Axios call
      return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
    },
    onSuccess: (res) => {
      console.log("Mutation succeeded, raw response:", res);
  
      // If your API wraps data, log deeper
      if (res?.data) {
        console.log("API returned:", res.data);
        handleFormStep("step2");
  
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


 const loginMutation = useMutation({
  mutationFn: () => {
    if (!email && !password) {
      alert("Please fill in all required fields.");
      return Promise.reject(new Error("Missing fields")); // reject so mutation handles it
    }

    // ✅ return the Axios call
    return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
      email,
      password,
    });
  },
  onSuccess: (res) => {
    console.log("Mutation succeeded login successful, raw response:", res);

    // If your API wraps data, log deeper
    if (res?.data) {
      console.log("LOGIN API returned:", res.data);

     
      const { token, user } = res.data.data;
      console.log("token: ", token);
      console.log("user: ", user);
      login(user, token);
      router.push("/dashboard")
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
      <div className="fixed bg-gray-600 top-0 bottom-0 left-0 right- w-full h-full opacity-50 z-[1050]">
      </div>
      <div className="grid place-items-center z-[1100] fixed left-auto right-auto top-0 bottom-0 w-full h-full">
        <div className="w-[90%] md:w-[60em] h-[35em] max-sm:h-fit bg-white max-sm:rounded-[1em]  rounded-[2.9em] shadow-xl md:grid grid-cols-2 flex flex-col relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 z-[1200]"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative">
            <Image
              src="/signup-image.png"
              alt="Login"
              layout="fill"
              unoptimized
            />
          </div>
          <div className="py-[3.5em] h-fit my-auto max-sm:py-[1.8em] max-sm:px-4 px-10">
            <h2 className="text-2xl mb-8 font-baloo font-bold text-secondary max-sm:text-center">{isNewUser ? "Create an account" : "Login" }</h2>
            <form className="space-y-3 max-sm:w-full w-[80vw] md:w-[22em]" onSubmit={(e) => {
          e.preventDefault();
          isNewUser ? signupMutation.mutate() : loginMutation.mutate()
        }}>
              {isNewUser && (<Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />)}
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required type="email" />
              <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required type="password" />
              <AccentButton disabled={signupMutation.isPending || loginMutation.isPending} loading={signupMutation.isPending || loginMutation.isPending} type="submit" label="Verify" className="w-full mt-5"/>
              <p className='font-baloo text-[0.96em] mt-4 w-fit mx-auto'>{isNewUser ? "Already have an account?" : "Don't have an account?"} <button onClick={() => setIsNewUser(!isNewUser)} type='button' className='font-bold text-secondary'>{isNewUser ? "Login" : "Create one"}</button></p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

import React from 'react'
import Input from '@/components/Input'
import Image from 'next/image'
import AccentButton from '@/components/AccentButton'

export default function CreateAccountPage({ handleFormStep }){
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleNext(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Registration failed.");
        return;
      }
      // Registration successful, proceed to next step
      handleFormStep("step2");
    } catch (err) {
      alert("Network error. Please try again.");
    }
  }
  return (
    <>
      <div className="fixed bg-gray-600 top-0 bottom-0 left-0 right- w-full h-full opacity-50 z-[1050]">
      </div>
      <div className="grid place-items-center z-[1100] fixed left-auto right-auto top-0 bottom-0 w-full h-full">
        <div className="w-[90%] md:w-[60em] h-[35em] max-sm:h-fit bg-white max-sm:rounded-[1em]  rounded-[2.9em] shadow-xl md:grid grid-cols-2 flex flex-col">
          <div className="relative">
            <Image
              src="/signup-image.png"
              alt="Login"
              layout="fill"
              unoptimized
            />
          </div>
          <div className="py-[3.5em] max-sm:py-[1.8em] max-sm:px-4 px-10">
            <h2 className="text-2xl mb-8 font-baloo font-bold text-secondary max-sm:text-center">Create an account</h2>
            <form className="space-y-3 max-sm:w-full w-[80vw] md:w-[22em]" onSubmit={handleNext}>
              <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required type="email" />
              <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required type="password" />
              <AccentButton type="submit" label="Verify" className="w-full mt-5"/>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

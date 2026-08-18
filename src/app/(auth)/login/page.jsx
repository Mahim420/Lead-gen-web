"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Login result:", result);

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed: " + (result?.error || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E293B] flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-10">
        <Image
          src="/assets/login.png" // শুধু এই path পরিবর্তন করবে
          alt="AI Lead Generation Illustration"
          width={700}
          height={700}
          priority
          className="w-full max-w-2xl h-auto object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center w-full lg:w-[450px] p-6 lg:p-10">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/assets/logo.png" // শুধু এই path পরিবর্তন করবে
              alt="Company Logo"
              width={64}
              height={64}
              priority
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered w-full bg-white/10 text-white placeholder:text-gray-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full bg-white/10 text-white placeholder:text-gray-400"
            />

            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember Me
              </label>

              <a href="#" className="hover:text-cyan-400 transition">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-blue-600 to-cyan-500 border-0 text-white"
            >
              Sign In
            </button>

            <div className="divider text-gray-400">or</div>

            <button
              type="button"
              className="btn w-full bg-white text-gray-800 hover:bg-gray-100"
            >
              <Image
                src="/assets/google-icon.svg" // শুধু এই path পরিবর্তন করবে
                alt="Google"
                width={20}
                height={20}
              />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

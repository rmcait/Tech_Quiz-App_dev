"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../components/navigation/Header";
import { CompanyCodeLogin } from "../components/auth/CompanyCodeLogin";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CompanyCodeLogin />
    </div>
  );
}
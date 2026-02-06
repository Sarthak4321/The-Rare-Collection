"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl text-center space-y-8">
        <h1 className="text-4xl font-serif italic uppercase tracking-tighter">PARTNERS <span className="text-rose-500">.</span></h1>
        <p className="text-white/40 font-light">This section is currently under curation. Architectural details will be revealed soon.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-rose-500 uppercase tracking-widest text-[10px] font-black">
          <ArrowLeft size={12} /> Back to Archive
        </Link>
      </motion.div>
    </main>
  );
}
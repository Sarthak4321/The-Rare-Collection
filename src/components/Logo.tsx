"use client";

import React from "react";
import Image from "next/image";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <div className={`relative ${className} flex items-center justify-center`}>
            <Image
                src="/brand logo -EvntMet.png"
                alt="The Rare Collection"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}

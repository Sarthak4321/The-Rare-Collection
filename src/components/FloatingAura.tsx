"use client";

import { motion } from "framer-motion";

export default function FloatingAura({ vibeColor }: { vibeColor: string }) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ backgroundColor: vibeColor }}
                className="absolute top-1/4 left-1/4 w-[50%] h-[50%] rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ backgroundColor: vibeColor }}
                className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] rounded-full blur-[100px]"
            />
        </div>
    );
}

"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOTAL_FRAMES = 5;

// Create an array of frame paths
const frameImages = Array.from({ length: TOTAL_FRAMES }, (_, i) => `/anjaneyasana/frame${i + 1}.png`);

export default function HeroAnjaneyasana() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentFrame, setCurrentFrame] = useState(0);

    // Preload images to avoid flickering
    useEffect(() => {
        frameImages.forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });
    }, []);

    useGSAP(() => {
        // Determine how far the user needs to scroll to complete the animation
        // e.g., +=200% means the user has to scroll twice the height of the viewport to complete the sequence
        const scrollDistance = "+=300%";

        // We use a dummy object to animate a value from 0 to TOTAL_FRAMES - 1
        const frameObj = { frame: 0 };

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: scrollDistance,
            pin: true,           // Pin the section while scrolling
            scrub: 1,            // Smooth scrubbing, 1 second delay to catch up
            animation: gsap.to(frameObj, {
                frame: TOTAL_FRAMES - 1,
                snap: "frame",     // Snap to integer values
                ease: "none",      // Keep it linear as the user scrolls
                onUpdate: () => {
                    // Math.round ensures we get the nearest frame integer safely
                    setCurrentFrame(Math.round(frameObj.frame));
                }
            })
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">
            {/* Absolute positioning of all frames. Only the current frame is visible. */}
            {frameImages.map((src, index) => (
                <div
                    key={src}
                    className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-300"
                    style={{ opacity: index === currentFrame ? 1 : 0, zIndex: index === currentFrame ? 10 : 0 }}
                >
                    <Image
                        src={src}
                        alt={`Anjaneyasana Pose Frame ${index + 1}`}
                        fill
                        className="object-contain" // Keep aspect ratio without cropping, ensures clean view
                        priority={index === 0}    // Load the first frame immediately
                    />
                </div>
            ))}

            {/* Optional: Add some hero text that fades out or stays pinned */}
            <div className="absolute top-1/4 left-10 md:left-24 z-20 pointer-events-none">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 tracking-tighter mb-4">
                    Deepen Your <br /> Practice
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-sm">
                    Scroll down to see the Anjaneyasana progression.
                </p>
            </div>
        </div>
    );
}

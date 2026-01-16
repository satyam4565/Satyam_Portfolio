import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const frameCount = 120;
const images = [];

const ScrollyCanvas = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Track scroll progress within the 500vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress (0 to 1) to frame index (0 to 29)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            // New PNG sequence: /Sequences/ezgif-frame-XXX.png (1-based, 3-digits)
            img.src = `/Sequences/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImagesLoaded(true);
                }
            };
            images[i] = img;
        }
    }, []);

    // Render frame on scroll
    useMotionValueEvent(frameIndex, "change", (latest) => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesLoaded) return;

        const ctx = canvas.getContext('2d');
        const index = Math.round(latest);
        const img = images[index];

        if (img) {
            // Calculate aspect ratio to cover
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                drawHeight = canvas.height;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            // Clear and draw
            // ctx.clearRect(0, 0, canvas.width, canvas.height); // Optional if drawing covers all
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redraw current frame on resize
                const index = Math.round(frameIndex.get());
                const img = images[index];
                if (img && imagesLoaded) {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    // (Copy resize logic here or make a shared draw function)
                    const canvasRatio = canvas.width / canvas.height;
                    const imgRatio = img.width / img.height;
                    let drawWidth, drawHeight, offsetX, offsetY;
                    if (canvasRatio > imgRatio) {
                        drawWidth = canvas.width;
                        drawHeight = canvas.width / imgRatio;
                        offsetX = 0;
                        offsetY = (canvas.height - drawHeight) / 2;
                    } else {
                        drawWidth = canvas.height * imgRatio;
                        drawHeight = canvas.height;
                        offsetX = (canvas.width - drawWidth) / 2;
                        offsetY = 0;
                    }
                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [imagesLoaded, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-[#0b0e14]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default ScrollyCanvas;

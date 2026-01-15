import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const frameCount = 90;
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

    // Map scroll progress (0 to 1) to frame index (0 to 89)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            // Construct filename matching the pattern: sequence/frame_00_delay-0.067s.webp
            // Note: The delay suffix might vary slightly per frame as seen in the file list, 
            // but usually the main sequence number is what matters. 
            // However, the user provided a specific list with varying delay filenames.
            // Since we can't easily guess the exact filename for every frame without a map, 
            // and the user said "Files are named like: frame_00_delay-0.067s.webp", 
            // BUT looking at the file list, the delay part CHANGES (e.g. 0.066s, 0.067s).
            // WE NEED TO BE CAREFUL.
            // Strategy: The user said "Files are named like...". 
            // Let's assume the user renamed them or we need to find a way to load them.
            // Actually, looking at the file list step 5, the filenames ARE consistent in prefix 'frame_XX_delay-'.
            // I should probably map them dynamically if possible, or just try to standardise.
            // Wait, I can't read the directory in the browser. 
            // I will assume for now that I can index them if they were renamed, 
            // BUT they are not renamed in the file system.
            // I must map the exact filenames or rename them. 
            // Since I cannot rename efficiently in the browser logic without a backend, 
            // I might need to generate a list of filenames or rename them in the dev environment.
            // 
            // BETTER APPROACH: Rename the files in the directory to frame_00.webp, frame_01.webp etc.
            // This ensures robust loading.
            // I will do this rename step as part of the implementation before this code runs.
            //
            // For now, I will write the code assuming they are named 'frame_00.webp', etc.
            
            img.src = `/sequence/frame_${i.toString().padStart(2, '0')}.webp`;
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

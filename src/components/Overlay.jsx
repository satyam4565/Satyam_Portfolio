import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Overlay = () => {
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"]
    });

    // Section 1: Intro (0% - 20%)
    const opacity1 = useTransform(scrollYProgress, [0.05, 0.15, 0.20], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const blur1 = useTransform(scrollYProgress, [0.15, 0.2], [0, 10]);

    // Section 2: "I build immersive..." (25% - 45%)
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.45], [50, -50]);
    const blur2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [10, 0, 0, 10]);

    // Section 3: "Where design meets..." (50% - 70%)
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.60, 0.65], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.7], [50, -50]);
    const blur3 = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [10, 0, 0, 10]);

    //Section 4
    const opacity4 = useTransform(scrollYProgress, [0.68, 0.70, 0.85, 0.90], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.68, 0.90], [50, -50]);
    const blur4 = useTransform(scrollYProgress, [0.68, 0.70, 0.85, 0.90], [10, 0, 0, 10]);

    return (
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 flex flex-col justify-center px-4 md:px-10 mix-blend-different">

            {/* 1. Intro Center */}
            <motion.div
                style={{ opacity: opacity1, y: y1, filter: useTransform(blur1, v => `blur(${v}px)`) }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[12vw] leading-[0.9] font-bold tracking-tighter text-white uppercase mix-blend-overlay"
                    >
                        Satyam Singh
                    </motion.h1>
                </div>
            </motion.div>

            {/* 2. Left Aligned */}
            <motion.div
                style={{ opacity: opacity2, y: y2, filter: useTransform(blur2, v => `blur(${v}px)`) }}
                className="absolute inset-0 flex items-center justify-start md:pl-20 px-8"
            >
                <h2 className="text-4xl md:text-7xl font-bold text-white max-w-4xl leading-[1.1] tracking-tight">
                    I engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">high-performance</span> <br />
                    <span className="text-white/50">web platforms.</span>

                </h2>
            </motion.div>

            {/* 3. Right Aligned */}
            <motion.div
                style={{ opacity: opacity3, y: y3, filter: useTransform(blur3, v => `blur(${v}px)`) }}
                className="absolute inset-0 flex items-center justify-end md:pr-20 px-8"
            >
                <h2 className="text-4xl md:text-7xl font-bold text-right text-white max-w-4xl leading-[1.1] tracking-tight">
                    Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-500">algorithms</span> <br />
                    <span className="text-white/50">drive software.</span>
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: opacity4, y: y4, filter: useTransform(blur4, v => `blur(${v}px)`) }}
                className="absolute inset-0 flex items-center justify-start md:pl-20 px-8"
            >
                <h2 className="text-4xl md:text-7xl font-bold text-white max-w-4xl leading-[1.1] tracking-tight">
                    Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-500">frontend</span> <br />
                    <span className="text-white/50">meets backend.</span>

                </h2>
            </motion.div>

        </div>
    );
};

export default Overlay;

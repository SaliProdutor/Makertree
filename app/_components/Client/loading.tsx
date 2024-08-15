'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import Load1 from '@/public/loadings/load-1.json';
import Load2 from '@/public/loadings/load-2.json';
import Load3 from '@/public/loadings/load-3.json';

interface LoadProps {
    color: 1 | 2 | 3;
}

const Loading = ({ color }: LoadProps) => {
    if (color === 1) {
        return (
            <div className="w-screen h-screen flex flex-1 bg-gray-700 items-center justify-center fixed inset-0 z-50">
                <Lottie animationData={Load1} className="flex justify-center items-center w-10 h-auto" loop={true} />
            </div>
        );
    }
    if (color === 2) {
        return (
            <div className="w-screen h-screen flex flex-1 bg-gray-700 items-center justify-center fixed inset-0 z-50">
                <Lottie animationData={Load2} className="flex justify-center items-center w-10 h-auto" loop={true} />
            </div>
        );
    }
    if (color === 3) {
        return (
            <div className="w-screen h-screen flex flex-1 bg-gray-700 items-center justify-center fixed inset-0 z-50">
                <Lottie animationData={Load3} className="flex justify-center items-center w-10 h-auto" loop={true} />
            </div>
        );
    }
    return null;
};

interface LoadingWrapperProps {
    delay: number; // Delay in seconds
    color: 1 | 2 | 3;
    children: React.ReactNode;
}

const LoadingWrapper = ({ delay, color, children }: LoadingWrapperProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, delay * 1000);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <>
        {loading && (
            <motion.div
                key="loading"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-1'
            >
                <Loading color={color} />
            </motion.div>
        )}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.5 }} 
                className='relative'
            >
                {children}
            </motion.div>
        </>
        
    );
};

export default LoadingWrapper;

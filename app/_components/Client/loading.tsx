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
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700">
            <Lottie animationData={color === 1 ? Load1 : color === 2 ? Load2 : Load3} className="w-10 h-auto" loop={true} />
        </div>
    );
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

    useEffect(() => {
        if (!loading) {
            window.scrollTo(0, 0);
        }
    }, [loading]);

    return (
        <>
        {loading && (
            <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <Loading color={color} />
        </motion.div>
        )}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }} 
                className='relative'
            >
                {children}
            </motion.div>
        </>
        
    );
};

export default LoadingWrapper;

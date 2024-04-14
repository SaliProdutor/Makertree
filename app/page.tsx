'use client'
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

const TextAnimation = ({ text }:any) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayText.length < text.length) {
        setDisplayText((prevText) => prevText + text[displayText.length]);
      } else {
        clearInterval(interval);
      }
    }, 100); // Velocidade de digitação (milissegundos)
    return () => clearInterval(interval);
  }, [displayText, text]);

  return (
    <div className=" min-h-32">
    <motion.h3
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className=" text-blue font-bold text-[5rem]"
    >
      {displayText}
    </motion.h3>
    </div>
  );
};

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className=" text-gray-400 font-bold text-[2rem]">
          Bem-Vindo(a)
        </motion.h1>
      <TextAnimation text="Makertree" />
      <motion.a 
      initial={{ opacity: 0, scale: 0.9}}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: .5 }}
      href="/sali_produtor" className=" uppercase text-purple-dark border border-purple-dark py-2 px-4 rounded-lg mt-10 hover:bg-purple hover:text-gray-100 hover:border-purple duration-500">Acessar Agora</motion.a>
    </main>
  );
}

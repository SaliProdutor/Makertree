'use client'
import { useState } from "react";
import { Categorias } from "./_components/categoria";
import { DB } from "./db";
import Image from "next/image";
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="flex max-w-screen h-full flex-col items-center justify-center">   
      <motion.div 
        initial={{ opacity: 0, scale: 0.95}}
        animate={{ opacity: 1, scale: 1 }}
        transition={{duration: .2 }}
        className=" bg-gray-500 rounded-lg shadow-lg overflow-hidden"
      >

        <header>
          <div className="flex gap-10 items-center bg-gray-600 px-8 py-5 ">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95}}
              animate={{ opacity: 1, scale: 1 }}
              transition={{delay: .5 ,duration: .5 }}
            >
              <Image width={400} height={400} className=" w-[5rem] h-[5rem] rounded-full border-blue border-solid border border-lg p-[.2rem]" src="https://github.com/SaliProdutor.png" alt="Foto"/>
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .80 ,duration: 1 }}
                className=" font-bold text-blue text-2xl"
              >Sali Produtor</motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 ,duration: 1 }}
                className=" text-gray-200"
              >Links</motion.p>
            </div> 
          </div>
        </header>

        <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className=" px-8 py-4 ">
          {DB.map(item => (
            item.data.categories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * .6, duration: 1 }}
              >
                <Categorias key={category.id} categoria={category.id}/>
              </motion.div>
            ))
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}

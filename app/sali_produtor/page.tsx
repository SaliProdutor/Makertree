'use client'
import { Categorias } from "./_components/categoria";
import { DB } from "./db";
import Image from "next/image";
import { motion } from "framer-motion"
import { useState } from "react";
import { Carrossel } from "./_components/carrossel";

export default function Home() {
  const getPhoto:any = DB.map(item => item.data.photo)
  const [photo, setPhoto] = useState(`${getPhoto}`)

  return (
    <main className="flex max-w-screen z-99 flex-col items-center lg:mt-20 mb-20 mt-0"> 

      <div>
        <motion.div 
          initial={{ opacity: 0, y: 10}}
          animate={{ opacity: 1, y: 0 }}
          transition={{delay: .5 ,duration: .5 }}
          className=" bg-gray-500 lg:min-w-[30rem] lg:max-w-[30rem] min-w-[23rem] max-w-[23rem] rounded-lg shadow-lg overflow-hidden"
        >

          <header>
            <div className="flex gap-10 items-center bg-gray-600 px-8 py-5 ">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95}}
                animate={{ opacity: 1, scale: 1 }}
                transition={{delay: .5 ,duration: .5 }}
              >

                <Image width={400} height={400} className=" w-[5rem] h-[5rem] rounded-full border-blue border-solid border border-lg p-[.2rem]" src={photo} alt="Foto"/>
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .80 ,duration: 1 }}
                  className=" font-bold text-blue text-2xl"
                >{DB.map(item => item.data.name)}</motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 ,duration: 1 }}
                  className=" text-gray-200"
                >{DB.map(item => item.data.description)}</motion.p>
              </div> 
            </div>
          </header>

          <div className="px-8 py-4 flex-1">

            {DB.map(item => (
              item.data.categories.map((category, index) => (
                <div key={category.id}>
                  <Categorias key={category.id} categoria={category.id}/>
                  <Carrossel key={category.id} categoria={category.id}/>
                </div>
              ))
            ))}

          </div>
        </motion.div>
      </div> 
    </main>
  );
}

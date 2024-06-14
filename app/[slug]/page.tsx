'use client'
import { useEffect, useState } from "react"
import { Categorias } from "@/app/_components/categoria";
import { DBpages } from "../DB/pages";
import { DBusers } from "../DB/users";
import Image from "next/image";
import { motion } from "framer-motion"
import { Carrossel } from "@/app/_components/carrossel";

interface ThemeColor {
    id: number;
    primary: string;
}

interface PropsTheme {
    colors: ThemeColor[];
}

interface Category {
    id: number;
    name: string;
    layout: boolean;
}

interface Link {
    id: number;
    type: string;
    categoryId: number;
    photo: string;
    name: string;
    path: string;
}

interface PropsLink {
    id_user: number;
    theme: PropsTheme;
    categories: Category[];
    links: Link[] | undefined;
}

interface PageProps {
    params: { slug: string };
}



export default function LinkPage({ params }: PageProps){

    const user = DBusers.find(user => user.slug === params.slug);

    const id = user?.id

    const links = DBpages.find(user_id => user_id.id_user === id);

    const getPhoto:any = user?.photo
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
                    
                      <Image width={70} height={70} className=" w-[5rem] h-[5rem] object-cover bg-cover rounded-full border-blue border-solid border border-lg p-[.2rem]" src={photo} alt="Foto"/>
                    </motion.div>
                    <div>
                      <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .80 ,duration: 1 }}
                        className=" font-bold text-blue text-2xl"
                      >{user?.name}</motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 ,duration: 1 }}
                        className=" text-gray-200"
                      >{user?.description}</motion.p>
                    </div> 
                  </div>
                </header>

                <div className="px-8 py-4 flex-1">

                {
                    links?.categories.map((category, index) => (
                      <div key={category.id}>
                        <Categorias key={category.id} categoria={{id:category.id, name:category.name, layout:category.layout}} userId={id}/>

                        <Carrossel key={category.id} categoria={{id:category.id, name:category.name, layout:category.layout}} userId={id}/>

                      </div>
                    ))
                }

                </div>
              </motion.div>
            </div> 
        </main>  
    )
}
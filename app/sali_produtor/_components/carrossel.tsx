'use client'
import React, { useState } from 'react';
import { DB } from "../db";
import { motion } from "framer-motion"
import Image from 'next/image';
import Link from 'next/link';

interface CarrosselProps {
    categoria: string;
}

export function Carrossel({ categoria }: CarrosselProps) {
    const category = DB[0].data.categories.find(cat => cat.id === categoria);

    // Filtrar os links com base na categoria fornecida
    const filteredLinks = DB[0].data.links.filter(link => link.categoryId === categoria);

    return (
        <>
        {category?.name === "Meus Equipamentos" ? 
        <div className='flex flex-col max-w-[20rem] lg:max-w-[25rem]'>
            {category && 
            <h1
                className="text-gray-100 font-bold mb-4 mt-6 text-center"
            >{category.name}</h1>}
            <div className='flex'>
                <ul className='flex overflow-x-scroll gap-4 w-[25rem]'>
                
                    {filteredLinks.map((link, index) => (

                        <a href={link.path} className='flex' target="_blank" rel="noopener noreferrer">
                            <motion.li 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * .2,duration: .2 }}
                                className='flex flex-col justify-start gap-4 items-center mb-4 bg-purple-dark hover:bg-purple duration-1000 hover:shadow-2xl pb-2 shadow-blue rounded-lg' 
                                key={index}
                            >
                                
                                    <Image width={400} height={400} className=" max-w-[10rem] max-h-[10rem] rounded-lg border-blue border-solid border border-lg p-[.2rem]" src={link.photo} alt="Foto"/>
                                    <a className=' text-gray-100 text-center p-2'>{link.name}</a>
                                
                            </motion.li>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
         : 
         <></>}
        
        </>
    );
}

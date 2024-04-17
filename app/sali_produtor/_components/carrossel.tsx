'use client'
import React, { useEffect, useState } from 'react';
import { DB } from "../db";
import { motion } from "framer-motion"
import Image from 'next/image';
import { TbLayoutDistributeHorizontal, TbLayoutDistributeVertical } from "react-icons/tb";

interface CarrosselProps {
    categoria: string;
}

export function Carrossel({ categoria }: CarrosselProps) {
    const category = DB[0].data.categories.find(cat => cat.id === categoria);

    // Filtrar os links com base na categoria fornecida
    const filteredLinks = DB[0].data.links.filter(link => link.categoryId === categoria);

    const [Layout, setLayout] = useState(false)

    const active = " text-gray-200 text-2xl"
    const inativo = " text-gray-600 text-2xl"

    function handleAlternaVertical(){
        if(Layout !== false){
            setLayout(false)
        }
    }
    function handleAlternaHorizontal(){
        if(Layout !== true){
            setLayout(true)
        }
    }

    return (
        <>
        {category?.name === "Meus Equipamentos" ?
        <div className='flex flex-col w-full'>
            {category && 
            <div className=' flex justify-between items-center'>
                <h1
                    className="text-gray-100 font-bold mb-4 mt-6 text-center"
                >{category.name}</h1>
                <div className=' flex gap-2'>
                    <TbLayoutDistributeVertical className={Layout === false ? active : inativo} onClick={handleAlternaVertical}/>
                    <TbLayoutDistributeHorizontal className={Layout === true ? active : inativo} onClick={handleAlternaHorizontal}/>
                </div>
            </div>
            }
            <div className='flex'>
                {Layout === false ? 
                <ul className='flex overflow-x-scroll gap-4'>
                    {filteredLinks.map((link, index) => (
                        <a href={link.path} className='flex' target="_blank" rel="noopener noreferrer">
                            <motion.li 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * - 1,duration: .2 }}
                                className='flex flex-col justify-start gap-4 items-center mb-4 bg-purple-dark lg:hover:bg-purple duration-1000 lg:hover:shadow-2xl pb-2 shadow-blue rounded-lg' 
                                key={index}
                            >
                                
                                    <Image width={400} height={400} className=" max-w-[10rem] max-h-[10rem] min-h-[10rem] rounded-lg border-blue border-solid border border-lg p-[.2rem]" src={link.photo} alt="Foto"/>
                                    <a className=' text-gray-100 text-center p-2'>{link.name}</a>
                                
                            </motion.li>
                        </a>
                    ))}
                </ul>
                :
                <ul className='w-full'>
                    {filteredLinks.map((link, index) => (
                        <motion.li 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * - 1,duration: .2 }}
                            className='flex justify-center items-center mb-4 bg-purple-dark lg:hover:bg-purple duration-1000 lg:hover:shadow-2xl shadow-blue py-4 px-8 rounded-lg' 
                            key={index}
                        >
                            <a href={link.path} className=' text-gray-100 text-center' target="_blank" rel="noopener noreferrer">{link.name}</a>
                        </motion.li>
                    ))}
                </ul>
                }
            </div>
        </div>
         : 
         <></>}
        
        </>
    );
}

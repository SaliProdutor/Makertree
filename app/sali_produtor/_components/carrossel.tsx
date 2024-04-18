'use client'
import React, { useEffect, useState } from 'react';
import { DB } from "../db";
import { motion } from "framer-motion"
import Image from 'next/image';
import { TbLayoutDistributeHorizontal, TbLayoutDistributeVertical } from "react-icons/tb";
import { IoGridOutline } from 'react-icons/io5';
import Link from 'next/link';

interface CarrosselProps {
    categoria: string;
}

export function Carrossel({ categoria }: CarrosselProps) {
    const category = DB[0].data.categories.find(cat => cat.id === categoria);

    // Filtrar os links com base na categoria fornecida
    const filteredLinks = DB[0].data.links.filter(link => link.categoryId === categoria);

    const [Layout, setLayout] = useState("Scroll")

    const active = " text-purple text-2xl"
    const inativo = " text-gray-300 text-2xl"

    function handleAlternaList(){
        if(Layout !== "List"){
            setLayout("List")
        }
    }
    function handleAlternaScroll(){
        if(Layout !== "Scroll"){
            setLayout("Scroll")
        }
    }

    function handleAlternaGrid(){
        if(Layout !== "Grid"){
            setLayout("Grid")
        }
    }

    return (
        <>
        {category?.name === "Meus Equipamentos" ?

        <div className='flex flex-col'>

            {category && 
                <header className='flex justify-between items-center'>
                    <h1
                        className="text-gray-100 font-bold mb-4 mt-6 text-center"
                    >{category.name}</h1>
                    <div className=' flex gap-2'>
                        <TbLayoutDistributeVertical className={Layout === "Scroll" ? active : inativo} onClick={handleAlternaScroll}/>
                        <TbLayoutDistributeHorizontal className={Layout === "List" ? active : inativo} onClick={handleAlternaList}/>
                        <IoGridOutline className={Layout === "Grid" ? active : inativo} onClick={handleAlternaGrid}/>
                    </div>
                </header>
            }

            <div className='flex w-full'>

                { /* Se o layout for Scroll */ }

                {Layout === "Scroll" ? 
                    <ul className='flex overflow-x-scroll pb-2 w-full gap-4'>
                        {filteredLinks.map((link, index) => (
                            
                            <li className='flex min-w-40' key={index}>
                                
                                <Link href={link.path} className='flex-1' target="_blank" rel="noopener noreferrer">
                                    <div className='flex flex-col h-full gap-2 items-center justify-start  bg-purple-dark duration-1000 rounded-lg lg:hover:bg-purple lg:hover:shadow-2xl'>
                                        <div className='max-w-[20rem] max-h-[20rem] '>
                                            <Image width={150} height={150} className="w-full aspect-square bg-cover rounded-lg border-blue border-solid border border-lg p-[.2rem]" src={link.photo} alt="Foto"/>
                                        </div>
                                        <p className=' text-gray-100 text-center p-2'>{link.name}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>:<></>
                }

                { /* Se o layout for List */ }
                
                {Layout === "List" ? 
                    <ul className='w-full grid grid-cols-1 gap-4'>
                    {filteredLinks.map((link, index) => (
                        <li className='flex flex-1 min-h-[5rem]' key={index}>
                            <Link href={link.path} className='flex-1' target="_blank" rel="noopener noreferrer">
                                <div className='flex flex-row h-full gap-2 items-center justify-start  bg-purple-dark duration-1000 rounded-lg lg:hover:bg-purple lg:hover:shadow-2xl'>
                                    <div className='max-w-[5rem] max-h-[5rem] '>
                                        <Image width={150} height={150} className="w-full aspect-square bg-cover rounded-lg border-blue border-solid border border-lg p-[.2rem]" src={link.photo} alt="Foto"/>
                                    </div>
                                    <p className='text-gray-100 pr-2'>{link.name}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>:<></>
                }

                { /* Se o layout for Grid */ }
                
                {Layout === "Grid" ? 
                    <ul className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {filteredLinks.map((link, index) => (  

                            <li className='flex gap-4' key={index}>
                                <Link href={link.path} className='flex-1' target="_blank" rel="noopener noreferrer">
                                    <div className='flex h-full justify-start flex-col  bg-purple-dark duration-1000 rounded-lg lg:hover:bg-purple lg:hover:shadow-2xl'>
                                        <div className='max-w-[20rem] max-h-[20rem] '>
                                            <Image width={150} height={150} className="w-full aspect-square bg-cover rounded-lg border-blue border-solid border border-lg p-[.2rem]" src={link.photo} alt="Foto"/>
                                        </div>
                                        
                                        <p className=' text-gray-100 text-center p-2'>{link.name}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>:<></>
                }
            </div>
        </div>
         : 
         <></>}
        
        </>
    );
}

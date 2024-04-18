import React from 'react';
import { DB } from "../db";
import { motion } from "framer-motion"

interface CategoriasProps {
    categoria: string;
}

export function Categorias({ categoria }: CategoriasProps) {
    // Encontrar o objeto de categoria correspondente à categoria fornecida
    const category = DB[0].data.categories.find(cat => cat.id === categoria);
    
    // Filtrar os links com base na categoria fornecida
    const filteredLinks = DB[0].data.links.filter(link => link.categoryId === categoria);

    return (
        <>
        {category?.name !== "Meus Equipamentos" ?
            <div className='w-full'>
                {category && 
                <h1
                    className="text-gray-100 font-bold mb-4 mt-6 text-center"
                >{category.name}</h1>}
                <ul>
                    {filteredLinks.map((link, index) => (
                        <li
                            className='flex flex-1 justify-center items-center mb-4 bg-purple-dark lg:hover:bg-purple duration-1000 lg:hover:shadow-2xl shadow-blue py-4 px-8 rounded-lg' 
                            key={index}
                        >
                            <a href={link.path} target="_blank" rel="noopener noreferrer" className=' text-gray-100 text-center'>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
            :
            <></>
            }
        </>
    );
}

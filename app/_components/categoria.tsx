import React from 'react';
//import { DB } from "../sali_produtor/db";
import { motion } from "framer-motion"
import { DBpages } from '../DB/pages';

interface CategoriasProps {
    id: number;
    name: string;
    layout: boolean
}
interface CarrosselProps {
    categoria: CategoriasProps;
    userId: number | undefined
}

export function Categorias({ categoria, userId }: CarrosselProps) {

    const category = categoria

    // Filtrar os links com base na categoria fornecida
    const links = DBpages.find(user_id => user_id.id_user === userId);
    const filteredLinks = links?.links.filter(link => link.categoryId === categoria.id);

    return (
        <>
        {category?.name !== "Meus Equipamentos" ?
            <div className='w-full'>
                {category && 
                <h1
                    className="text-gray-100 font-bold mb-4 mt-6 text-center"
                >{category.name}</h1>}
                <ul>
                    {filteredLinks?.map((link, index) => (
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

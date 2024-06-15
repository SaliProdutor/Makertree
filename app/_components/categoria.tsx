import React, { useEffect, useState } from 'react';
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
    userId: number | undefined;
    primary?: boolean;
}

export function Categorias({ categoria, userId, primary}: CarrosselProps) {

    const category = categoria

    // Filtrar os links com base na categoria fornecida
    const links = DBpages.find(user_id => user_id.id_user === userId);
    const filteredLinks = links?.links.filter(link => link.categoryId === categoria.id);

    const [themeColor, setPrimaryColor] = useState('')

        useEffect(() => {
            if(primary === true){
                setPrimaryColor(`flex flex-1 justify-center items-center mb-4 bg-[#b98e00] lg:hover:bg-[#fbc92b] duration-1000 lg:hover:shadow-2xl shadow-blue py-4 px-8 rounded-lg`)
            }else{
                setPrimaryColor('flex flex-1 justify-center items-center mb-4 bg-purple-dark lg:hover:bg-purple duration-1000 lg:hover:shadow-2xl shadow-blue py-4 px-8 rounded-lg')
            }
        },[primary])

    return (
        <>
        {category?.name !== "Meus Equipamentos" ?
            <div className='w-full'>
                {category && 
                <h1
                    className="text-gray-100 font-bold mb-4 mt-6 text-center cursor-default"
                >{category.name}</h1>}
                <ul>
                    {filteredLinks?.map((link, index) => (
                        <a href={link.path} target="_blank">
                            <li
                                className={themeColor}
                                key={index}
                            >
                                <a rel="noopener noreferrer" className={primary === true ? 'text-black text-center' : 'text-gray-100 text-center'}>{link.name}</a>
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
            :
            <></>
            }
        </>
    );
}

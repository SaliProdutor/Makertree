import { createClient } from '@/prismicio';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


interface CarrosselProps {
    categoria: string | null;
    userId: string;
    slug_categoria: string;
}

export async function Categorias({ categoria, slug_categoria, userId}: CarrosselProps) {

    const client = createClient();

    const uid = userId
    const category = categoria

    // DADOS LINKS
    async function fetchLinks() {
        try {
            const links = await client.getAllByType('link'); 
            const link = links.filter(item => item.data.slug_client === uid)
            const linkCategoria = link.filter(item => item.data.slug_categoria === slug_categoria)
            return linkCategoria;
        } catch (error) {
            console.error('Erro ao buscar links:', error);
            return [];
        }
    }

    const links = await fetchLinks();

    return (

        <div className='w-full h-auto px-4'>
            
            {links && links.length > 0 && category && ( 
                <h1 className="CategoryTitleColor font-bold mb-4 mt-6 text-center cursor-default">{category}</h1>
            )}
            {links &&

                <div>
                    {links.map((link, index) => (
                        <a 
                        key={link.id} 
                        href={link.data.url_link || ''} 
                        target="_blank" 
                        className="
                            flex 
                            font-bold
                            Texto 
                            flex-1 
                            justify-center 
                            items-center 
                            my-4  
                            ButtonTheme 
                            duration-1000 
                            lg:hover:shadow-2xl 
                            shadow-blue 
                            py-4 px-8 
                            BorderRadius"
                        >
                            {link.data.label}
                        </a>
                    ))}
                </div>
            }
        </div>
    );
}

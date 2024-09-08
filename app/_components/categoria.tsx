import { createClient } from '@/prismicio';
import { CSSProperties } from 'react';

interface CarrosselProps {
    categoria: string | null;
    userId: string;
    slug_categoria: string;
}

export async function Categorias({ categoria, slug_categoria, userId }: CarrosselProps) {
    const client = createClient();

    // DADOS LINKS
    async function fetchLinks() {
        try {
            const links = await client.getAllByType('link'); 
            const link = links.filter(item => item.data.slug_client === userId);
            const linkCategoria = link.filter(item => item.data.slug_categoria === slug_categoria);
            return linkCategoria;
        } catch (error) {
            console.error('Erro ao buscar links:', error);
            return [];
        }
    }

    const links = await fetchLinks();

    // Mapeia os links e extrai os dados que você precisa
    const mappedLinks = links.map((link) => {
        // DADOS LINKS
        const BgColor = link.data.background_color || 'transparent';
        const BgColorHover = link.data.background_color_hover || 'transparent';
        const LabelColor = link.data.label_color || 'black';
        const LabelColorHover = link.data.label_color_hover || 'gray';
        const BorderRadius = link.data.border_radius || 0;
        const Order = link.data.order || 0;

        // Define o estilo customizado
        const customStyle: CSSProperties = {
            backgroundColor: BgColor,
            color: LabelColor,
            borderRadius: `${BorderRadius}rem`,
            padding: '1rem 2rem',
            margin: '1rem 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'background-color 0.3s, box-shadow 0.3s',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
        };

        // Define a classe padrão
        const defaultClassName = 'flex font-bold flex-1 justify-center items-center my-4 ButtonTheme duration-1000 lg:hover:shadow-2xl shadow-blue py-4 px-8 rounded-lg';

        // Retorna um objeto contendo os dados mapeados
        return {
            BgColor,
            BgColorHover,
            LabelColor,
            LabelColorHover,
            BorderRadius,
            Order,
            url: link.data.url_link,
            label: link.data.label,
            id: link.id,
            customStyle,
            defaultClassName
        };
    });

    // Se precisar ordenar pelos dados `Order`
    const orderedLinks = mappedLinks.sort((a: any, b: any) => a.Order - b.Order);

    return (
        <div className='w-full h-auto px-4'>
            {links.length > 0 && categoria && (
                <h1 className="CategoryTitleColor font-bold mb-4 mt-6 text-center cursor-default">{categoria}</h1>
            )}
            <div>
                {orderedLinks.map((link) => (
                    <a 
                        key={link.id} 
                        href={link.url || ''} 
                        target="_blank"
                        className={link.BgColor === 'transparent' ? link.defaultClassName : ''}
                        style={link.BgColor !== 'transparent' ? link.customStyle : {}}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
}

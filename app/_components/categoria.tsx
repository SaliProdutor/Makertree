import { createClient } from '@/prismicio';

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

    const padrao = "flex font-bold Texto flex-1 justify-center items-center my-4 ButtonTheme duration-1000 lg:hover:shadow-2xl shadow-blue py-4 px-8 rounded-lg";

    return (
        <div className='w-full h-auto px-4'>
            {links && links.length > 0 && categoria && (
                <h1 className="CategoryTitleColor font-bold mb-4 mt-6 text-center cursor-default">{categoria}</h1>
            )}
            <div>
                {links.map((link) => {

                    // Background Color
                    const BgColor = (link.data.background_color)

                    // Background Color Hover
                    const BgColorHover = (link.data.background_color_hover)
                    
                    // Text Color
                    const LabelColor = (link.data.label_color)
                    
                    // Text Color Hover
                    const LabelColorHover = (link.data.label_color_hover)
                    
                    // Border Radius
                    const BorderRadius = link.data.border_radius;

                    const custom = `flex font-bold flex-1 justify-center items-center my-4 bg-[${BgColorHover !== null && BgColorHover.replace(/^"|"$/g, '')}] duration-1000 lg:hover:shadow-2xl shadow-blue py-4 px-8 rounded-[${BorderRadius}rem]`

                    return (
                        <a 
                            key={link.id} 
                            href={link.data.url_link || ''} 
                            target="_blank"
                            className={BgColor ? custom : padrao}
                        >
                            {link.data.label}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

'use client'

import { useEffect, useState } from 'react'

interface ThemeClientProps {
    data: any[] // Ajuste o tipo conforme a estrutura esperada dos dados
}

const ThemeClient = ({ data }: ThemeClientProps) => {
    const [configuracoes, setConfiguracoes] = useState<any[]>(data || []);

    // Opcional: Caso você precise carregar dados adicionais no cliente, use useEffect aqui
    useEffect(() => {
        // Simular carregamento de dados ou atualizações se necessário
        // Exemplo:
        // async function fetchData() {
        //     const response = await fetch('/api/your-endpoint');
        //     const result = await response.json();
        //     setConfiguracoes(result);
        // }
        // fetchData();
    }, []);

    return (
        <div>
            {configuracoes.map((item) => 
            
                <div key={item.id}>
                    <style jsx global>{`
                        :global(body) {

                            --title-color: ${item.data.title_color || '#F5F5F5'};
                            --header-color: ${item.data.header_color || '#1A1A1A'};

                            --background-primary: ${item.data.background_color_primary || '#F5F5F5'};

                            --category-title-color: ${item.data.category_title_color || '#F5F5F5'};
                            --background-secondary: ${item.data.background_color_secundary || '#1E1E1E'};

                            --button-color: ${item.data.button_color || '#787AED'};
                            --button-label-color: ${item.data.button_label_color || '#F5F5F5'};

                            --button-color-hover: ${item.data.button_color_hover || '#787AED'};
                            --button-label-color-hover: ${item.data.button_label_color_hover || '#F5F5F5'};

                            --border-color: ${item.data.border_color || '#787AED'};
                            --border-radius: ${item.data.border_radius ? `${item.data.border_radius}rem` : '0.5rem'};
                        }
                    `}</style>
                </div>
            )}
        </div>
    )
}

export default ThemeClient

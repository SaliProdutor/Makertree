import { createClient } from "@/prismicio";
import HeaderClient from "@/app/_components/Server/header";
import { Footer } from "@/app/_components/footer";
import Theme from "@/app/_components/Server/themeServer";
import * as prismic from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import LoadingWrapper from "@/app/_components/Client/loading";
import { Categorias } from "@/app/_components/categoria";

interface PageProps {
    params: { slug: string };
}

interface CategoriaData {
  id: string;
  data: {
      Categoria: string;
      cliente: {
          id: string;
      };
  };
}

export default async function LinkPage({ params }: PageProps){

    const client = createClient();

    // DADOS CLIENTE
    const uid = params.slug;
    const cliente = await client.getAllByType('cliente');
    const data = cliente.filter(item => item.uid === uid);
    
    // VERIFICA MARKETING
    const marketing: any = data.length > 0 ? data[0].data.marketing : null;

    // DADOS CATEGORIAS
    async function fetchCategorias() {
        try {
            const categorias = await client.getAllByType('categoria');
            const categoria = categorias.filter(item => item.data.slug_cliente === uid)
            return categoria;
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            return [];
        }
    }

    const categorias = await fetchCategorias();

    // DADOS CONFIG
    const config = await client.getAllByType('configuracoes');
    const configuracoes = config.filter(item => item.uid === uid)
    const header = configuracoes.map(item => item.data.visible_header);
    console.log(header)

    return (
        <main className="BackgroundPrimary min-w-screen min-h-screen mt-20 justify-between flex flex-col items-center">
            <Theme uid={params.slug} />
            <div className="flex-1">
                <LoadingWrapper delay={2} color={2}>
                    <div className="BackgroundSecondary lg:min-w-[30rem] lg:max-w-[30rem] min-w-[23rem] max-w-[23rem] BorderRadius pb-5 shadow-lg overflow-hidden">
                        {data.map((item) => (
                            <HeaderClient 
                                key={item.id} 
                                url={item.data.logo.url || '/icon.png'} 
                                alt={item.data.logo.alt || 'Logo Empresa'} 
                                title={item.data.name || ''} 
                                description={item.data.description || ''}
                                visible={header}
                            />
                        ))}
                        <div>
                            {categorias
                                .sort((a, b) => {
                                    const orderA = a.data.order ?? Infinity; // Considera null como Infinity
                                    const orderB = b.data.order ?? Infinity; // Considera null como Infinity
                                    return orderA - orderB;
                                })
                                .map((category) => (
                                    <Categorias key={category.id} slug_categoria={category.uid} categoria={category.data.name} userId={uid}/>   
                            ))}
                        </div>
                    </div>
                </LoadingWrapper>
            </div>
            {marketing === "true" && <Footer/>}   
        </main>
    )
}

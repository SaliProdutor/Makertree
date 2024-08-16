import { createClient } from "@/prismicio";
import HeaderClient from "@/app/_components/Server/header";
import { Footer } from "@/app/_components/footer";
import Theme from "@/app/_components/Server/themeServer";
import LoadingWrapper from "@/app/_components/Client/loading";
import { Categorias } from "@/app/_components/categoria";
import Link from "next/link";

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
    const marketing:any = data.length > 0 ? data[0].data.marketing : null;

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
    const header = configuracoes.map(item => item.data.header);

    // BILLING
    const billing:any = data.map(item => item.data.billing)
    
    return (
        <main className="BackgroundPrimary min-w-screen min-h-screen justify-between flex flex-col items-center">
            <Theme uid={params.slug} />
            {(billing == 'Ativo' || billing == 'Pendente') && 
            <div className="flex-1 lg:mt-20 lg:mx-0">
                <LoadingWrapper delay={1} color={2}>
                    <div className="BackgroundSecondary w-screen lg:min-w-[30rem] lg:max-w-[30rem] BorderRadiusContent pb-5 lg:shadow-lg overflow-hidden">
                        {billing == 'Pendente' &&
                            <div className="bg-yellow-300 flex justify-center items-center">
                                <p className="!font-bold py-2">Atenção! Seu link ficará inativo em breve.</p>
                            </div>
                        }
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
            }
            {(billing == 'Ativo' || billing == 'Pendente') && marketing === "true" && <Footer/>}

            
            
            {billing == 'Inativo' &&
                <div className="flex flex-col justify-between w-screen h-screen items-center">
                    <div className="flex flex-1 flex-col justify-center items-center gap-4">
                        <h1 className="font-bold text-2xl cursor-default">Usuário Inativo!</h1>
                        <Link href='/' className="w-[15rem] text-[1rem] uppercase text-purple-dark border border-purple-dark py-2 px-4 rounded-lg mt-[.5rem] hover:bg-purple hover:text-gray-100 hover:border-purple duration-500 text-center">Ir para home</Link>
                    </div>
                    <Footer/>
                </div>      
            }
        </main>
    )
}

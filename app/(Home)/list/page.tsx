import Image from "next/image"
import { createClient } from "@/prismicio";

export default async function List(){
    const client = createClient();

    // DADOS CLIENTE
    const clientes = await client.getAllByType('cliente');

    return(
        <main className="flex flex-col flex-1 w-full items-center justify-center">
            <div className="max-w-[1280px] items-center flex flex-col w-full flex-1 lg:px-10 lg:py-20">
                <span className="font-normal text-gray-200 text-2xl text-center pt-20 lg:max-w-[20rem]">Para onde você <h1 className="font-bold text-blue text-3xl text-center pb-20 lg:max-w-[20rem]">deseja ir?</h1></span>
                <div className={clientes.length > 2 ? 'grid lg:grid-cols-3 grid-cols-1 w-full gap-10 justify-center pb-20' : `grid lg:grid-cols-${clientes.length} grid-cols-1 w-full gap-10 justify-center pb-20`}>
                {
                clientes.map((item, index) => (
                    <a target="_blank" key={item.id} href={`/${item.data.slug}`}>
                        <div className="flex flex-1 gap-5 justify-start items-center rounded-lg px-4 py-4 bg-gray-400 lg:hover:bg-purple lg:hover:scale-105 transition-all duration-500">
                            <Image src={item.data.logo.url || '/icon.png'} className="rounded-lg border-[.2rem] border-purple-dark" width={80} height={80} alt={`Imagem logo empresa ${item.data.name}`}/>
                            <div className=" flex max-w-full flex-col gap-2">
                                <h2 className="text-center text-white flex">{item.data.name}</h2>
                                <p className="text-center text-gray-200 flex">{item.data.description}</p>
                            </div>
                        </div>
                    </a>
                ))
                }
                </div>
            </div>
        </main>
    )
}
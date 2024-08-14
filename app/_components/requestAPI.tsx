import { createClient } from "@/prismicio";


export default function RequestAPI(){
    const prismic = createClient()

    const cliente = prismic.getAllByType("cliente")
    console.log(cliente)
    return (<a>Ola</a>)
}
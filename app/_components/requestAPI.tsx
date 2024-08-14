import { createClient } from "@/prismicio";


export default async function RequestAPI(){
    const prismic = createClient()

    const cliente = await prismic.getAllByType("link", 'links')
    console.log(cliente)
    return (<a>{}</a>)
}
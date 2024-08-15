import { createClient } from "@/prismicio";
import ThemeClient from "../Client/themeClient";

interface ThemeProps {
    uid: string
}

export default async function Theme({ uid }: ThemeProps){
    const prismic = createClient();
    const data = await prismic.getAllByType('configuracoes');
    const configuracoes = data.filter(item => item.uid === uid)

    return <ThemeClient data={configuracoes} />
}
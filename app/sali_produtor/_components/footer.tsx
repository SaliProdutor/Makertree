'use client'
import { useState } from "react"

export function Footer(){
    const [ano, setAno] = useState(2023)
    const anoAtual = new Date().getFullYear()
    return(
        <footer className="flex relative buttom-0 items-center justify-center bottom-0 h-[2rem] w-full">
            <span className="text-gray-300 text-sm text-center cursor-default">
                &copy; {anoAtual === ano ? ano : `${ano} - ${anoAtual}`} <a className=" hover:text-purple duration-1000 cursor-pointer" href="https://digitalmakerpro.com" target="_blank">Digital Maker
                Pro</a>. Todos os direitos reservados.
            </span>
        </footer>
    )    
}

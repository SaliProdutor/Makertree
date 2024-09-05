import Image from "next/image"

interface HeaderProps {
    url?: string;
    alt?: string;
    title?: string;
    description?: string;
    visible: any;
}

const HeaderClient = ({ url, alt, title, description, visible }: HeaderProps) => {

    return (
        visible != 'Oculto' &&
        <div>
            <div className={'flex gap-10 items-center HeaderColor px-8 py-5'}>
                <div>
                    <Image 
                        width={70} 
                        height={70} 
                        className={'w-[5rem] h-[5rem] BorderColor object-cover bg-cover rounded-full border-solid border border-lg p-[.2rem]'} 
                        src={url || ''} // ajuste o caminho da imagem conforme necessário
                        alt={alt || 'Foto'}
                        priority={true}
                    />
                </div>
                <div>
                    <h1 className={'font-bold text-2xl cursor-default TextoTitle'}>{title || ''}</h1>
                    <p className="TextoPrimary cursor-default TextoTitle opacity-40">{description || ''}</p>
                </div> 
            </div>
        </div>
    )
}

export default HeaderClient

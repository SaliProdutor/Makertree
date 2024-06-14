import { DBusers } from "../DB/users";

type Props = {
  params: { slug: string };
};

type Metadata = {
  
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const slug = params.slug;
  const user = DBusers.find(user => user.slug === slug);
  const name = user?.name
  const detail = user?.description

  return {
    title: name,
    description: detail,
  };
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

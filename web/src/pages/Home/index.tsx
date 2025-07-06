import { useCallback, useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import { MyLinks } from './components/MyLinks';
import { NewLink } from './components/NewLink';
import { getShortenedLinks, type ShortenedLink } from '../../services/get-shortened-links';

export function Home () {
    const [links, setLinks] = useState<ShortenedLink[]>([])
    const [isLoading, setIsLoading] = useState(true);


    const loadLinks = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = await getShortenedLinks()
            setLinks(data)
        } catch (error) {
            console.error("Erro ao carregar links:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadLinks()

        const handleFocus = () => {
            loadLinks()
        }

        window.addEventListener('focus', handleFocus)

        return () => {
            window.removeEventListener('focus', handleFocus)
        }
    }, [loadLinks])

    return (
        <main className="min-h-screen flex flex-col py-16 px-6 bg-gray-200">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
                <header>
                    <img
                        src={logo}
                        alt="Ícone de corrente azul representando um link ao lado do nome 'brev.ly' também em azul."
                        className="h-8"
                    />  
                </header>

                <section className="w-full flex flex-col md:flex-row items-start justify-between gap-10">
                    <NewLink onLinkCreated={loadLinks} />
                    <MyLinks links={links} isLoading={isLoading} onReload={loadLinks} />
                </section>
            </div>
        </main>
    )
}
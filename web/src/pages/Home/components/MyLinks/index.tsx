import { DownloadSimple, LinkSimple } from "phosphor-react";
import { Button } from "../../../../components/Button";
import { Link } from "./Link";
import { getShortenedLinks, type ShortenedLink } from "../../../../services/get-shortened-links";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MyLinks() {
    const [links, setLinks] = useState<ShortenedLink[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadLinks() {
            try {
                const data = await getShortenedLinks()
                //console.log("Links recebidos:", data)
                //setLinks([])
                setLinks(data)
            } catch (error) {
                console.error("Error loading links:", error);
            } finally {
                setIsLoading(false);
            }

        }

        loadLinks()
    }, [])

    return (
        <div className="relative w-full max-w-md md:min-w-145 min-h-60 flex flex-col flex-1 gap-6 bg-gray-100 rounded-lg p-6">
            {isLoading && (
                <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden rounded-t-lg">
                    <div className="bg-blue-base h-full w-1/3 animate-loading-bar" />
                </div>
            )}


            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-gray-600 text-lg">
                    Meus Links
                </h2>

                <Button
                    disabled={links.length === 0}
                    variant="secondary"
                    icon={DownloadSimple}
                >
                    Baixar CSV
                </Button>
            </div>
                
            {/* Divider */}
            <div className="border-t border-gray-200"/>

            {/* Links List */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-base border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-gray-400 mt-2 animate-pulse">
                        Carregando links...
                    </span>
                </div>
            ) : links.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-6 text-center"
                >
                    <LinkSimple size={32} className="text-gray-400" />
                    <span className="text-xs text-gray-500 mt-2 uppercase tracking-wide">
                        Ainda não existem links cadastrados
                    </span>                    
                </motion.div>
            ) : (
                <div className="gap-2 divide-y divide-gray-200">                
                    {links.map(link => (
                        <Link 
                            key={link.id}
                            shortenedUrl={link.shortenedLink}
                            originalUrl={link.originalLink}
                            accessCount={link.accessCount}
                        />
                    ))}
                </div>                
            )}            
        </div>
    )
}

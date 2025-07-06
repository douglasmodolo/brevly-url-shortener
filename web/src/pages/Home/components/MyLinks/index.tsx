import { DownloadSimple, LinkSimple } from "phosphor-react";
import { Button } from "../../../../components/Button";
import { Link } from "./Link";
import { getShortenedLinks, type ShortenedLink } from "../../../../services/get-shortened-links";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { deleteShortenedLink } from "../../../../services/delete-shortened-link";
import { toast } from "sonner";
import { exportShortenedLinks } from "../../../../services/export-shortened-links";

export function MyLinks() {
    const [links, setLinks] = useState<ShortenedLink[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadLinks = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getShortenedLinks();
            setLinks(data);
        } catch (error) {
            console.error("Error loading links:", error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {        
        loadLinks()

        const handleFocus = () => {
            loadLinks()
        }

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        }
    }, [loadLinks])

    return (
        <div className="relative w-full max-w-2xl md:min-w-145 min-h-60 flex flex-col flex-1 gap-6 bg-gray-100 rounded-lg p-6">
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
                    onClick={async () => {
                        try {
                            const { reportUrl } = await exportShortenedLinks()
                            window.open(reportUrl, '_blank')

                            toast.success("Relatório exportado com sucesso", {
                                description: "O relatório dos links foi gerado e está pronto para download.",
                            })
                        } catch (error) {
                            console.error("Erro ao exportar CSV:", error)
                            toast.error("Erro ao exportar", {
                                description: "Ocorreu um erro ao tentar exportar os links. Tente novamente.",
                            })
                        }                        
                    }}
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
                <div className="gap-2 divide-y divide-gray-200 overflow-y-auto max-h-[calc(100vh-25rem)] pr-1 custom-scrollbar">                
                    {links.map(link => (
                        <Link 
                            key={link.id}
                            shortenedUrl={link.shortenedLink}
                            originalUrl={link.originalLink}
                            accessCount={link.accessCount}
                            onCopy={() => {
                                const fullUrl = `${import.meta.env.VITE_FRONTEND_URL}/r/${link.shortenedLink}`;
                                
                                navigator.clipboard.writeText(fullUrl);
                                
                                toast.info("Link copiado com sucesso", {
                                    description: `O link ${link.shortenedLink} foi copiado para a área de transferência.`,
                                }); 
                            }}
                            onDelete={async () => {
                                if (!window.confirm("Tem certeza que deseja excluir este link?")) return;
                                
                                try {
                                    await deleteShortenedLink(link.id);
                                    loadLinks();

                                    toast.success("Link excluído com sucesso", {
                                        description: `O link ${link.shortenedLink} foi removido.`,
                                    });
                                } catch (error) {
                                    console.error("Erro ao excluir o link:", error);
                                    toast.error("Erro ao excluir", {
                                        description: "Ocorreu um erro ao tentar excluir o link. Tente novamente.",
                                    });
                                }                                
                            }}
                        />
                    ))}
                </div>                
            )}            
        </div>
    )
}

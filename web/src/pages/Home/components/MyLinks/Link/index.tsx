import { Copy, Trash } from "phosphor-react";
import { Button } from "../../../../../components/Button";

type LinkProps = {
    shortenedUrl: string;
    originalUrl: string;
    accessCount: number;
    onCopy?: () => void;
    onDelete?: () => void;
}

export function Link({
    shortenedUrl,
    originalUrl,
    accessCount,
    onCopy,
    onDelete
}: LinkProps & {
    onCopy?: () => void;
    onDelete?: () => void;
}) {
    return (
        <div className="w-full flex items-center justify-between gap-3 p-3 relative overflow-hidden [&+div]:mt-2">
            <div className="max-w-[140px] lg:max-w-[300px] flex-1 flex flex-col gap-1">
                <a
                    href={`${import.meta.env.VITE_FRONTEND_URL}/r/${shortenedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-base text-md truncate hover:underline"
                >
                    brev.ly/{shortenedUrl}
                </a>
                <span className="text-gray-500 text-sm truncate">
                    {originalUrl}
                </span>
            </div>

            <span className="text-gray-600 text-sm">
                {accessCount} Acessos
            </span>

            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    icon={Copy}
                    onClick={onCopy}                 
                >
                    <span className="sr-only">Copiar link</span>
                </Button>

                <Button
                    variant="secondary"
                    icon={Trash}   
                    onClick={onDelete}                 
                >
                    <span className="sr-only">Excluir link</span>
                </Button>
            </div>
        </div>
    )
}
import { Copy, Trash } from "phosphor-react";
import { Button } from "../../../../../components/Button";

export function Link() {
    return (
        <div className="w-full flex items-center justify-between gap-3 p-3 relative overflow-hidden [&+div]:mt-2">
            <div className="max-w-[140px] lg:max-w-[300px] flex-1 flex flex-col gap-1">
                <span className="text-blue-base text-md truncate">
                    brev.ly/youtube
                </span>
                <span className="text-gray-500 text-sm truncate">
                    https://www.youtube.com/
                </span>
            </div>

            <span className="text-gray-600 text-sm">
                15 Acessos
            </span>

            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    icon={Copy}                    
                >
                    <span className="sr-only">Copiar link</span>
                </Button>

                <Button
                    variant="secondary"
                    icon={Trash}                    
                >
                    <span className="sr-only">Excluir link</span>
                </Button>
            </div>
        </div>
    )
}
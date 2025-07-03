import { DownloadSimple, LinkSimple } from "phosphor-react";
import { Button } from "../../../../components/Button";
import { Link } from "./Link";

export function MyLinks() {
    return (
        <div className="w-full max-w-md md:min-w-145 flex flex-col flex-1 gap-6  bg-gray-100 rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-gray-600 text-lg">
                    Meus Links
                </h2>

                <Button
                    disabled
                    variant="secondary"
                    icon={DownloadSimple}
                >
                    Baixar CSV
                </Button>
            </div>
                
            {/* Divider */}
            <div className="border-t border-gray-200"/>

            {/* Empty State */}
            {/* <div className="flex flex-col items-center justify-center py-6 text-center">
                <LinkSimple size={32} className="text-gray-400" />
                <span className="text-xs text-gray-500 mt-2 uppercase tracking-wide">
                    Ainda não existem links cadastrados
                </span>
            </div> */}


            {/* Links List */}
            <div className="gap-2 divide-y divide-gray-200">
                <Link />
                <Link />
            </div>
        </div>
    )
}

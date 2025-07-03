import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";

export function NewLink() {
    return (
        <form 
            action=""
            className="w-full max-w-md md:min-w-145 flex flex-col flex-1 gap-10 md:gap-12 bg-gray-100 rounded-lg p-6"
        >
            {/* Header */}
            <h2
                className="text-gray-600 text-lg"    
            >
                Novo Link
            </h2>

        
            <Input
                id="original-url"
                label="Link original"
                fixedPlaceholder="https://www.exemplo.com"            
            />

            <Input
                id="shortened-url"
                label="Link encurtado"
                fixedPlaceholder="brev.ly/"            
            />            

            <Button
                disabled                
            >
                Salvar link
            </Button>
            
        </form>
    )
}
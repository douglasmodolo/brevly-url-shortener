import z from "zod";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createShortenedLink } from "../../../../services/create-shortened-link";

const newLinkSchema = z.object({
    originalLink: z
        .string()
        .url({ message: "Informe uma url válida." }),
    shortenedLink: z
        .string()
        .min(3, { message: "Informe uma url minúscula e sem espaço/caracter especial." })
        .regex(/^[a-z0-9-]+$/, "Informe uma url minúscula e sem espaço/caracter especial."),
})

type NewLinkFormData = z.infer<typeof newLinkSchema>

export function NewLink({ onLinkCreated }: { onLinkCreated: () => void }) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, touchedFields, submitCount },
        reset,
    } = useForm<NewLinkFormData>({
        resolver: zodResolver(newLinkSchema),
        mode: "onSubmit",
    })

    async function handleCreateNewLink(data: NewLinkFormData) {
        try {
            await createShortenedLink({
                originalLink: data.originalLink,
                shortenedLink: data.shortenedLink,
            })

            toast.success("Link criado com sucesso!")
            reset()
            
            onLinkCreated()
        } catch (error: any) {
            toast.error("Erro ao criar link", {
                description: error?.response?.data?.message ?? "Tente novamente mais tarde.",
            });
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreateNewLink)}
            className="w-full max-w-md md:min-w-145 flex flex-col flex-1 gap-6 bg-gray-100 rounded-lg p-6"
        >
            {/* Header */}
            <h2 className="text-gray-600 text-lg">
                Novo Link
            </h2>
        

            <Input
                id="original-url"
                label="Link original"
                fixedPlaceholder="https://www.exemplo.com"
                error={submitCount > 0 || touchedFields.originalLink ? errors.originalLink?.message : undefined}         
                {...register("originalLink")}
            />

            <div>
                <Input
                    id="shortened-url"
                    label="Link encurtado"
                    fixedPlaceholder="brev.ly/"   
                    error={submitCount > 0 || touchedFields.shortenedLink ? errors.shortenedLink?.message : undefined}         
                    {...register("shortenedLink")}
                />            
            </div>

            <Button
                type="submit"                
                disabled={isSubmitting}           
            >
                {isSubmitting ? "Salvando..." : "Salvar link"}
            </Button>
            
        </form>
    )
}
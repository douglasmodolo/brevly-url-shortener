import type { IconProps } from "phosphor-react";
import type { ComponentProps, ComponentType } from "react";
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
    base: 'flex flex-row gap-3 items-center justify-center cursor-pointer transition-all duration-300 disabled:cursor-not-allowed',

    variants: {
        variant: {
            primary: 
                'bg-blue-base w-full h-[48px] text-white text-md rounded-lg px-20 py-7.5 enabled:hover:bg-blue-dark disabled:opacity-50',
            secondary: 
                'bg-gray-200 border-gray-200 h-[32px] text-sm font-semibold text-gray-500 rounded p-3.5 enabled:hover:border-blue-base disabled:opacity-50',
        },        
    },
    defaultVariants: {
        variant: 'primary',
    },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    icon?: ComponentType<IconProps>;
    isLoading?: boolean;
}

export function Button ({
    variant,
    icon: Icon,
    isLoading = false,
    children,
    ...props
}: ButtonProps) {
    const loadingColor = variant === 'primary' ? 'border-gray-100' : 'border-blue-base'
    
    return (
        <button type="button" className={buttonVariants({ variant })} {...props}>
            {Icon && !isLoading && (
                <Icon size={16} className="text-gray-600" />
            )}
            {isLoading && (
                <div
                    className={`w-6 h-6 border-2 ${loadingColor} border-t-white/40 rounded-full animate-spin`}
                    data-testid="button-loading"
                />
            )}

            {children}
        </button>
    )
}
import { type ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const labelVariants = tv({
  base: 'text-xs text-gray-500 uppercase font-semibold peer-focus:font-bold',
  variants: {
    intent: {
      default: 'peer-focus:text-blue-base',
      error: 'peer-focus:text-danger',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
})

const inputVariants = tv({
    base: 'peer z-1 text-md text-gray-600 font-normal border border-gray-300 caret-blue-base rounded-lg h-[48px] px-4 placeholder:text-gray-400',
    variants: {
        intent: {
            default: 'focus:outline-blue-base',
            error: 'focus:outline-danger',
        },
    },
    defaultVariants: {
        intent: 'default',
    },
})

type InputProps = ComponentProps<'input'> & {
    id: string
    label: string
    fixedPlaceholder?: string
    error?: string
}

export const Input: React.FC<InputProps> = ({
    id,
    label,
    fixedPlaceholder,
    error,
    ...props
}) => {
    const intent = error ? 'error' : 'default'

    return (
        <div className='flex flex-col-reverse gap-2 w-full'>
             {error && (
                 <span className="text-xs text-danger mt-1">
                     {error}
                 </span>
             )}

            <input 
                id={id}
                className='peer w-full h-12 px-4 rounded-lg border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-base'
                type='text'
                placeholder={fixedPlaceholder}
            />

            <label 
                htmlFor={id}
                className={labelVariants({ intent })}
            >                    
                {label}                
            </label>

        </div>
    )
}
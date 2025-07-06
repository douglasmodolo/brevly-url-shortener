import { Warning } from 'phosphor-react'
import type { ComponentProps, ComponentRef } from 'react'
import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: 'peer w-full h-12 px-4 rounded-lg border text-sm placeholder:text-gray-400 transition-all',
  variants: {
    intent: {
      default: 'border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-base',
      error: 'border-danger text-danger focus:outline-none focus:ring-2 focus:ring-danger',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
})

const labelVariants = tv({
  base: 'text-xs font-semibold uppercase peer-focus:font-bold',
  variants: {
    intent: {
      default: 'text-gray-500 peer-focus:text-blue-base',
      error: 'text-danger peer-focus:text-danger',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
})

type InputProps = ComponentProps<'input'> & VariantProps<typeof inputVariants> & {
  id: string
  label: string
  fixedPlaceholder?: string
  error?: string
}

export const Input = forwardRef<ComponentRef<'input'>, InputProps>(function InputBase({
  id,
  label,
  fixedPlaceholder,
  error,
  intent,
  className,
  ...props
}, ref) {
  const currentIntent = error ? 'error' : intent ?? 'default'
  const isShortenedLink = id === 'shortened-url'

  return (
    <div className="flex flex-col-reverse gap-2 w-full">
      {error && (
        <span className="text-xs text-danger mt-1 flex items-center gap-1">
            <Warning size={14} />
            {error}
        </span>
      )}

      {id === "shortened-url" ? (
        <div
          className={`flex items-center w-full h-12 rounded-lg border text-sm transition-all
            focus-within:ring-2 px-4 bg-white overflow-hidden
            placeholder:text-gray-400
            ${currentIntent === 'error' 
              ? 'border-danger text-danger focus-within:ring-danger focus-within:border-danger'
              : 'border-gray-300 text-gray-600 focus-within:ring-blue-base focus-within:border-blue-base'
            }`
          }
        >
          <span className={`font-semibold select-none shrink-0 ${
            currentIntent === 'error' ? 'text-danger' : 'text-blue-base'
          }`}>
            brev.ly/
          </span>
          
          <input
            id={id}
            ref={ref}
            type="text"
            className="flex-1 outline-none border-none bg-transparent text-sm placeholder:text-gray-400"
            placeholder="meu-link"
            {...props}
          />
        </div>
      ) : (
        <input
          id={id}
          ref={ref}
          placeholder={fixedPlaceholder}
          className={inputVariants({ intent: currentIntent, className })}
          {...props}
        />
      )}

      <label htmlFor={id} className={labelVariants({ intent: currentIntent })}>
        {label}
      </label>
    </div>
  )
})

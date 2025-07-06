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

  return (
    <div className="flex flex-col-reverse gap-2 w-full">
      {error && (
        <span className="text-xs text-danger mt-1">
          {error}
        </span>
      )}

      <input
        id={id}
        ref={ref}
        placeholder={fixedPlaceholder}
        className={inputVariants({ intent: currentIntent, className })}
        {...props}
      />

      <label htmlFor={id} className={labelVariants({ intent: currentIntent })}>
        {label}
      </label>
    </div>
  )
})

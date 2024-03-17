import { ButtonHTMLAttributes, memo } from 'react'
import { button, active as activeClassName, large } from './Button.module.css'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly active?: boolean
  readonly size?: 'medium' | 'large'
}

export const Button = memo(
  ({ active, className, size = 'medium', ...props }: ButtonProps) => (
    <button
      className={clsx(button, {
        [large]: size === 'large',
        [activeClassName]: active,
        [className]: !!className,
      })}
      {...props}
    />
  )
)

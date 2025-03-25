import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface OutlineBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  textSize?: string
  textColor?: string
  hoverColor?: string
  borderColor?: string
  padding?: string
  className?: string
  selected?: boolean
}

const OutlineBtn: React.FC<OutlineBtnProps> = ({
  children = 'Click Me',
  textSize = 'bold-16',
  textColor = '',
  hoverColor = '',
  borderColor = 'bg-logoblue-30',
  padding = 'px-2 py-1',
  className = '',
  selected = false,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        'group relative transition-all duration-300',
        textColor,
        hoverColor,
        padding,
        className
      )}
    >
      <span className={clsx(textSize, 'whitespace-nowrap cursor-pointer')}>
        {children}
      </span>

      {/* TOP */}
      <span
        className={clsx(
          'absolute left-0 top-0 h-[2px] transition-all duration-100',
          selected ? 'w-full' : 'w-0 group-hover:w-full',
          borderColor
        )}
      />

      {/* RIGHT */}
      <span
        className={clsx(
          'absolute right-0 top-0 w-[2px] transition-all delay-100 duration-100',
          selected ? 'h-full' : 'h-0 group-hover:h-full',
          borderColor
        )}
      />

      {/* BOTTOM */}
      <span
        className={clsx(
          'absolute bottom-0 right-0 h-[2px] transition-all delay-200 duration-100',
          selected ? 'w-full' : 'w-0 group-hover:w-full',
          borderColor
        )}
      />

      {/* LEFT */}
      <span
        className={clsx(
          'absolute bottom-0 left-0 w-[2px] transition-all delay-300 duration-100',
          selected ? 'h-full' : 'h-0 group-hover:h-full',
          borderColor
        )}
      />
    </button>
  )
}

export default OutlineBtn

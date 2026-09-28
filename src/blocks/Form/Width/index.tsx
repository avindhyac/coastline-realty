import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div
      className={[className, 'w-full md:max-w-[var(--field-width)]'].filter(Boolean).join(' ')}
      style={{ '--field-width': width ? `${width}%` : '100%' } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

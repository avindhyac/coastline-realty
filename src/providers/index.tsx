import React from 'react'

import { CurrencyProvider } from './Currency'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </CurrencyProvider>
    </ThemeProvider>
  )
}

import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#f0f9ff' },
          100: { value: '#e0f2fe' },
          500: { value: '#0CCA4A' },
          600: { value: '#0aa83a' },
          900: { value: '#1B1B1E' },
        },
        charcoal: {
          50: { value: '#f6f6f6' },
          900: { value: '#373F51' },
        },
      },
    },
    semanticTokens: {
      colors: {
        background: { value: '{colors.brand.900}' },
        foreground: { value: '{colors.brand.50}' },
      },
    },
  },
})
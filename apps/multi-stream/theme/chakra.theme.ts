import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  semanticTokens: {
    colors: {
      'primary': {
        default: '#95A4FC',
        _dark: '#95A4FC',
      },
      'white': {
        default: '#ffffff',
        _dark: '#1C1C1C',
      },
      'light': {
        default: '#F7F9FB',
        _dark: 'rgba(255, 255, 255, 0.05)',
      },
      'blue': {
        default: '#E3F5FF',
        _dark: '#E3F5FF',
      },
      'purple': {
        default: '#E5ECF6',
        _dark: '#E5ECF6',
      },
      'black': {
        default: 'rgba(0, 0, 0, 0.05)',
        _dark: 'rgba(255, 255, 255, 0.1)',
      },
      'black.100': {
        default: '#1c1c1c',
        _dark: '#ffffff',
      },
      'black.40': {
        default: 'rgba(0, 0, 0, 0.4)',
        _dark: 'rgba(255, 255, 255, 0.4)',
      }
    },
  },
})

import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
  },
  sizes: {
  },
  variants: {
    solid: {
      bg: "primary",
      color: "#fff",
      _hover: {
        bg: "primary-dark"
      }
    }
  },
  defaultProps: {
  },
})

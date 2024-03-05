import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    border: 'none',
    bg: '#93B1A6',
  },
  item: {
    bg: '#93B1A6',
    _hover: {
      bg: 'white',
    },
  },
});

export const menu = defineMultiStyleConfig({ baseStyle });
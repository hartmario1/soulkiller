/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { extendTheme } from '@chakra-ui/react';

const COLORS = {
  purple: '#7252ff',
  whitepurple: '#9f89ff',
  whiteblue: '#262e40ff',
  bgblue: '#1a202c',
  greypale: '#99AAB5'
} as const;
Object.freeze(COLORS);

const COMPONENTS = {
  featureBox: {
    baseStyle: ({ colorMode }: Record<string, any>) => ({
      bg: colorMode === 'dark' ? 'purple' : 'whitepurple'
    })
  },
  taskBox: {
    baseStyle: ({ colorMode }: Record<string, any>) => ({
      bg: colorMode === 'dark' ? 'whiteblue' : 'greypale'
    })
  },
  taskColumn: {
    baseStyle: ({ colorMode }: Record<string, any>) => ({
      bg: colorMode === 'dark' ? 'bgblue' : 'white'
    })
  },
  settingsGradient: {
    baseStyle: ({ colorMode }: Record<string, any>) => ({
      bgGradient: colorMode === 'dark' ? 'linear(to-l, #7928CA, purple)' : 'linear(to-l, #9f89ff,#449bff)'
    })
  },
  proxyColumn: {
    baseStyle: ({ colorMode }: Record<string, any>) => ({
      bg: colorMode === 'dark' ? 'whiteblue' : '#ededed'
    })
  }
} as const;
Object.freeze(COMPONENTS);

const VARIANTS = ({
  components: {
    Table: {
      baseStyle: {
        fontWeight: 'semibold'
      },
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px'
        }
      },
      variants: {
        'task-variant': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde'
        }
      }
    }
  }
}) as const;
Object.freeze(VARIANTS);

const CONFIG = {
  initialColorMode: 'dark',
  useSystemColorMode: false
} as const;
Object.freeze(CONFIG);

const STYLES = { } as const;
Object.freeze(STYLES);

export { COLORS, CONFIG, STYLES };

export default extendTheme({
  styles: STYLES,
  config: CONFIG,
  colors: COLORS,
  variants: VARIANTS,
  components: COMPONENTS
});

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
  whitepurple: '#9f89ff'
} as const;
Object.freeze(COLORS);

const COMPONENTS = {
  featureBox: {
    baseStyle: ({ colorMode }: Record<string, any>) => ({
      bg: colorMode === 'dark' ? 'purple' : 'whitepurple'
    })
  }
} as const;
Object.freeze(COMPONENTS);

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
  components: COMPONENTS
});

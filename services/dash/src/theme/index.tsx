/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import { extendTheme } from '@chakra-ui/react';

const COLORS = {
  brand: {
    blue: '#00ACEE',
    orange: '#ED6500',
    pink: '#ED00B7'
  }
} as const;
Object.freeze(COLORS);

const CONFIG = {
  initialColorMode: 'dark',
  useSystemColorMode: false
} as const;
Object.freeze(CONFIG);

const STYLES = {} as const;
Object.freeze(STYLES);

export { COLORS, CONFIG, STYLES };

export default extendTheme({
  styles: STYLES,
  config: CONFIG,
  colors: COLORS
});

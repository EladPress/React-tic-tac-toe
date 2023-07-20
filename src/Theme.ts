import { createTheme, colors } from '@mui/material';
import React from 'react';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: colors.orange[500],
      darker: colors.orange[900],
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  // interface Palette {
  //   neutral: Palette['primary'];
  // }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  // interface PaletteColor {
  //   darker?: string;
  // }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
  
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}

export { theme };

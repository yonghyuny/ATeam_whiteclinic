import { createTheme } from '@mui/material';

//typescript 환경에서 mui Typography varient 추가할때 필수 입력해야함
declare module '@mui/material/styles' {
  interface TypographyVariants {
    namebox: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    namebox?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    namebox: true;
  }
}

export const theme = createTheme({
  typography: {
    namebox: {
      fontSize: '32px',
      fontWeight: 800,
    },
  },
});

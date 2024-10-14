import React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import AText, { TextProps } from '@/components/atom/Text/AText';
import FormField, { FormFieldProps } from './FormField';

export type TitledFormControlProps = {
  titleprops?: TextProps;
  formfieldprops?: FormFieldProps;
  onchange?: () => void;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F4D67',
      light: '#42a5f5',
      dark: '#1565c0',
    },
  },
});

const TitledFormControl: React.FC<TitledFormControlProps> = ({
  titleprops,
  formfieldprops,
  onchange,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          minWidth: '550px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          mb: 2,
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box
          sx={{
            width: '150px',
            minWidth: '150px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            bgcolor: 'primary.main',
            color: 'white',
            px: 3,
          }}
        >
          {titleprops && <AText {...titleprops} size="large" />}
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            p: 2,
            bgcolor: 'background.paper',
          }}
        >
          {formfieldprops && <FormField {...formfieldprops} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TitledFormControl;

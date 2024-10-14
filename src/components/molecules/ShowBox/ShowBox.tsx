import { Box, FormLabel } from '@mui/material';

export const StyledShowBox = {
  width: '300px',
  height: '550px',
  padding: '4px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  border: '1px solid #bdbdbd',
  borderRadius: '6px',
  overflow: 'scroll',
};

type ShowBoxProps = {
  children: React.ReactNode;
  label?: string;
};

const ShowBox = ({ children, label }: ShowBoxProps) => {
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Box sx={{ ...StyledShowBox }}>{children}</Box>
    </Box>
  );
};

export default ShowBox;

export const ButtonStyle = {
  size: {
    small: {
      fontSize: '12px',
      padding: '6px 12px',
      minWidth: '80px',
    },
    medium: {
      fontSize: '16px',
      padding: '8px 16px',
      minWidth: '120px',
    },
    large: {
      fontSize: '30px',
      padding: '10px 20px',
      minWidth: '200px',
    },
    full: {
      fontSize: '20px',
      width: '100%',
    },
  },
  color: {
    primary: {
      backgroundColor: '#1976d2',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#1565c0',
      },
    },
    secondary: {
      backgroundColor: '#dc004e',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#c51162',
      },
    },
    default: {
      backgroundColor: '#f5f5f5',
      color: '#000000',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
    },
  },
};

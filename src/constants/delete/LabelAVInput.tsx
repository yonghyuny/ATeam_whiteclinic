// 'use client';

// import React from 'react';
// import { Box } from '@mui/material';
// import AText, { TextProps } from '@/components/atom/Text/AText';

// type LabelAVOutlinedInputProps = AVOutlinedInputProps & {
//   label: string;
//   textProps?: Omit<TextProps, 'text'>;
// };

// const LabelAVOutlinedInput: React.FC<LabelAVOutlinedInputProps> = ({
//   label,
//   textProps,
//   ...inputProps
// }) => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         borderBottom: '1px solid #ccc',
//       }}
//     >
//       <Box
//         sx={{
//           width: '120px',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           bgcolor: '#F2F2F2',
//           borderRight: '1px solid #ccc',
//           padding: '8px',
//         }}
//       >
//         <AText text={label} {...textProps} />
//       </Box>
//       <Box
//         sx={{
//           flex: 1,
//           display: 'flex',
//           alignItems: 'center',
//           padding: '8px 16px',
//         }}
//       >
//         <AVOutlinedInput {...inputProps} />
//       </Box>
//     </Box>
//   );
// };

// export default LabelAVOutlinedInput;

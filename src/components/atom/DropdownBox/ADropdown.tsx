'use client';

import { selectDate } from '@/constants/delete/Dates';
import { Days } from '@/constants/Days';
import { Document } from '@/constants/Document';
import { Months } from '@/constants/delete/Months';
import { MonthsPlan } from '@/constants/MonthsPlan';
import { Payment } from '@/constants/Payment';
import { Percentage } from '@/constants/Percentage';
import { productCategories } from '@/constants/productCategory';
import { sizes } from '@/styles/sizes';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type AllowedObjects =
  // | (typeof AvailableThings)[number] // 상수 객체의 키들을 유니온타입으로 만들기때문에
  | (typeof Days)[number] // [number] 배열의 요소타입을 추출하기위해 사용
  | (typeof selectDate)[number] //
  | (typeof Months)[number]
  | (typeof Percentage)[number]
  | (typeof Document)[number]
  | (typeof MonthsPlan)[number]
  | (typeof Payment)[number]
  | (typeof productCategories.airConditioner.categories)[number]['category']
  | (typeof productCategories.washingMachine.categories)[number]['category'];
// | (typeof PaymentPlan)[number];

type widthOptions = keyof typeof sizes.width;

type OptionsProps = {
  value: AllowedObjects;
  text: AllowedObjects;
};

export type ADropdownProps = {
  label?: string;
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  options: OptionsProps[];
  width?: widthOptions;
  color?: string;
};

const ADropdown = ({ label, options, width = 'small', color, onChange }: ADropdownProps) => {
  return (
    <Box
      sx={{
        maxWidth: sizes.width[width],
        minWidth: sizes.width[width],
      }}
    >
      <FormControl fullWidth size="small">
        <InputLabel id={`${label}-simple-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-simple-select-label`}
          id={`${label}-simple-select`}
          label={label}
          onChange={onChange}
          // sx={{ color: color }}
        >
          {options.map((option) => (
            <MenuItem key={String(option.value)} value={String(option.value)}>
              {String(option.text)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ADropdown;

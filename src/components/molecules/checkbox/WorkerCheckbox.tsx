'use client';

import ACheckbox, { CheckboxProps } from '@/components/atom/CheckBox/ACheckbox';

import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

export type WorkerCheckboxGroupProps = {
  checkboxes: { [key: string | number]: CheckboxProps };
  onChange?: (selectedKey: string | null) => void;
  value?: string | null;
};

// export const checkboxData: { [key: string]: CheckboxProps } = {
//   comprehensiveWash: {
//     isCheck: false,
//     onChange: () => {},
//     textprops: { text: '종합세척' as CheckboxTextType },
//   },
//   normalWash: {
//     isCheck: false,
//     onChange: () => {},
//     textprops: { text: '일반세척' as CheckboxTextType },
//   },
// };

const WorkcerCheckbox = ({ checkboxes, onChange, value }: WorkerCheckboxGroupProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    setSelectedKey(value || null);
  }, [value]);

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = event.target.checked ? key : null;
    setSelectedKey(newKey);
    onChange?.(newKey);

    // // 콘솔에 선택된 항목의 키와 라벨 출력
    // if (newKey !== null) {
    //   console.log(`선택된 항목: ${checkboxData[newKey].textprops?.text}`);
    // } else {
    //   console.log('선택된 항목이 해제되었습니다.');
    // }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {Object.entries(checkboxes).map(([key, checkboxProps]) => (
        <ACheckbox
          key={key}
          isChecked={selectedKey === key}
          onChange={handleChange(key)}
          textprops={checkboxProps.textprops}
        />
      ))}
    </Box>
  );
};

export default WorkcerCheckbox;

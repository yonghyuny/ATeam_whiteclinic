'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ShaNumericInputProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  min?: number;
  max?: number;
  required?: boolean;
  error?: string;
  showError?: boolean;
};

const formatCurrency = (value: string) => {
  const number = parseFloat(value.replace(/,/g, ''));
  if (isNaN(number)) return '';
  return number.toLocaleString('ko-KR');
};

const unformatCurrency = (value: string) => {
  return value.replace(/,/g, '');
};

const ShaNumericInput = ({
  label,
  value = '',
  onChange,
  placeholder = '0',
  className,
  size = 'medium',
  disabled: initialDisabled = false,
  min = 0,
  max,
  required = false,
  error,
  showError = false,
}: ShaNumericInputProps) => {
  const [isDisabled, setIsDisabled] = useState(initialDisabled);
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = unformatCurrency(e.target.value);

    // 숫자가 아닌 문자 제거
    newValue = newValue.replace(/[^\d]/g, '');

    // 앞의 0 제거
    if (newValue.length > 1 && newValue.startsWith('0')) {
      newValue = newValue.replace(/^0+/, '');
    }

    // 빈 값 처리
    if (newValue === '') {
      onChange?.('0');
      return;
    }

    const numericValue = Number(newValue);
    if (
      !isNaN(numericValue) &&
      (min === undefined || numericValue >= min) &&
      (max === undefined || numericValue <= max)
    ) {
      onChange?.(numericValue.toString());
      setDisplayValue(formatCurrency(newValue));
    }
  };

  const sizeClasses = {
    small: 'w-32',
    medium: 'w-64',
    large: 'w-96',
  };

  const showErrorState = showError && required && !value;

  return (
    <div className={cn('grid gap-1.5', sizeClasses[size], className)}>
      {label && (
        <Label className="text-sm font-medium flex items-center gap-2">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Input
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            type="text"
            disabled={isDisabled}
            className={cn(
              'pr-8',
              showErrorState && 'border-destructive focus-visible:ring-destructive'
            )}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            원
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => setIsDisabled(!isDisabled)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      {showErrorState && error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default ShaNumericInput;

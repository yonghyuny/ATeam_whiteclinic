'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type ShaDateTimePickerProps = {
  dateLabel?: string;
  timeLabel?: string;
  value?: Date | null;
  onChange?: (newValue: Date | null) => void;
  className?: string;
};

const ShaDateTimePicker = ({
  dateLabel = '날짜',
  timeLabel = '시간',
  value,
  onChange,
  className,
}: ShaDateTimePickerProps) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const newDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      value?.getHours() || 0,
      value?.getMinutes() || 0
    );

    onChange?.(newDateTime);
  };

  const handleTimeChange = (type: 'hour' | 'minute', timeValue: string) => {
    if (!value) {
      const now = new Date();
      value = now;
    }

    const newDateTime = new Date(value);
    if (type === 'hour') {
      newDateTime.setHours(parseInt(timeValue));
    } else {
      newDateTime.setMinutes(parseInt(timeValue));
    }

    onChange?.(newDateTime);
  };

  // 시간 선택 옵션 생성
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className={cn('flex gap-2', className)}>
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, 'PPP', { locale: ko }) : <span>{dateLabel}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value || undefined}
              onSelect={handleDateSelect}
              locale={ko}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2">
        <Select
          value={value?.getHours().toString().padStart(2, '0')}
          onValueChange={(val) => handleTimeChange('hour', val)}
        >
          <SelectTrigger className="w-[100px]">
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="시" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}시
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value?.getMinutes().toString().padStart(2, '0')}
          onValueChange={(val) => handleTimeChange('minute', val)}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="분" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}분
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ShaDateTimePicker;

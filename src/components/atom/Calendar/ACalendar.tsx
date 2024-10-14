'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer, ToolbarProps, Event } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';

moment.locale('ko');
const localizer = momentLocalizer(moment);

interface CustomEvent extends Event {
  user?: string;
  createdAt?: Date;
  createdBy?: string;
}

interface CustomToolbarProps extends ToolbarProps {
  onSearch?: (searchTerm: string) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ date, onNavigate }) => {
  const goToBack = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToCurrent = () => {
    onNavigate('TODAY');
  };

  const formattedLabel = moment(date).format('YYYY년 M월');

  return (
    <Box
      className="rbc-toolbar"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={goToBack} size="small">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" sx={{ margin: '0 20px', fontWeight: 'bold' }}>
          {formattedLabel}
        </Typography>
        <IconButton onClick={goToNext} size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <IconButton onClick={goToCurrent} size="small" sx={{ backgroundColor: '#f0f0f0' }}>
        <TodayIcon />
      </IconButton>
    </Box>
  );
};

interface CustomCalendarProps {
  events?: CustomEvent[];
  onEventAdd?: (event: CustomEvent) => void;
  onEventSelect?: (event: CustomEvent) => void;
}

const ACalendar: React.FC<CustomCalendarProps> = ({ events = [], onEventAdd, onEventSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    if (onEventAdd) {
      const newEvent: CustomEvent = {
        title: '새 이벤트',
        start: slotInfo.start,
        end: slotInfo.end,
        createdAt: new Date(),
      };
      onEventAdd(newEvent);
    }
  };

  const handleSelectEvent = (event: CustomEvent) => {
    if (onEventSelect) {
      onEventSelect(event);
    }
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return (
    <Box sx={{ height: '100%', maxWidth: '80%', margin: '0 auto' }}>
      <Calendar<CustomEvent>
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100% - 50px)' }}
        views={['month']}
        components={{
          toolbar: (toolbarProps) => <CustomToolbar {...toolbarProps} />,
        }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        date={currentDate}
        onNavigate={handleNavigate}
        messages={{
          next: '다음',
          previous: '이전',
          today: '오늘',
          month: '월',
          week: '주',
          day: '일',
        }}
      />
    </Box>
  );
};

export default ACalendar;

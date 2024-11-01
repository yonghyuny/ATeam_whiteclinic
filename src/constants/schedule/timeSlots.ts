export const timeSlots = [
  '8시 이전',
  '08:00 ~ 09:00',
  '09:00 ~ 10:00',
  '10:00 ~ 11:00',
  '11:00 ~ 12:00',
  '12:00 ~ 13:00',
  '13:00 ~ 14:00',
  '14:00 ~ 15:00',
  '15:00 ~ 16:00',
  '16:00 ~ 17:00',
  '17:00 ~ 18:00',
  '18:00 ~ 19:00',
  '19시 이후',
] as const;

export type TimeSlot = (typeof timeSlots)[number];
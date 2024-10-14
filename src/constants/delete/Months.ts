export const Months: string[] = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

export const MonthsOption = Months.map((month) => ({ text: month, value: month }));

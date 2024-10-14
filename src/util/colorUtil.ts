import { colors } from '@/styles/colors';

export const stateMapper = {
  currentState: (isCurrent: boolean) => (isCurrent ? 'current' : 'notCurrent'),
  activateState: (isActive: boolean) => (isActive ? 'active' : 'inActive'),
};

// 전략 패턴
export const colorStrategies = {
  active: colors.text.active,
  inactive: colors.text.inActive,
  current: colors.text.current,
  notCurrent: colors.text.notCurrent,
};

export const determineCurrentColor = (state: 'current' | 'notCurrent') => colorStrategies[state];
export const determineActiveColor = (state: 'active' | 'inactive') => colorStrategies[state];

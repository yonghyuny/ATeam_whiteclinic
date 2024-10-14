import { Stack } from '@mui/material';
import CTimeSelect, { CtimeSelectProps } from './CTImeSelect';
import CEditButton from './CEditButton';
import { StyledScheduleTimeline } from '../ts/BEditScheduleDef';

type CTImeSubmitProps = {
  timeprops: CtimeSelectProps;
  handleClick: () => void;
};

const CTimeSubmit = ({ timeprops, handleClick }: CTImeSubmitProps) => {
  return (
    <Stack sx={{ ...StyledScheduleTimeline }}>
      <CTimeSelect {...timeprops} />
      <CEditButton handleClick={handleClick} />
    </Stack>
  );
};

export default CTimeSubmit;

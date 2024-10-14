import { CEditButtonProps } from '../ts/BEditScheduleDef';
import CButton from './CButton';

const CEditButton = ({ handleClick }: CEditButtonProps) => {
  return <CButton content="등록" handleClick={handleClick} type="submit" />;
};

export default CEditButton;

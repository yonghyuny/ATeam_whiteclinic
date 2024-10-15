import React from 'react';
import TitledFormControl, { TitledFormControlProps } from './ShaTitledFormControl';

type InfoFormProps = {
  titledFormControlProps: TitledFormControlProps[];
};

const InfoForm: React.FC<InfoFormProps> = ({ titledFormControlProps }) => {
  return (
    <div className="flex flex-col w-fit">
      {titledFormControlProps.map((props, index) => (
        <TitledFormControl key={index} {...props} />
      ))}
    </div>
  );
};

export default InfoForm;

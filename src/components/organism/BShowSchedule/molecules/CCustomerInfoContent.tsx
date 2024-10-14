import { Box, Typography } from '@mui/material';
import { CustomerInfoProps, priceRender, StyledCustomerInfo } from '../ts/BEditScheduleDef';

//스케쥴 표에 나오는 사용자 정보
const CCustomerInfoContent = ({ customer }: CustomerInfoProps) => {
  if (!customer) {
    return <div></div>;
  }

  //customer.comments의 존재 유무에 따라 다르게 출력
  const renderCustomerInfo = () =>
    customer.customerComments
      ? `${customer.customerComments} - ${customer.cleaningType} - ${
          customer.itemQuantity
        }대 - ${priceRender(customer)}`
      : `${customer.cleaningType} - ${customer.itemQuantity}대 - ${priceRender(customer)}`;

  return (
    <Box sx={{ ...StyledCustomerInfo }}>
      <Typography variant="subtitle1" component="span">
        {customer.customerName} - {customer.customerContact} - {customer.customerAddress} -{' '}
        {customer.cleaningItem} - {renderCustomerInfo()}
      </Typography>
    </Box>
  );
};

export default CCustomerInfoContent;

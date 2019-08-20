import React from 'react';
import { Img } from '@rtm-ui/img';
import * as S from './styles';

export default ({ logoUrl, full_name }) => {
  return (
    logoUrl && (
      <S.MerchantBox>
        <Img src={logoUrl} alt={full_name} />
      </S.MerchantBox>
    )
  );
};

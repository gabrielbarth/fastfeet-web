import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import IconButton from '../IconButton';

export default function BackButton() {
  return (
    <IconButton
      title="BACK"
      Icon={MdKeyboardArrowLeft}
      action={history.goBack}
      background="#CCC"
    />
  );
}

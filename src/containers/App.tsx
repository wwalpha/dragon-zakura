import React, { FunctionComponent } from 'react';
import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import PlusMinus from './PlusMinus';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    root: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 10%',
    },
  })
);

const App: FunctionComponent<any> = () => {
  return <PlusMinus />;
};

export default App;

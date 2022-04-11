import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, Theme } from '@mui/material';
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

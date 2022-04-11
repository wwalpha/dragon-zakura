import React, { FunctionComponent, useState } from 'react';
import { State } from '@domains';
import { Box, Button, createStyles, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import random from 'lodash/random';
import padStart from 'lodash/padStart';

const app = (state: State) => state.app;

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    header: {},
    button: {
      padding: '6px 8px',
      backgroundPosition: '50% 10%',
      minWidth: 'auto',
    },
    icon: { margin: spacing(0) },
  })
);

const getRandom = () => {
  const operation = 'x';

  const num1 = random(10, 99, false);
  let num2 = 0;
  let result = 0;

  if (operation === 'x') {
    num2 = random(2, 9, false);
    result = num1 * num2;
  }

  return [`${padStart(num1.toString(), 2, ' ')} ${operation} ${padStart(num2.toString(), 2, ' ')} = `, result];
};

const PlusMinus: FunctionComponent<any> = () => {
  const classes = useStyles();
  const [dataRows, setDataRows] = useState([] as any[]);
  const [answers, setAnswers] = useState([] as string[]);
  const print = useMediaQuery('print');

  React.useEffect(() => {
    const datas = [];

    for (let i = 0; i < 25; i += 1) {
      datas.push(
        <Box key={`row${i}`} display="flex" p={1} marginLeft="48px" marginRight="48px" justifyContent="center">
          <Box key={`column1_${i}`} width="25%">
            {(() => {
              const v = getRandom();
              answers.push(`${i + 1}) ${v[1]}`);
              return `${i + 1}) ${v[0]}`;
            })()}
          </Box>
          <Box key={`column2_${i}`} width="25%">
            {(() => {
              const v = getRandom();
              answers.push(`${i + 26}) ${v[1]}`);
              return `${i + 26}) ${v[0]}`;
            })()}
          </Box>
          <Box key={`column3_${i}`} width="25%">
            {(() => {
              const v = getRandom();
              answers.push(`${i + 51}) ${v[1]}`);
              return `${i + 51}) ${v[0]}`;
            })()}
          </Box>
          <Box key={`column4_${i}`} width="25%">
            {(() => {
              const v = getRandom();
              answers.push(`${i + 76}) ${v[1]}`);
              return `${i + 76}) ${v[0]}`;
            })()}
          </Box>
        </Box>
      );
    }

    setDataRows(datas);

    for (let i = 0; i < 25; i += 1) {
      answers.splice(answers.length - 1 - i * 2, 0, ...answers.splice(1 + i, 1));
      answers.splice(answers.length - 1 - i, 0, ...answers.splice(1 + i, 1));
      answers.splice(answers.length - 1, 0, ...answers.splice(1 + i, 1));
    }
  }, []);

  const handlePrint = () => {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([answers.join('\n')], { type: 'text/plain' }));
    a.download = 'answers.txt';

    // Append anchor to body.
    document.body.appendChild(a);
    a.click();
    // Remove anchor from body
    document.body.removeChild(a);
  };

  return (
    <Box>
      {!print && (
        <Box display="flex" margin="8px" justifyContent="flex-end" className={classes.header}>
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Download
          </Button>
        </Box>
      )}
      <Box>{dataRows}</Box>
    </Box>
  );
};

export default PlusMinus;

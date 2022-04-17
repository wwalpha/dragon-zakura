import React, { FunctionComponent, useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import random from 'lodash/random';
import padStart from 'lodash/padStart';

interface Props {
  operation: string;
  col: number;
}

const styles = {
  header: {},
  button: {
    padding: '6px 8px',
    backgroundPosition: '50% 10%',
    minWidth: 'auto',
  },
  icon: { margin: 0 },
};

const getRandom = (operation: string) => {
  const num1 = random(10, 99, false);
  let num2 = 0;
  let result = 0;
  let ans = '';

  operation = operation === '' ? '+' : operation;

  if (operation === 'x') {
    num2 = random(2, 9, false);
    result = num1 * num2;
    ans = result.toString();
  } else if (operation === '÷') {
    num2 = random(2, 9, false);
    result = num1 / num2;
    ans = Math.floor(num1 / num2).toString() + (num1 % num2 == 0 ? '' : '...' + (num1 % num2).toString());
  } else if (operation === '+') {
    num2 = random(10, 99, false);
    result = num1 + num2;
    ans = result.toString();
  }

  // return [`${padStart(num1.toString(), 2, ' ')} ${operation} ${padStart(num2.toString(), 2, ' ')} = ${ans}`, ans];
  return [`${padStart(num1.toString(), 2, ' ')} ${operation} ${padStart(num2.toString(), 2, ' ')} = `, ans];
};

const PlusMinus: FunctionComponent<any> = () => {
  const [dataRows, setDataRows] = useState([] as any[]);
  const [answers, setAnswers] = useState([] as string[]);
  const [cmark, setCmark] = useState('');
  const print = useMediaQuery('print');

  // const setDataValue = (props:{operation: string,col:number}) => {
  const setDataValue = (props: Props) => {
    const datas = [];
    const tmpAnswers = [];

    // // propsから値取り出し
    // const { operation, col } = props;
    console.log();
    for (let i = 0; i < 25; i += 1) {
      datas.push(
        <Box key={`row${i}`} display="flex" p={1} marginLeft="48px" marginRight="48px" justifyContent="center">
          {/* <Box key={`column1_${i}`} width={operation==='÷'?"50%":"25%"}> */}
          <Box key={`column1_${i}`} width={props.col === 2 ? '50%' : '25%'}>
            {(() => {
              const v = getRandom(props.operation);
              tmpAnswers.push(`${i + 1}) ${v[1]}`);
              return `${i + 1}) ${v[0]}`;
            })()}
          </Box>
          <Box key={`column2_${i}`} width={props.col === 2 ? '50%' : '25%'}>
            {(() => {
              const v = getRandom(props.operation);
              tmpAnswers.push(`${i + 26}) ${v[1]}`);
              return `${i + 26}) ${v[0]}`;
            })()}
          </Box>
          <Box key={`column3_${i}`} width={props.col === 2 ? '1%' : '25%'}>
            {(() => {
              if (props.col >= 3) {
                const v = getRandom(props.operation);
                tmpAnswers.push(`${i + 51}) ${v[1]}`);
                return `${i + 51}) ${v[0]}`;
              }
            })()}
          </Box>
          <Box key={`column4_${i}`} width={props.col === 2 ? '1%' : '25%'}>
            {(() => {
              if (props.col >= 4) {
                const v = getRandom(props.operation);
                tmpAnswers.push(`${i + 76}) ${v[1]}`);
                return `${i + 76}) ${v[0]}`;
              }
            })()}
          </Box>
        </Box>
      );
    }

    setDataRows(datas);

    for (let i = 0; i < 25; i += 1) {
      if (props.col >= 4) {
        tmpAnswers.splice(tmpAnswers.length - 1 - i * 2, 0, ...tmpAnswers.splice(1 + i, 1));
      }
      if (props.col >= 3) {
        tmpAnswers.splice(tmpAnswers.length - 1 - i, 0, ...tmpAnswers.splice(1 + i, 1));
      }
      tmpAnswers.splice(tmpAnswers.length - 1, 0, ...tmpAnswers.splice(1 + i, 1));
    }
    setAnswers(tmpAnswers);
  };

  //かけ算50
  const handleGetMultiplyData50 = () => {
    setCmark('x');
    setDataValue({
      operation: 'x',
      col: 2,
    });
    handlePrint('_x50_');
  };

  //かけ算
  const handleGetMultiplyData = () => {
    setCmark('x');
    setDataValue({
      operation: 'x',
      col: 4,
    });
    handlePrint('_x100_');
  };

  // 割り算
  const handleGetDivideData = () => {
    setCmark('÷');
    console.log('Divid cmark=' + cmark);
    setDataValue({
      operation: '÷',
      col: 2,
    });
    handlePrint('÷');
  };

  const handlePrint = (opType: string) => {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([answers.join('\n')], { type: 'text/plain' }));
    // const yyyy =new Date().getFullYear()
    const mo = new Date().getMonth() + 1;
    const dd = new Date().getDate();
    const hh = new Date().getHours();
    const mm = new Date().getMinutes();
    const ss = new Date().getSeconds();

    a.download = `answer_${opType}_${mo}${dd}${hh}${mm}${ss}.txt`;

    // Append anchor to body.
    document.body.appendChild(a);
    a.click();
    // Remove anchor from body
    document.body.removeChild(a);
  };

  const handlePrint2 = () => {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([answers.join('\n')], { type: 'text/plain' }));
    const mo = new Date().getMonth() + 1;
    const dd = new Date().getDate();
    const hh = new Date().getHours();
    const mm = new Date().getMinutes();
    const ss = new Date().getSeconds();

    a.download = `answer_${mo}${dd}${hh}${mm}${ss}.txt`;

    // Append anchor to body.
    document.body.appendChild(a);
    a.click();
    // Remove anchor from body
    document.body.removeChild(a);
  };
  return (
    <Box>
      {!print && (
        <Box display="flex" margin="8px" justifyContent="flex-end" sx={styles.header}>
          <Button variant="contained" color="primary" margin-right="8px" onClick={handleGetMultiplyData50}>
            takuto)かけ算
          </Button>
          <Button variant="contained" color="primary" margin-right="8px" onClick={handleGetMultiplyData}>
            kanhi)かけ算
          </Button>
          <Button id="btnDL" variant="outlined" color="primary" onClick={handlePrint2}>
            Download({cmark})
          </Button>
        </Box>
      )}
      <Box>{dataRows}</Box>
    </Box>
  );
};

export default PlusMinus;

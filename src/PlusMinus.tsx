import React, { FunctionComponent, useState } from 'react';
import { Box, Button, MenuItem, Select, useMediaQuery } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { getDivider, getMinus, getMultiple, getPlus, getTimestamp } from './utils';
import padStart from 'lodash/padStart';
import padEnd from 'lodash/padEnd';

const styles = {
  header: {},
  button: {
    padding: '6px 8px',
    backgroundPosition: '50% 10%',
    minWidth: 'auto',
  },
  icon: { margin: 0 },
};

interface MathForm {
  operation: string;
  questions: number;
}

const PlusMinus: FunctionComponent<any> = () => {
  const [dataRows, setDataRows] = useState([] as string[]);
  const [answers, setAnswers] = useState([] as string[]);
  const [settings, setSettings] = useState({
    questions: 100,
    operation: '+',
  } as MathForm);
  const [cmark, setCmark] = useState('');
  const print = useMediaQuery('print');

  const { control, handleSubmit } = useForm<MathForm>({
    defaultValues: {
      operation: '+',
      questions: 100,
    },
  });

  // const setDataValue = (props:{operation: string,col:number}) => {
  // const setDataValue = (props: Props) => {
  //   const datas = [];
  //   const tmpAnswers = [];

  //   for (let i = 0; i < 25; i += 1) {
  //     datas.push(

  //     );
  //   }

  //   setDataRows(datas);

  //   for (let i = 0; i < 25; i += 1) {
  //     if (props.col >= 4) {
  //       tmpAnswers.splice(tmpAnswers.length - 1 - i * 2, 0, ...tmpAnswers.splice(1 + i, 1));
  //     }
  //     if (props.col >= 3) {
  //       tmpAnswers.splice(tmpAnswers.length - 1 - i, 0, ...tmpAnswers.splice(1 + i, 1));
  //     }
  //     tmpAnswers.splice(tmpAnswers.length - 1, 0, ...tmpAnswers.splice(1 + i, 1));
  //   }

  //   setAnswers(tmpAnswers);
  // };

  // // かけ算50
  // const handleGetMultiplyData50 = () => {
  //   setCmark('x');
  //   setDataValue({
  //     operation: 'x',
  //     col: 2,
  //   });
  //   handlePrint('_x50_');
  // };

  // //かけ算
  // const handleGetMultiplyData = () => {
  //   setCmark('x');
  //   setDataValue({
  //     operation: 'x',
  //     col: 4,
  //   });
  //   handlePrint('_x100_');
  // };

  // // 割り算
  // const handleGetDivideData = () => {
  //   setCmark('÷');
  //   console.log('Divid cmark=' + cmark);
  //   setDataValue({
  //     operation: '÷',
  //     col: 2,
  //   });
  //   handlePrint('÷');
  // };

  // const handlePrint = (opType: string) => {
  //   const a = window.document.createElement('a');
  //   a.href = window.URL.createObjectURL(new Blob([answers.join('\n')], { type: 'text/plain' }));
  //   // const yyyy =new Date().getFullYear()
  //   const mo = new Date().getMonth() + 1;
  //   const dd = new Date().getDate();
  //   const hh = new Date().getHours();
  //   const mm = new Date().getMinutes();
  //   const ss = new Date().getSeconds();

  //   a.download = `answer_${opType}_${mo}${dd}${hh}${mm}${ss}.txt`;

  //   // Append anchor to body.
  //   document.body.appendChild(a);
  //   a.click();
  //   // Remove anchor from body
  //   document.body.removeChild(a);
  // };

  const onSubmit = handleSubmit((datas) => {
    setSettings(datas);

    const questions: string[] = [];
    const answers: string[] = [];

    for (let i = 0; i < datas.questions; i++) {
      let q: number[] = [];

      switch (datas.operation) {
        case '+':
          q = getPlus();
          questions.push(`${q[0]} ${datas.operation} ${q[1]} = `);
          break;
        case '-':
          q = getMinus();
          questions.push(`${q[0]} ${datas.operation} ${q[1]} = `);
          break;
        case 'x':
          q = getMultiple();
          questions.push(`${q[0]} ${datas.operation} ${q[1]} = `);
          break;
        case '÷':
          q = getDivider();
          questions.push(`${q[0]} ${datas.operation} ${q[1]} = `);
          break;
      }

      answers.push(`${i + 1}) ${q[2]}`);
    }

    setDataRows(questions);
    setAnswers(answers);

    handlePrint3(answers);
  });

  const handlePrint3 = (answers: string[]) => {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([answers.join('\n')], { type: 'text/plain' }));

    a.download = `answer_${getTimestamp()}.txt`;

    // Append anchor to body.
    document.body.appendChild(a);
    a.click();
    // Remove anchor from body
    document.body.removeChild(a);
  };

  return (
    <Box>
      {!print && (
        <form onSubmit={onSubmit}>
          <Box sx={{ display: 'flex', pt: 2 }}>
            <Controller
              name="questions"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onChange={onChange} value={value} fullWidth sx={{ mx: 2, width: 160 }}>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              )}
            />
            <Controller
              name="operation"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onChange={onChange} value={value} fullWidth sx={{ mx: 2, width: 160 }}>
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  <MenuItem value="x">x</MenuItem>
                  <MenuItem value="÷">÷</MenuItem>
                </Select>
              )}
            />

            <Button id="btnDL" type="submit" variant="outlined" color="primary">
              SHOW
            </Button>
          </Box>
        </form>
      )}
      {(() => {
        if (dataRows.length === 0) return;

        const results: any[] = [];
        const width = 25 / dataRows.length;

        for (let i = 0; i < 25 || 0; i += 1) {
          const index = (i * dataRows.length) / 25;

          results.push(
            <Box sx={{ display: 'flex', my: 1.8, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box key={`column1_${i}`} sx={{ flexGrow: 1, minWidth: width, maxWidth: width }}>
                <Box sx={{ pl: 2 }}>{`${padStart((i + 1).toString(), 2, '0')}) ${dataRows[index]}`}</Box>
              </Box>
              <Box key={`column1_${i + 1}`} sx={{ flexGrow: 1, minWidth: width, maxWidth: width }}>
                <Box sx={{ pl: 2 }}>{`${i + 26}) ${dataRows[index + 1]}`}</Box>
              </Box>
              {settings.questions === 100 && (
                <Box key={`column1_${i + 2}`} sx={{ flexGrow: 1, minWidth: width, maxWidth: width }}>
                  <Box sx={{ pl: 2 }}>{`${i + 51}) ${dataRows[index + 2]}`}</Box>
                </Box>
              )}
              {settings.questions === 100 && (
                <Box key={`column1_${i + 3}`} sx={{ flexGrow: 1, minWidth: width, maxWidth: width }}>
                  <Box sx={{ pl: 2 }}>{`${i + 76}) ${dataRows[index + 3]}`}</Box>
                </Box>
              )}
            </Box>
          );
        }

        return results;
      })()}
    </Box>
  );
};

export default PlusMinus;

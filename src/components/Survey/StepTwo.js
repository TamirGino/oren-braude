import * as React from 'react';
import Stack from '@mui/material/Stack';
import Question from '../Question/Question';
import { db } from '../../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Alert, AlertTitle, Box, Collapse, Typography } from '@mui/material';

export default function StepTwo(props) {
  const [questionsList, setQuestionsList] = React.useState([]);
  const questionsColectionRef = collection(db, 'fast');
  const [open, setOpen] = React.useState(true);
  const values = React.useRef({});

  React.useEffect(() => {
    const questionsColectionRef = collection(db, 'fast');
    const getQuestions = async () => {
      try {
        const data = await getDocs(questionsColectionRef);
        const filteredData = data.docs.map((doc) => {
          values.current[doc.id] = 1;
          return { ...doc.data(), id: doc.id };
        });

        console.log(values.current);

        setQuestionsList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getQuestions();
  }, []);

  const handleChange = (id, value) => {
    values.current[id] = value;
    const count = questionsList.reduce((prev, q) => prev + values.current[q.id], 0);
    props.updateCount(count);
  };

  return (
    <Stack spacing={2} style={{ alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <Alert id='alert-component' severity='info' icon={false} sx={{ mb: 2, justifyContent: 'center' }}>
          {/* <Alert severity="info"> */}
          {/* <AlertTitle sx={{ mt: 0 }}></AlertTitle> */}
          <Typography dir='rtl' align='center'>
            <ul style={{ paddingInlineStart: 0 }}>
              <li>
                1 = <strong>בכלל לא</strong> &nbsp; 2 = <strong>במידה מועטה</strong>
              </li>
              <li>
                3 = <strong>במידה בינונית</strong> &nbsp; 4 = <strong>במידה רבה</strong>
              </li>
              <li>
                5 = <strong>במידה רבה מאוד</strong>
              </li>
            </ul>
          </Typography>
          {/* </Alert> */}
        </Alert>
      </Box>
      {questionsList.map((q) => {
        return <Question key={q.id} question={q.question} val={values[q.id]} onChange={(_, val) => handleChange(q.id, val)}></Question>;
      })}
    </Stack>
  );
}

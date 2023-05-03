import * as React from 'react';
import Stack from '@mui/material/Stack';
import Question from '../Question/Question';
import { db } from '../../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function StepFive(props) {

  const [questionsList, setQuestionsList] = React.useState([]);
  const questionsColectionRef = collection(db, 'hunger and training');
  const values = React.useRef({});

  React.useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await getDocs(questionsColectionRef);
        const filteredData = data.docs.map((doc) => {
          values.current[doc.id] = 0;
          return { ...doc.data(), id: doc.id };
        });
        setQuestionsList(filteredData);
      } catch (err) {
        //console.log(err);
      }
    };
    getQuestions();
  }, []);

  const handleChange = (id, value) => {
    values.current[id] = value;
    const count = questionsList.reduce((prev, q) => prev + values.current[q.id], 0);
    props.updateCount(count);
    props.checkValuesArray(values.current)
  };

  return (
    <Stack spacing={2} style={{ alignItems: 'center' }}>
      {questionsList.map((q) => {
        return <Question key={q.id} question={q.question} val={values[q.id]} onChange={(_, val) => handleChange(q.id, val)}></Question>;
      })}
    </Stack>
  );
}

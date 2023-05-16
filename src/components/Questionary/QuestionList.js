import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Question from "./Question";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const collections = [
  "",
  "fast",
  "dependence on carbohydrates",
  "energy and concentration",
  "hunger and training",
];

const QuestionList = (props) => {
  const [questions, setQuestions] = useState([]);
  const collectionRef = collection(db, collections[props.collectionNum]);
  //const containerRef = React.useRef();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const snapshot = await getDocs(collectionRef);
        const questionsList = snapshot.docs.map((doc) => {
          const questionData = doc.data();
          // Assign a default value to the 'value' property if it doesn't exist
          if (
            !questionData.hasOwnProperty("value") ||
            Object.values(questionData).some((val) => val !== 0)
          ) {
            questionData.value = 0;
          }
          return questionData;
        });
        setQuestions(questionsList);
      } catch (err) {
        console.log(err);
      }
    };
    if (props.valuesArray[props.collectionNum - 1].length === 0) {
      getQuestions();
    } else {
      setQuestions(props.valuesArray[props.collectionNum - 1]);
    }
    //const container = containerRef.current;
    //window.scrollTo(0,0);
    //container.scrollTop = 0;
  }, [props.collectionNum]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].value = value;
    setQuestions(updatedQuestions);
    props.updateValues(updatedQuestions);
    props.moveForwardAndUpdate(updatedQuestions);
  };

  return (
    <Stack spacing={2} style={{ alignItems: "center" }}>
      {questions.map((question, index) => (
        <div key={index}>
          <Question
            key={question.id}
            question={question.question}
            val={question.value}
            onChange={(event, value) => handleQuestionChange(index, value)}
          />
        </div>
      ))}
    </Stack>
  );
};

export default QuestionList;

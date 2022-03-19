import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [rating, setRating] = useState(1);
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState(null);
  const [edit, setEdit] = useState("");
  const handleTextChange = (e) => {
    setDisabled(true);
    setMessage(null);
    if (e.target.value.length > 10) setDisabled(false);
    if (e.target.value.length <= 10 && e.target.value !== "")
      setMessage("Text should be at least 10 characters");
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit === "") {
      const newFeedback = {
        text: value,
        rating,
      };
      addFeedback(newFeedback);
    } else {
      edit.text = value;
      edit.rating = rating;
      setEdit("");
    }

    setRating(1);
    setValue("");
    setDisabled(true);
  };
  const deleteFeedback = (id) => {
    setFeedback(feedback.filter((item) => item.id !== id));
    setRating(1);
    setValue("");
    setDisabled(true);
    setEdit("");
  };
  const editFeedback = (id) => {
    const curFeedback = feedback.find((item) => item.id === id);
    setDisabled(false);
    setRating(curFeedback.rating);
    setValue(curFeedback.text);
    setEdit(curFeedback);
  };
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "That is the first review",
      rating: 10,
    },
    {
      id: 2,
      text: "That is the second review",
      rating: 7,
    },
    {
      id: 3,
      text: "That is the third review",
      rating: 5,
    },
  ]);
  // Feedback Form Context
  // const [disabled, setDisabled] = useState(true);
  // const [value, setValue] = useState("");
  // const [message, setMessage] = useState(null);
  // const [rating, setRating] = useState(1);
  // const handleTextChange = (e) => {
  //   setDisabled(true);
  //   setMessage(null);
  //   if (e.target.value.length > 10) setDisabled(false);
  //   if (e.target.value.length <= 10 && e.target.value !== "")
  //     setMessage("Text should be at least 10 characters");
  //   setValue(e.target.value);
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newFeedback = {
  //     text: value,
  //     rating,
  //   };
  //   setRating(1);
  //   setValue("");
  //   addFeedback(newFeedback);
  // };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        rating,
        setRating,
        value,
        disabled,
        message,
        handleSubmit,
        handleTextChange,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

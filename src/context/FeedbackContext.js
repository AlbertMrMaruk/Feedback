import { createContext, useEffect, useState } from "react";

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit === "") {
      const newFeedback = {
        text: value,
        rating,
      };
      addFeedback(newFeedback);
    } else {
      await fetch(`http://localhost:3004/feedback/${edit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          text: value,
        }),
      });
      edit.text = value;
      edit.rating = rating;
      setEdit("");
    }

    setRating(1);
    setValue("");
    setDisabled(true);
  };
  const deleteFeedback = async (id) => {
    await fetch(`/feedback/${id}`, {
      method: "DELETE",
    });
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
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    const data = await response.json();
    setFeedback([data, ...feedback]);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    fetchFeedback();
  }, []);
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id$_order=desc");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        isLoading,
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

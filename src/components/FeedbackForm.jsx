import Card from "../shared/Card";
import Button from "../shared/Button";
import RatingSelect from "./RatingSelect";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
function FeedbackForm() {
  const {
    setRating,
    rating,
    value,
    disabled,
    message,
    handleSubmit,
    handleTextChange,
  } = useContext(FeedbackContext);
  return (
    <Card reverse={false}>
      <form>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(e) => setRating(e)} selected={rating} />
        <div className="input-group">
          <input
            type="text"
            onChange={handleTextChange}
            value={value}
            placeholder="Write a review"
          />
          <Button
            version="secondary"
            isDisabled={disabled}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;

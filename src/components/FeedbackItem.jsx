import { FaEdit, FaTimes } from "react-icons/fa";
import Card from "../shared/Card";
import PropTypes from "prop-types";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  return (
    <Card reverse={false}>
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
      <button onClick={() => deleteFeedback(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => editFeedback(item.id)}>
        <FaEdit color="purple" />
      </button>
    </Card>
  );
}
FeedbackItem.propTypes = {
  item: PropTypes.object,
};
export default FeedbackItem;

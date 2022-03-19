import Card from "../shared/Card";
import { Link } from "react-router-dom";
function About() {
  return (
    <Card>
      <div className="about">
        <h1>About this Page</h1>
        <p>
          This is a React app to leave a feedback for a product or a service
        </p>
        <p>Version: 1.1.2</p>
        <Link to="/">Back To home</Link>
      </div>
    </Card>
  );
}

export default About;

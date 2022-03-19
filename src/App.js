import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import FeedbackForm from "./components/FeedbackForm";
import { FeedbackProvider } from "./context/FeedbackContext";
import AboutIconURL from "./components/AboutIconURL";
import FeedbackStats from "./components/FeedbackStats";
function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>

            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <AboutIconURL />
      </Router>
    </FeedbackProvider>
  );
}

export default App;

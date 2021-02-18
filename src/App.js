import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Unsplash from "./Unsplash/Unsplash";
import Navbar from "./Navbar/Navbar";

function App() {

  return (
    <Router>
      <Navbar />
      <Route exact path="/">
        <Unsplash />
      </Route>
    </Router>
  );

}

export default App;

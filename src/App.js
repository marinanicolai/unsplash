import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Unsplash from "./Unsplash/Unsplash";

function App() {

  return (
    <Router>
      <Route exact path="/">
        <Unsplash />
      </Route>
    </Router>
  );

}

export default App;

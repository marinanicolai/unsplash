import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Unsplash from "./Unsplash/Unsplash";
import Navbar from "./Navbar/Navbar";
import PhotoPage from "./Photo/PhotoPage";

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Unsplash />
        </Route>
        <Switch>
          <Route path="/photo/:id">
            <PhotoPage />
          </Route>
        </Switch>
      </Switch>
    </Router>
  );

}

export default App;

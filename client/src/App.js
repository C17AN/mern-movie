import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoviesInsert from "./pages/MoviesInsert";
import MoviesList from "./pages/MoviesList";
import MoviesUpdate from "./pages/MoviesUpdate";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/movies/list" exact component={MoviesList}></Route>
          <Route path="/movies/create" exact component={MoviesInsert}></Route>
          <Route
            path="/movies/update/:id"
            exact
            component={MoviesUpdate}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

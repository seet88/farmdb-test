import "./App.css";
import EntriesList from "./components/library/EntriesList";
import SingleEntryPage from "./components/library/SingleEntryPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Fragment>
              <EntriesList />
            </Fragment>
          )}
        />
        <Route exact path="/library/:libraryId" component={EntriesList} />
        <Route
          exact
          path="/library/:libraryId/entry/:entryId"
          component={SingleEntryPage}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

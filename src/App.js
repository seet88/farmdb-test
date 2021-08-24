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
import LibrariesList from "./components/library/LibrariesList";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Fragment>
              <LibrariesList />
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

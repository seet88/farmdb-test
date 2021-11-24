import "./App.css";
import EntriesList from "./components/library/EntriesList";
import SingleEntryPage from "./components/library/SingleEntryPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Fragment, useEffect } from "react";
import LibrariesList from "./components/library/LibrariesList";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { updateAllLibraries } from "./store/templateLibraries-slice";
import {
  GET_LIBRARIES_TEMPLATES,
  GET_LIBRARIES_DATA_PG,
} from "./API/graphQLTypes";
import {
  updateAllLibrariesData,
  updateAllLibrariesDataFromStorage,
} from "./store/librariesData-slice";
import TemplateLibraryCreator from "./components/templates/TemplateLibraryCreator";
import MainTopHeader from "./UI/MainTopHeader";
import Configuration from "./components/configuration/Configuration";
import { updateConfiguration } from "./store/configuration-slice";

function App() {
  console.log("main function APP");
  const {
    loading: loadingDataPg,
    error: errorDataPg,
    data: dataPg,
  } = useQuery(GET_LIBRARIES_DATA_PG);
  const { loading, error, data } = useQuery(GET_LIBRARIES_TEMPLATES);
  const dispatch = useDispatch();
  // const { storageType } = useSelector((state) => selectConfiguration(state));

  useEffect(() => {
    console.log("read data from localStorage");
    const configJson = localStorage.getItem("config");
    dispatch(updateConfiguration(JSON.parse(configJson)));
    const templatesJson = localStorage.getItem("templates");
    dispatch(updateAllLibraries(JSON.parse(templatesJson)));
    const dataJson = localStorage.getItem("libsData");
    dispatch(updateAllLibrariesDataFromStorage(JSON.parse(dataJson)));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) console.error("error In GET_LIBRARIES_TEMPLATES", error);
    else if (!loading) dispatch(updateAllLibraries(data?.librariesTemplates));
  }, [data, dispatch, loading, error]);

  useEffect(() => {
    if (errorDataPg)
      console.error("error In GET_LIBRARIES_DATA_PG", errorDataPg);
    else if (!loadingDataPg)
      // dispatch(updateAllLibrariesRecords(dataData?.librariesData));
      dispatch(updateAllLibrariesData(dataPg?.librariesDataPG));
    // console.log(dataPg);
  }, [loadingDataPg, dataPg, dispatch, errorDataPg]);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Fragment>
              <MainTopHeader />
              <LibrariesList />
            </Fragment>
          )}
        />
        <Route exact path="/library" component={EntriesList} />
        <Route exact path="/library/entry/" component={SingleEntryPage} />
        <Route exact path="/creator" component={TemplateLibraryCreator} />
        <Route exact path="/configuration" component={Configuration} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

import "./App.css";
import EntriesList from "./components/library/EntriesList";
import SingleEntryPage from "./components/library/SingleEntryPage";

function App() {
  return (
    <div className="App">
      <SingleEntryPage />
      <EntriesList />
    </div>
  );
}

export default App;

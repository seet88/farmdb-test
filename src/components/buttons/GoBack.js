import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearState } from "../../store/editedEntry-slice";
import classes from "./GoBack.module.css";

const GoBack = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const goBackHandler = () => {
    if (props?.clearEntryStore) {
      console.log("clear state");
      dispatch(clearState());
    }
    history.goBack();
  };
  return (
    <button onClick={goBackHandler} className={classes.goBack}>
      &larr;
    </button>
  );
};

export default GoBack;

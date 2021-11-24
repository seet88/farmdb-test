import { Fragment, useState } from "react";
import classes from "./SelectField.module.css";

const SelectField = ({ setOptions, options }) => {
  const [points, setPoints] = useState(options || []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [pointName, setPointName] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const addPointHandler = (e) => {
    e.preventDefault();
    const point = {
      default: points.find((point) => point.default) ? false : isDefault,
      index: points.length + 1,
      value: pointName,
    };
    if (pointName) {
      const newPoints = [...points, point];
      setPoints([...points, point]);
      setOptions(newPoints);
    }
    setPointName();
    setShowAddModal(false);
    setIsDefault(false);
  };
  const removePointFromListHandler = (e, index) => {
    e.preventDefault();
    const newPointsList = [...points];
    newPointsList.splice(index, 1);
    setPoints(newPointsList);
  };

  console.log("points", points, "options", options);

  return (
    <Fragment>
      <div>
        Point list:
        <ul className={classes.ul}>
          {points.map((point, idx) => {
            return (
              <li key={idx} className={classes.list}>
                {point.value} {point.default ? "✔" : null}
                <button onClick={(e) => removePointFromListHandler(e, idx)}>
                  &#10005;
                </button>
              </li>
            );
          })}
        </ul>
        {showAddModal && (
          <div className={classes.modal}>
            <header className={classes.header}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                }}
              >
                &larr;
              </button>
              <button onClick={addPointHandler}>&#10003;</button>
            </header>
            <label htmlFor="pointName">Point name:</label>
            <input
              type="text"
              id="pointName"
              defaultValue={pointName}
              onChange={(e) => setPointName(e.target.value)}
            ></input>
            <label htmlFor="isDefault">Is point Default?</label>
            <input
              type="checkbox"
              id="isDefault"
              defaultChecked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            ></input>
          </div>
        )}
        <button
          onClick={(e) => {
            setShowAddModal(true);
            e.preventDefault();
          }}
        >
          Add
        </button>
        {showAddModal && <div className={classes.backdrop}></div>}
      </div>
    </Fragment>
  );
};

export default SelectField;

import React, { Fragment } from "react";

const CAudio = ({ field }) => {
  if (!field?.value) return <div></div>;
  const addresses = String(field.value).split("\n");
  return (
    <Fragment>
      {addresses.map((src, idx) => (
        <audio controls key={idx}>
          <source src={src} type="audio/ogg" />
        </audio>
      ))}
    </Fragment>
  );
};

export default CAudio;

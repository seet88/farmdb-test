import { useScriptField } from "../../hooks/useField";

const CScript = ({ mode, field, columnTemplate }) => {
  console.log("In script");
  const { status, value, error } = useScriptField(
    columnTemplate?.options[0]?.script,
    columnTemplate?.type
  );
  // console.log(func());

  if (status === "success") return <div>{value}</div>;
  else return <div> {error} </div>;
};

export default CScript;

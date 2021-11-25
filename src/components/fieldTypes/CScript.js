import { useScriptField } from "../../hooks/useField";

const CScript = ({ mode, field, columnTemplate }) => {
  const { status, value, error } = useScriptField(
    columnTemplate?.options[0]?.script,
    columnTemplate?.type
  );

  if (status === "success") return <div>{value}</div>;
  else return <div> {error} </div>;
};

export default CScript;

export function isNotEmpty(value) {
  if (!value) return false;
  if (value === "") return false;
  if (value === false) return false;
  if (value === null) return false;
  if (value === undefined) return false;
  if (value === "null") return false;
  value = value + " "; // check for a bunch of whitespace
  if (value.replace(/^\s\s*/, "").replace(/\s\s*$/, "") === "") return false;
  return true;
}

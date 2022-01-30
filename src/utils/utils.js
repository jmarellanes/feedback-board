/* =====================================================================
    -> SHOW ERRORS IN FORMS
===================================================================== */
export function errorMessage(obj, name, type, message) {
  return (
    obj[name] && obj[name]?.type === type && <span role='alert'>{message}</span>
  );
}

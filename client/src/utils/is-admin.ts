export function isAdmin() {
  const { isAdmin } = JSON.parse(
    localStorage.getItem("user") || `{"isAdmin":false}`
  );
  return isAdmin;
}

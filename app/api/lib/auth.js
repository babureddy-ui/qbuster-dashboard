export const CREDENTIALS = {
  user_name: "admin",
  password: "admin123",
};

export const SESSION_COOKIE = "session";

export function isValidCredentials(userName, password) {
  return (
    userName === CREDENTIALS.user_name && password === CREDENTIALS.password
  );
}

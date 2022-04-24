
export class LoginError implements Error {
  message = "Invalid email or password";
  name = "AuthError";
}

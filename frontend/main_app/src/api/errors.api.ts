export class ApiGetError implements Error {
  message = "Could not get data";
  name = "ApiGetError";
}

export class LoginError implements Error {
  message = "Invalid email or password";
  name = "LoginError";
}

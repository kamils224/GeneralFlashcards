export class ApiGetError implements Error {
  message = "Could not get data";
  name = "ApiGetError";
}

export class ApiCreateError implements Error {
  message = "Could not create data";
  name = "ApiGetError";
}

export class ApiRemoveError implements Error {
  message = "Could not remove data";
  name = "ApiRemoveError";
}

export class LoginError implements Error {
  message = "Invalid email or password";
  name = "LoginError";
}

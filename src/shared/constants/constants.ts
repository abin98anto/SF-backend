const PORT = process.env.PORT || 3000;

export const userMessages = {
  EMAIL_EXISTS: "Email already in use",
  INVALID_CRED: "Invalid Credentials",
  LOGIN_SUCCESS: "Login successful",
  TOKEN_NOT_FOUND: "Token not found",
  INVALID_TOKEN: "Invalid or expired token",
  ACCESS_REFRESHED: "Access token refreshed successfully",
  NO_COOKIES: "No Cookies found!",
  LOGOUT_SUCCESS: "Logout Successful",
  USER_NOT_FOUND: "User not found! Try signing up again.",
};

export const otpMessages = {
  OTP_SENT: `OTP send to the mail : `,
  OTP_SENDING_ERROR: "Error sending OTP.",
  OTP_EXPIRED: "The OTP has expired. Please request a new one.",
  USER_VERFIED: "OTP verification successful. User is now active.",
  USER_NOT_FOUND: "User not found! Try signing up again.",
  WRONG_OTP: "The OTP you entered is incorrect.",
};

export const databaseMessages = {
  CONNECTION_SUCCESSFUL: "Database connection successful.",
  CONNECTION_ERROR: "Database connection error:",
  CONNECTION_DISCONNECTED: "Database disconnected.",
};

export const miscMessages = {
  SERVER_STARTED: `Server is running on http://localhost:${PORT}`,
  UNKNOWN_ERROR: "An unknown error occurred",
  ERROR: "An Error occured: ",
  ERROR_OBJECT: "And Error in the Error Object Catch!",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  ACCESS_DENIED: "ACCESS DENIED!",
};

export const jwtMessages = {};

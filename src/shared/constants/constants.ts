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
  DEFAULT_PICTURE:
    "https://res.cloudinary.com/dqjjysikb/image/upload/v1733894416/casual-life-3d-boy-sitting-at-the-desk-with-open-book_9_q7m5yv.jpg",
  DEFAULT_PIC2:
    "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109?f=y",
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
  USER_ENROLL_ERROR: "User is already enrolled in this course.",
  ORDER_ADD_FAIL: "error creating order",
  GET_ORDER_FAIL: "error getting all orders",
  USER_ORDER_FETCH_FAIL: "error getting orders of the user",
  SUBS_ADD_FAIL: "error creating new subscription plan",
  SUBS_DEL_FAIL: "error deleting subscription",
  SUBS_FETCH_FAIL: "error fetching all subscriptions",
  SUBS_DETAILS_FAIL: "error getting subscription details",
  SUBS_UPDATE_FAIL: "error updating subscription",
  TUTOR_UPDATE_USE_CASE_ERROR: "Error in tutor profile updaet use-case:",
  FORGOT_PASSWORD_USECASE_ERR: "Error in forgot password use case",
  FORGOT_PASS_CONTROLLER_ERR:
    "Error sending otp in forgot password control function",
  PASS_CHANGE_SUCC: "Password Change Successful!",
  PASS_CHANGE_FAIL: "Password Change Failed!",
  SET_PASS_CONTROLLER_ERR:
    "Error verifying and setting new password - controller",
};

export const corsDetails = {
  FE_URL: "http://localhost:5173",
  ERROR: "Not allowed by CORS",
};

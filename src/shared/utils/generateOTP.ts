export const generateOTP = (length = 6): { otp: string; expiresAt: Date } => {
  const otp = Math.random().toString().slice(-length);
  const expiresAt = new Date(Date.now() + 60 * 1000);
  return { otp, expiresAt };
};

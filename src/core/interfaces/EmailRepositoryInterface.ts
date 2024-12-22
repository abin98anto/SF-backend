export interface EmailRepositoryInterface {
  sendOTP(email: string, otp: string): Promise<void>;
  sendDenialEmail(email: string, name: string): Promise<void>;
}

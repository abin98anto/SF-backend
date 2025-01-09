import { OAuth2Client } from "google-auth-library";
import { IGoogleAuthService } from "../../core/interfaces/GoogleAuthInterface";
import { User } from "../../core/entities/User";

export class GoogleAuthService implements IGoogleAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(token: string): Promise<User> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new Error("Invalid token payload");

      return {
        email: payload.email!,
        name: payload.name!,
      };
    } catch (error) {
      throw new Error("Failed to verify Google token");
    }
  }
}

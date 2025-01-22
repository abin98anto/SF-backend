import { UserRepository } from "../../../infrastructure/repositories/UserRepository";

export const handleExpiredSubscriptions = async (): Promise<void> => {
  try {
    const now = new Date();
    const userRepository = new UserRepository();

    // Find users with expired subscriptions
    const expiredUsers = await userRepository.findExpiredSubscriptions(now);
    
    // Update their subscription status
    for (const user of expiredUsers) {
      await userRepository.markSubscriptionAsCancelled(user._id, now);
    }

    console.log(
      `Checked and updated ${expiredUsers.length} expired subscriptions.`
    );
  } catch (error) {
    console.error("Error handling expired subscriptions:", error);
  }
};

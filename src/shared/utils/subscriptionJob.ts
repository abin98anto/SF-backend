import cron from "node-cron";
import { handleExpiredSubscriptions } from "../../core/use-cases/Subscription/ExpiredSubsUseCase";

const subscriptionJob = cron.schedule("0 0 * * *", async () => {
  console.log("Running subscription expiration check...");
  await handleExpiredSubscriptions();
  console.log("Subscription expiration check completed.");
});

export default subscriptionJob;

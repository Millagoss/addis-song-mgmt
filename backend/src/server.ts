import app from "./app";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";

(async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`API running on port ${ENV.PORT}`);
  });
})();

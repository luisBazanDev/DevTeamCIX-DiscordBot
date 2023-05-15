import mongoose from "mongoose";

export default async function () {
  try {
    console.log("📅 Database >> MongoDB is connecting...");
    mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("❌ Database >> Error");
    console.error(err);
  }

  mongoose.connection.once("open", () => {
    console.log("📅 Database >> MongoDB is ready!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("📅 Database >> Error");
    console.error(err);
  });
}

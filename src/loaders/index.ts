import expressLoader from "./express";
import connection from "../configurations/database";

export default async ({ expressApp }: any) => {
  await expressLoader({ app: expressApp });
  await connectToDatabase();
};

async function connectToDatabase(): Promise<void> {
  try {
    await connection.sync();
    console.log("Database successfully connected");
  } catch (err) {
    console.log("Error", err);
  }
}

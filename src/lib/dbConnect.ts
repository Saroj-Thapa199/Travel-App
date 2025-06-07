import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect

// mongodb+srv://sarojthapa199:sarojthapa199@cluster0.7l2u89z.mongodb.net/travelapp?retryWrites=true&w=majority&appName=Cluster0
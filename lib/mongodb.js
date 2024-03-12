import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
	throw new Error("Please add your Mongo URI to .env");
}

const connectToMongoDB = async () => {
	if (mongoose.connection.readyState === 0) {
		try {
			await mongoose.connect(uri);
			console.log("Connected to MongoDB");
		} catch (err) {
			console.error("Error connecting to MongoDB", err);
		}
	}
};

connectToMongoDB();

export default mongoose;

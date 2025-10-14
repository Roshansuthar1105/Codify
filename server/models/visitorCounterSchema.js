import mongoose from "mongoose";

const visitorCounterSchema = new mongoose.Schema({
  name: { type: String, default: "visitors", unique: true }, //identifies the counter
  count: { type: Number, default: 0 },//stores total count
});

const Visitor = mongoose.model("Visitor", visitorCounterSchema);
export default Visitor;


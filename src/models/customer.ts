import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  line1: { type: String, required: true },
  line2: { type: String, required: true },
  postcode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: addressSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Customer = mongoose.model("Customer", customerSchema);

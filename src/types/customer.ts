import mongoose from "mongoose";

export interface Address {
  line1: string;
  line2: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
}

export interface Customer {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  createdAt: Date;
}

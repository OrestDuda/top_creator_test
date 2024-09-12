import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

const generateUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  address: {
    line1: faker.location.streetAddress(),
    line2: faker.location.secondaryAddress(),
    postcode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  },
  createdAt: new Date(),
});

export const generateAndInsertUsers = async () => {
  const customersCollection = mongoose.connection.collection("customers");

  setInterval(async () => {
    const numberOfUsers = Math.floor(Math.random() * 10) + 1;
    const users = Array.from({ length: numberOfUsers }, generateUser);

    await customersCollection.insertMany(users);
    console.log(`${numberOfUsers} users added to DB`);
  }, 200);
};

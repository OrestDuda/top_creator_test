import { ChangeStreamDocument, Collection, ResumeToken } from "mongodb";
import mongoose from "mongoose";
import { anonymizeCustomer } from "./anonymizer";
import { Customer } from "../types/customer";

interface ResumeTokenDoc {
  token: ResumeToken;
}

const customersCollection: Collection<Customer> =
  mongoose.connection.collection("customers");
const anonymisedCollection: Collection<Customer> =
  mongoose.connection.collection("customers_anonymised");
const resumeTokenCollection: Collection<ResumeTokenDoc> =
  mongoose.connection.collection("resume_tokens");

export const listenForChanges = async (): Promise<void> => {
  const lastTokenDoc = await resumeTokenCollection.findOne({});

  let changeStreamOptions: { resumeAfter?: ResumeToken } = {};

  if (lastTokenDoc && lastTokenDoc.token) {
    console.log("Resuming from last token.");
    changeStreamOptions.resumeAfter = lastTokenDoc.token;
  }

  const changeStream = customersCollection.watch([], changeStreamOptions);

  changeStream.on("change", async (change: ChangeStreamDocument<Customer>) => {
    if (
      change.operationType === "insert" ||
      change.operationType === "update"
    ) {
      const customer = await customersCollection.findOne({
        _id: change.documentKey._id,
      });

      if (customer) {
        const anonymizedCustomer = anonymizeCustomer(customer);

        const result = await anonymisedCollection.updateOne(
          { _id: anonymizedCustomer._id },
          { $set: anonymizedCustomer },
          { upsert: true }
        );

        if (result.upsertedCount > 0) {
          console.log(`Anonymized customer ${anonymizedCustomer._id} added.`);
        }

        await resumeTokenCollection.updateOne(
          {},
          { $set: { token: change._id } },
          { upsert: true }
        );
      }
    }
  });

  console.log("Listening for changes in customers.");
};

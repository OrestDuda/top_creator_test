import { Customer } from "../types/customer";

export const anonymizeField = (field: string): string => {
  return field
    .split("")
    .map(() => Math.random().toString(36).charAt(2))
    .join("")
    .substring(0, 8);
};

export const anonymizeCustomer = (customer: Customer) => {
  return {
    ...customer,
    firstName: anonymizeField(customer.firstName),
    lastName: anonymizeField(customer.lastName),
    email:
      anonymizeField(customer.email.split("@")[0]) +
      "@" +
      customer.email.split("@")[1],
    address: {
      ...customer.address,
      line1: anonymizeField(customer.address.line1),
      line2: anonymizeField(customer.address.line2),
      postcode: anonymizeField(customer.address.postcode),
    },
  };
};

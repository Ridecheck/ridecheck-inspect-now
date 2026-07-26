export type EmailAddOn = {
  name: string;
  price: number;
};

export type BookingEmailData = {
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicle: string;
  suburb: string;
  state: string;
  /** e.g. "ASAP — next available" or "Thursday 30 July — Morning (8am – 12pm)" */
  timing: string;
  packageName: string;
  packagePrice: number;
  addOns: EmailAddOn[];
  total: number;
  notes?: string;
};

export const currency = (n: number) =>
  `$${n.toLocaleString("en-AU", { minimumFractionDigits: 0 })}`;

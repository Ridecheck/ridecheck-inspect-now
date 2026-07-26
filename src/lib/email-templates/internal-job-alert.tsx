import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { currency, type BookingEmailData } from "./types";
import logoAsset from "@/assets/ridecheck-logo.png.asset.json";

const SITE_ORIGIN = "https://project--529efd4a-ab2c-4e2e-b1d6-fb02cbfb637e.lovable.app";
const LOGO_URL = `${SITE_ORIGIN}${logoAsset.url}`;


const RED = "#e11d2e";
const INK = "#111114";
const MUTED = "#5c5c66";
const LINE = "#e6e6ea";
const FONT = "Poppins, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const main = { backgroundColor: "#f4f4f6", fontFamily: FONT, margin: 0 };
const container = {
  backgroundColor: "#ffffff",
  maxWidth: "560px",
  margin: "0 auto",
  padding: "0",
};
const pad = { padding: "0 28px" };
const header = { padding: "22px 28px 16px", backgroundColor: INK };
const headerTitle = {
  margin: 0,
  fontSize: "13px",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "#ffffff",
  fontWeight: 700,
};
const headerRef = { margin: "6px 0 0", fontSize: "22px", fontWeight: 700, color: RED };
const label = {
  margin: "0 0 2px",
  fontSize: "11px",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: MUTED,
  fontWeight: 600,
};
const value = { margin: "0 0 14px", fontSize: "15px", color: INK, fontWeight: 600 };
const sectionTitle = {
  margin: "22px 0 12px",
  fontSize: "13px",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: INK,
  fontWeight: 700,
};

const Field = ({ l, v }: { l: string; v: string }) => (
  <>
    <Text style={label}>{l}</Text>
    <Text style={value}>{v}</Text>
  </>
);

export const InternalJobAlertEmail = ({
  reference,
  customerName,
  customerEmail,
  customerPhone,
  vehicle,
  suburb,
  state,
  timing,
  packageName,
  packagePrice,
  addOns,
  total,
  notes,
}: BookingEmailData) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New job ${reference} — ${suburb} ${state} — ${timing}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={{ padding: "20px 28px 14px", backgroundColor: "#ffffff" }}>
          <Img
            src={LOGO_URL}
            alt="RideCheck"
            width="130"
            style={{ display: "block", border: 0 }}
          />
        </Section>
        <Section style={header}>
          <Text style={headerTitle}>New booking — dispatch required</Text>
          <Text style={headerRef}>{reference}</Text>
        </Section>


        <Section style={{ ...pad, paddingTop: "22px" }}>
          <Text style={sectionTitle}>Job</Text>
          <Field l="Location" v={`${suburb}, ${state}`} />
          <Field l="Timing requested" v={timing} />
          <Field l="Vehicle" v={vehicle} />

          <Hr style={{ borderColor: LINE, margin: "6px 0 0" }} />

          <Text style={sectionTitle}>Customer</Text>
          <Field l="Name" v={customerName} />
          <Text style={label}>Phone</Text>
          <Text style={value}>
            <Link href={`tel:${customerPhone.replace(/\s/g, "")}`} style={{ color: RED }}>
              {customerPhone}
            </Link>
          </Text>
          <Text style={label}>Email</Text>
          <Text style={value}>
            <Link href={`mailto:${customerEmail}`} style={{ color: RED }}>
              {customerEmail}
            </Link>
          </Text>

          <Hr style={{ borderColor: LINE, margin: "6px 0 0" }} />

          <Text style={sectionTitle}>Order</Text>
          <Field l="Package" v={`${packageName} — ${currency(packagePrice)}`} />
          <Field
            l="Add-ons"
            v={
              addOns.length
                ? addOns.map((a) => `${a.name} — ${currency(a.price)}`).join("  ·  ")
                : "None"
            }
          />
          <Field l="Amount paid" v={`${currency(total)} (Stripe, paid)`} />
          <Field l="Customer notes" v={notes?.trim() ? notes : "None"} />
        </Section>

        <Section style={{ ...pad, padding: "8px 28px 28px", borderTop: `1px solid ${LINE}` }}>
          <Heading as="h3" style={{ ...sectionTitle, margin: "16px 0 8px" }}>
            Action
          </Heading>
          <Text style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: MUTED }}>
            Assign an inspector and SMS the customer with the name and ETA. Report due
            to the customer the same day.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default InternalJobAlertEmail;

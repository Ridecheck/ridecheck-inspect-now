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
const FONT =
  "Poppins, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const main = { backgroundColor: "#f4f4f6", fontFamily: FONT, margin: 0 };
const container = {
  backgroundColor: "#ffffff",
  maxWidth: "560px",
  margin: "0 auto",
  padding: "0",
};
const pad = { padding: "0 28px" };
const wordmarkWrap = { padding: "26px 28px 18px" };
const wordmark = {
  margin: 0,
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: INK,
};
const bar = { height: "4px", backgroundColor: RED, fontSize: "1px", lineHeight: "4px" };
const h1 = {
  margin: "26px 0 10px",
  fontSize: "26px",
  lineHeight: "1.2",
  fontWeight: 700,
  color: INK,
  letterSpacing: "-0.02em",
};
const p = { margin: "0 0 14px", fontSize: "15px", lineHeight: "1.6", color: MUTED };
const card = {
  border: `1px solid ${LINE}`,
  borderRadius: "14px",
  padding: "18px 18px 6px",
  margin: "22px 0 8px",
};
const rowLabel = {
  margin: "0 0 2px",
  fontSize: "11px",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: MUTED,
  fontWeight: 600,
};
const rowValue = { margin: "0 0 14px", fontSize: "15px", color: INK, fontWeight: 600 };
const totalRow = {
  margin: "0",
  padding: "14px 0",
  fontSize: "17px",
  fontWeight: 700,
  color: INK,
};
const stepNum = {
  margin: "0 0 2px",
  fontSize: "12px",
  fontWeight: 700,
  color: RED,
  letterSpacing: "0.06em",
};
const stepText = { margin: "0 0 16px", fontSize: "14px", lineHeight: "1.55", color: MUTED };
const footer = {
  margin: "0",
  fontSize: "12px",
  lineHeight: "1.6",
  color: MUTED,
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value}</Text>
  </>
);

export const BookingConfirmationEmail = ({
  reference,
  customerName,
  customerPhone,
  vehicle,
  suburb,
  state,
  timing,
  packageName,
  packagePrice,
  addOns,
  total,
}: BookingEmailData) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      {`Your RideCheck inspection is booked — ${reference}`}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={wordmarkWrap}>
          <Text style={wordmark}>
            Ride<span style={{ color: RED }}>Check</span>
          </Text>
        </Section>
        <Section style={bar} />

        <Section style={pad}>
          <Heading style={h1}>Your inspection is booked</Heading>
          <Text style={p}>
            {customerName ? `Thanks ${customerName.split(" ")[0]}. ` : "Thanks. "}
            We're matching you with an independent inspector now. You'll get an SMS
            on {customerPhone} with their name and ETA before they head out.
          </Text>

          <Section style={card}>
            <Row label="Reference" value={reference} />
            <Row label="Vehicle" value={vehicle} />
            <Row label="Location" value={`${suburb}, ${state}`} />
            <Row label="Timing" value={timing} />
            <Row label="Package" value={`${packageName} — ${currency(packagePrice)}`} />
            {addOns.length > 0 && (
              <Row
                label="Add-ons"
                value={addOns
                  .map((a) => `${a.name} — ${currency(a.price)}`)
                  .join("  ·  ")}
              />
            )}
            <Hr style={{ borderColor: LINE, margin: "2px 0 0" }} />
            <Text style={totalRow}>Total paid&nbsp;&nbsp;{currency(total)}</Text>
          </Section>

          <Heading as="h2" style={{ ...h1, fontSize: "18px", margin: "28px 0 14px" }}>
            What happens next
          </Heading>

          <Text style={stepNum}>STEP 1</Text>
          <Text style={stepText}>
            We assign the closest available inspector and confirm the exact arrival
            time with you and the seller by SMS.
          </Text>

          <Text style={stepNum}>STEP 2</Text>
          <Text style={stepText}>
            Your inspector attends the vehicle — mechanical check, diagnostic scan,
            road test and photos.
          </Text>

          <Text style={stepNum}>STEP 3</Text>
          <Text style={stepText}>
            Your digital report lands in your inbox the same day, usually within two
            to three hours, followed by a call from the mechanic who inspected the car.
          </Text>

          <Hr style={{ borderColor: LINE, margin: "24px 0 18px" }} />

          <Text style={{ ...p, marginBottom: "6px", color: INK, fontWeight: 600 }}>
            Need to change something?
          </Text>
          <Text style={p}>
            Call or text us on{" "}
            <Link href="tel:0424287403" style={{ color: RED, fontWeight: 600 }}>
              0424 287 403
            </Link>
            , or just reply to this email.
          </Text>
        </Section>

        <Section style={{ ...pad, padding: "18px 28px 30px", borderTop: `1px solid ${LINE}` }}>
          <Text style={footer}>
            RideCheck Vehicle Inspections — mobile pre-purchase inspections across
            Melbourne and Sydney.
          </Text>
          <Text style={{ ...footer, marginTop: "8px" }}>
            Independent by design. We have no dealer affiliations, so the report you
            get is the truth about the car.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default BookingConfirmationEmail;

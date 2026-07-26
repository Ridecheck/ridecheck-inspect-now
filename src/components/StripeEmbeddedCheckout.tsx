import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createBookingCheckout } from "@/utils/payments.functions";

interface StripeEmbeddedCheckoutProps {
  amountInCents: number;
  description: string;
  customerEmail?: string;
  returnUrl?: string;
}

export function StripeEmbeddedCheckout({
  amountInCents,
  description,
  customerEmail,
  returnUrl,
}: StripeEmbeddedCheckoutProps) {
  const fetchClientSecret = async (): Promise<string> => {
    const result = await createBookingCheckout({
      data: {
        amountInCents,
        description,
        customerEmail,
        returnUrl: returnUrl || window.location.href,
        environment: getStripeEnvironment(),
      },
    });
    if ("error" in result) throw new Error(result.error);
    if (!result.clientSecret) throw new Error("Stripe did not return a client secret");
    return result.clientSecret;
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

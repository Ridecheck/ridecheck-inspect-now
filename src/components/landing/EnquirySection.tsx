import { useState } from "react";
import { ArrowRight, Check, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const enquiryOptions = [
  { value: "looking", label: "I'm still looking for a car" },
  { value: "found", label: "I've found a car" },
  { value: "inspection", label: "Which inspection should I choose?" },
  { value: "other", label: "Something else" },
] as const;

const enquirySchema = z.object({
  topic: z.enum(["looking", "found", "inspection", "other"], {
    required_error: "Choose what you need help with.",
  }),
  car: z.string().trim().max(120, "Keep car details under 120 characters."),
  name: z.string().trim().min(1, "Enter your name.").max(100, "Keep your name under 100 characters."),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s-]{8,24}$/, "Enter a valid mobile number."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  message: z.string().trim().max(1000, "Keep your message under 1,000 characters."),
});

type EnquiryData = z.infer<typeof enquirySchema>;
type FieldErrors = Partial<Record<keyof EnquiryData, string>>;

const initialData: EnquiryData = {
  topic: "looking",
  car: "",
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function EnquirySection() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [data, setData] = useState<EnquiryData>(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});

  const updateField = <K extends keyof EnquiryData>(field: K, value: EnquiryData[K]) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      window.setTimeout(() => {
        setData(initialData);
        setErrors({});
        setSent(false);
      }, 200);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = enquirySchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof EnquiryData | undefined;
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSent(true);
  };

  return (
    <>
      <section className="bg-haze">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid items-center gap-8 rounded-xl border border-border bg-background px-6 py-8 shadow-soft sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:px-10">
            <div>
              <p className="label-caps text-signal">Not ready to book yet?</p>
              <h2 className="mt-3 max-w-xl text-2xl font-extrabold text-ink sm:text-3xl">
                Have a question about an inspection?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Whether you're still looking for a car or already have one in mind, ask us anything. You'll get a straight answer from our team.
              </p>
              <Button
                size="lg"
                className="mt-6 h-12 rounded-md px-6 text-base font-semibold"
                onClick={() => setOpen(true)}
              >
                Ask us a question
                <ArrowRight aria-hidden />
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: MessageCircle, title: "Expert advice", text: "Talk to a qualified inspector." },
                { icon: ShieldCheck, title: "No obligation", text: "Get the information you need." },
                { icon: Clock3, title: "Quick response", text: "We'll get back to you soon." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0 sm:border-b-0 sm:pb-0 lg:border-b lg:pb-3 lg:last:border-0 lg:last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-signal">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{title}</p>
                    <p className="text-xs text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-xl border-border p-0 shadow-lift">
          {sent ? (
            <div className="px-6 py-10 text-center sm:px-10">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-protected-soft text-protected">
                <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
              </span>
              <DialogTitle className="mt-5 text-2xl font-extrabold text-ink">
                Thanks for reaching out!
              </DialogTitle>
              <DialogDescription className="mx-auto mt-3 max-w-sm leading-relaxed">
                This is a preview of the enquiry experience, so your details haven't been sent. The live version can notify the RideCheck team.
              </DialogDescription>
              <DialogClose asChild>
                <Button size="lg" className="mt-7 h-12 w-full text-base font-semibold">
                  Close
                </Button>
              </DialogClose>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="px-5 py-6 sm:px-7">
              <div className="pr-7 text-center">
                <p className="label-caps text-signal">Send an enquiry</p>
                <DialogTitle className="mt-2 text-2xl font-extrabold text-ink">
                  Have a question?
                </DialogTitle>
                <DialogDescription className="mt-2">
                  Tell us a little about what you're looking at and we'll point you in the right direction.
                </DialogDescription>
              </div>

              <fieldset className="mt-6">
                <legend className="text-sm font-bold text-ink">What can we help with?</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {enquiryOptions.map((option) => (
                    <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm text-ink has-[:checked]:border-signal has-[:checked]:bg-accent">
                      <input
                        type="radio"
                        name="topic"
                        value={option.value}
                        checked={data.topic === option.value}
                        onChange={() => updateField("topic", option.value)}
                        className="h-4 w-4 accent-primary"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                {errors.topic ? <p className="mt-1 text-xs text-destructive">{errors.topic}</p> : null}
              </fieldset>

              {data.topic === "found" || data.topic === "inspection" ? (
                <Field label="Car details" error={errors.car}>
                  <Input
                    value={data.car}
                    onChange={(event) => updateField("car", event.target.value.slice(0, 120))}
                    maxLength={120}
                    placeholder="e.g. 2021 Toyota Corolla"
                    className="h-11"
                  />
                </Field>
              ) : null}

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Your name" error={errors.name}>
                  <Input
                    autoComplete="name"
                    value={data.name}
                    onChange={(event) => updateField("name", event.target.value.slice(0, 100))}
                    maxLength={100}
                    placeholder="Enter your name"
                    className="h-11"
                    aria-invalid={Boolean(errors.name)}
                  />
                </Field>
                <Field label="Mobile number" error={errors.phone}>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    value={data.phone}
                    onChange={(event) => updateField("phone", event.target.value.slice(0, 24))}
                    maxLength={24}
                    placeholder="04xx xxx xxx"
                    className="h-11"
                    aria-invalid={Boolean(errors.phone)}
                  />
                </Field>
              </div>

              <Field label="Email address" error={errors.email}>
                <Input
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(event) => updateField("email", event.target.value.slice(0, 254))}
                  maxLength={254}
                  placeholder="you@example.com"
                  className="h-11"
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>

              <Field label="Your message (optional)" error={errors.message}>
                <Textarea
                  value={data.message}
                  onChange={(event) => updateField("message", event.target.value.slice(0, 1000))}
                  maxLength={1000}
                  placeholder="Tell us what you need help with..."
                  className="min-h-24 resize-none"
                  aria-invalid={Boolean(errors.message)}
                />
              </Field>

              <Button type="submit" size="lg" className="mt-6 h-12 w-full text-base font-semibold">
                Send enquiry
                <ArrowRight aria-hidden />
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Preview only — no details will be sent or stored.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mt-4 block text-sm font-bold text-ink">
      {label}
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-1 block text-xs font-normal text-destructive">{error}</span> : null}
    </label>
  );
}
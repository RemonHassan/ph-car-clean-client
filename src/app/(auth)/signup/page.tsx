"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FormEvent, MouseEvent } from "react";

import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const stopLabelToggle = (event: MouseEvent<HTMLAnchorElement>) => {
  event.stopPropagation();
};

const SignUpPage = () => {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const image = String(formData.get("image") ?? "");
    const password = String(formData.get("password") ?? "");

    const { data, error } = await signUp.email({
      name: name, // required, The name of the user.
      email: email, // required, The email address of the user.
      password: password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      image: image, // An optional profile image of the user.
      callbackURL: "/", // An optional URL to redirect to after the user signs up.
    });
    if (error) {
      toast.add({
        title: "some thing went wrong",
        description: "Sunday, December 3 at 9:00 AM",
      });
    }
    router.push("/");
    toast.add({
      title: `Welcome ${name}`,
      description: "Hi",
    });
    // TODO: replace with Better Auth, e.g.
    // await authClient.signUp.email({ name, email, password, phone })
    console.info("Sign up submitted", { name, email, phone, password, image });
  };

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        Get started
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        Create your account
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Book a wash in minutes and keep every appointment in one place.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
              required
              className="h-11 rounded-xl px-3.5"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="h-11 rounded-xl px-3.5"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/profile.jpg"
                required
                className="h-11 rounded-xl px-3.5"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+880 1700-000000"
                required
                className="h-11 rounded-xl px-3.5"
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Create a password"
              minLength={8}
              required
              aria-describedby="password-hint"
              className="h-11 rounded-xl px-3.5"
            />
            <FieldDescription id="password-hint">
              Use at least 8 characters.
            </FieldDescription>
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="terms" name="terms" required className="mt-0.5" />
            <FieldLabel
              htmlFor="terms"
              className="font-normal leading-snug text-muted-foreground"
            >
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  onClick={stopLabelToggle}
                  className="font-medium text-brand-navy underline underline-offset-4 dark:text-brand-amber"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  onClick={stopLabelToggle}
                  className="font-medium text-brand-navy underline underline-offset-4 dark:text-brand-amber"
                >
                  Privacy Policy
                </Link>
                {"."}
              </span>
            </FieldLabel>
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          size="lg"
          className="mt-6 h-11 w-full gap-2 rounded-xl bg-brand-amber text-sm font-semibold text-brand-navy hover:bg-brand-amber/90"
        >
          Create account
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-semibold text-brand-navy underline-offset-4 hover:underline dark:text-brand-amber"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;

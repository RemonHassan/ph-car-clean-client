"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FormEvent } from "react";

import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const remember = formData.get("remember") === "on";

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
        rememberMe: remember,
      });

      // Handle authentication error
      if (error) {
        toast.add({
          title: "Sign in failed",
          description: error.message || "Invalid email or password.",
        });
        return;
      }

      // Handle successful authentication
      if (data?.user) {
        toast.add({
          title: `Welcome back, ${data.user.name}!`,
          description: "You have successfully signed in.",
        });

        router.push("/");
      }
    } catch (error) {
      console.error("Sign in error:", error);

      toast.add({
        title: "Something went wrong",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        Welcome back
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        Sign in to your account
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Pick up where you left off and keep your car looking its best.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <FieldGroup>
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
            <div className="flex items-center justify-between gap-3">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-brand-navy underline-offset-4 hover:underline dark:text-brand-amber"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              className="h-11 rounded-xl px-3.5"
            />
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="remember" name="remember" />
            <FieldLabel
              htmlFor="remember"
              className="font-normal text-muted-foreground"
            >
              Remember me for 30 days
            </FieldLabel>
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          size="lg"
          className="mt-6 h-11 w-full gap-2 rounded-xl bg-brand-amber text-sm font-semibold text-brand-navy hover:bg-brand-amber/90"
        >
          Sign in
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link
          href="/signup"
          className="font-semibold text-brand-navy underline-offset-4 hover:underline dark:text-brand-amber"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;

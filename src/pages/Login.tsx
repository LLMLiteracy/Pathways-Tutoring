import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSeo } from "../lib/useSeo";
import { useAuth } from "../lib/AuthContext";
import { Field, inputClass, SubmitButton } from "../components/ui";

export function Login() {
  useSeo("Admin Login", "Admin login for Pathways Tutoring.");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    setError(null);
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);

    if (signInError) {
      setError(signInError);
      return;
    }
    navigate("/admin");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-20">
      <div className="text-center">
        <img src="/logo.png" alt="Pathways Tutoring" className="mx-auto h-12 w-12 rounded-full" />
        <h1 className="mt-4 text-2xl font-bold text-navy-900">Admin Login</h1>
        <p className="mt-1 text-sm text-navy-700/70">Sign in to manage bookings.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-navy-100 p-8">
        <Field label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required className={inputClass} />
        </Field>
        <Field label="Password" htmlFor="password">
          <input id="password" name="password" type="password" required className={inputClass} />
        </Field>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <SubmitButton type="submit" disabled={submitting} className="w-full">
          {submitting ? "Signing in…" : "Sign In"}
        </SubmitButton>
      </form>
    </div>
  );
}

"use server";

import type { User } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  createServerSupabaseClient,
  getSupabaseConfigurationError,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export type AuthActionState = {
  error: string | null;
};

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getSafeRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/account";
  }

  if (value.startsWith("/login") || value.startsWith("/register")) {
    return "/account";
  }

  return value;
}

export async function getCurrentUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}

export async function requireCurrentUser(redirectTo: string): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return user;
}

export async function signInWithPassword(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    return { error: getSupabaseConfigurationError() };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return { error: error?.message ?? null };
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = readFormValue(formData, "email");
  const password = readFormValue(formData, "password");
  const redirectTo = getSafeRedirectPath(readFormValue(formData, "redirectTo"));

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const result = await signInWithPassword(email, password);

  if (result.error) {
    return { error: result.error };
  }

  redirect(redirectTo);
}

export async function signUpWithPassword(input: {
  name: string;
  email: string;
  password: string;
  location: string;
  phone: string;
}) {
  if (!isSupabaseConfigured()) {
    return { error: getSupabaseConfigurationError() };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        name: input.name,
        location: input.location,
        phone: input.phone,
      },
    },
  });

  return { error: error?.message ?? null };
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = readFormValue(formData, "name");
  const email = readFormValue(formData, "email");
  const password = readFormValue(formData, "password");
  const location = readFormValue(formData, "location");
  const phone = readFormValue(formData, "phone");
  const redirectTo = getSafeRedirectPath(readFormValue(formData, "redirectTo"));

  if (!name || !email || !password || !location || !phone) {
    return { error: "Lengkapi nama, email, password, kecamatan, dan WhatsApp." };
  }

  if (password.length < 6) {
    return { error: "Password minimal 6 karakter." };
  }

  const result = await signUpWithPassword({
    name,
    email,
    password,
    location,
    phone,
  });

  if (result.error) {
    return { error: result.error };
  }

  redirect(
    `/login?registered=1&redirectTo=${encodeURIComponent(redirectTo)}`,
  );
}

export async function signOut() {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signOut();

  return { error: error?.message ?? null };
}

export async function logoutAction() {
  await signOut();
  redirect("/login");
}

export async function sendPasswordResetAction() {
  if (!isSupabaseConfigured()) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return;
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? "http://localhost:3000";

  await supabase.auth.resetPasswordForEmail(user.email, {
    redirectTo: `${origin}/login`,
  });
}

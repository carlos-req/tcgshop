"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { APIError } from "payload";

import { getCurrentCustomer } from "@/lib/auth";
import { getPayloadClient } from "@/lib/payload";

export type AuthActionState = { error?: string; success?: boolean } | null;

async function setCustomerAuthCookie(token: string) {
  const payload = await getPayloadClient();
  const auth = payload.collections.customers.config.auth;
  const cookieStore = await cookies();

  cookieStore.set(`${payload.config.cookiePrefix}-token`, token, {
    httpOnly: true,
    path: "/",
    maxAge: auth.tokenExpiration,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const payload = await getPayloadClient();

  try {
    const result = await payload.login({
      collection: "customers",
      data: { email, password },
    });

    if (!result.token) {
      return { error: "Login failed. Please try again." };
    }

    await setCustomerAuthCookie(result.token);
  } catch (error) {
    if (error instanceof APIError) {
      return { error: "Incorrect email or password." };
    }
    throw error;
  }

  redirect("/account");
}

export async function signupAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!firstName || !lastName || !email || !password) {
    return { error: "First name, last name, email, and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const payload = await getPayloadClient();

  try {
    await payload.create({
      collection: "customers",
      data: {
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        password,
      },
    });

    const result = await payload.login({
      collection: "customers",
      data: { email, password },
    });

    if (!result.token) {
      return { error: "Account created — please log in." };
    }

    await setCustomerAuthCookie(result.token);
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message || "Could not create account." };
    }
    throw error;
  }

  redirect("/account");
}

export async function updateProfileAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const customer = await getCurrentCustomer();
  if (!customer) {
    redirect("/login");
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!firstName || !lastName) {
    return { error: "First and last name are required." };
  }

  const shippingAddress = {
    line1: String(formData.get("line1") ?? "").trim() || null,
    line2: String(formData.get("line2") ?? "").trim() || null,
    city: String(formData.get("city") ?? "").trim() || null,
    state: String(formData.get("state") ?? "").trim() || null,
    postalCode: String(formData.get("postalCode") ?? "").trim() || null,
    country: String(formData.get("country") ?? "").trim() || null,
  };

  const payload = await getPayloadClient();

  try {
    await payload.update({
      collection: "customers",
      id: customer.id,
      data: {
        firstName,
        lastName,
        phone: phone || null,
        shippingAddress,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message || "Could not save changes." };
    }
    throw error;
  }

  revalidatePath("/account");
  return { success: true };
}

export async function logoutAction() {
  const payload = await getPayloadClient();
  const cookieStore = await cookies();
  cookieStore.delete(`${payload.config.cookiePrefix}-token`);
  redirect("/");
}

import type { Customer } from "@/payload-types";
import { updateProfileAction } from "./actions";
import { AuthField, AuthForm } from "./AuthForm";

export function ProfileForm({ customer }: { customer: Customer }) {
  return (
    <AuthForm
      action={updateProfileAction}
      submitLabel="Save changes"
      pendingLabel="Saving…"
      successMessage="Saved."
      buttonClassName="bg-primary text-on-primary hover:bg-primary-dim mt-1 cursor-pointer self-start rounded-full px-6 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="First name"
          name="firstName"
          autoComplete="given-name"
          defaultValue={customer.firstName}
          required
        />
        <AuthField
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          defaultValue={customer.lastName}
          required
        />
      </div>

      <AuthField
        label="Mobile phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        defaultValue={customer.phone ?? ""}
      />

      <div className="flex flex-col gap-4">
        <h3 className="text-label-mono text-on-surface-variant">
          Shipping address
        </h3>

        <AuthField
          label="Address line 1"
          name="line1"
          autoComplete="address-line1"
          defaultValue={customer.shippingAddress?.line1 ?? ""}
        />
        <AuthField
          label="Address line 2"
          name="line2"
          autoComplete="address-line2"
          defaultValue={customer.shippingAddress?.line2 ?? ""}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            label="City"
            name="city"
            autoComplete="address-level2"
            defaultValue={customer.shippingAddress?.city ?? ""}
          />
          <AuthField
            label="State / province"
            name="state"
            autoComplete="address-level1"
            defaultValue={customer.shippingAddress?.state ?? ""}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            label="Postal code"
            name="postalCode"
            autoComplete="postal-code"
            defaultValue={customer.shippingAddress?.postalCode ?? ""}
          />
          <AuthField
            label="Country"
            name="country"
            autoComplete="country-name"
            defaultValue={customer.shippingAddress?.country ?? ""}
          />
        </div>
      </div>
    </AuthForm>
  );
}

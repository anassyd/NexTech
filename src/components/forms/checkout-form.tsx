"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { motion } from "framer-motion";
import { CreditCard, Truck, User } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";

const checkoutSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("ZIP code is required"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiry: Yup.string()
    .matches(/^\d{2}\/\d{2}$/, "Use MM/YY format")
    .required("Expiry is required"),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, "CVV must be 3-4 digits")
    .required("CVV is required"),
});

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

function FormField({ name, label, type = "text", placeholder }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <Field name={name}>
        {({ field, meta }: { field: Record<string, unknown>; meta: { touched: boolean; error?: string } }) => (
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={meta.touched && meta.error ? "border-destructive" : ""}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="p"
        className="text-xs text-destructive"
      />
    </div>
  );
}

export function CheckoutForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const shipping = totalPrice > 500 ? 0 : 29.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
        }}
        validationSchema={checkoutSchema}
        onSubmit={(_values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            setShowSuccess(true);
            clearCart();
          }, 1500);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <User className="size-4" />
                <h2 className="font-semibold">Contact Information</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField name="firstName" label="First Name" placeholder="John" />
                <FormField name="lastName" label="Last Name" placeholder="Doe" />
                <FormField name="email" label="Email" type="email" placeholder="john@example.com" />
                <FormField name="phone" label="Phone" placeholder="+1 (555) 000-0000" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Truck className="size-4" />
                <h2 className="font-semibold">Shipping Address</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FormField name="address" label="Address" placeholder="123 Main St" />
                </div>
                <FormField name="city" label="City" placeholder="New York" />
                <FormField name="state" label="State" placeholder="NY" />
                <FormField name="zip" label="ZIP Code" placeholder="10001" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <CreditCard className="size-4" />
                <h2 className="font-semibold">Payment Details</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FormField
                    name="cardNumber"
                    label="Card Number"
                    placeholder="1234567890123456"
                  />
                </div>
                <FormField name="expiry" label="Expiry" placeholder="MM/YY" />
                <FormField name="cvv" label="CVV" placeholder="123" />
              </div>
            </motion.div>

            <Separator />

            <div className="space-y-2 rounded-xl bg-muted/50 p-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </Button>
          </Form>
        )}
      </Formik>

      <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-xl font-bold">Order Confirmed!</h2>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <Button className="mt-6" onClick={() => setShowSuccess(false)}>
            Continue Shopping
          </Button>
        </div>
      </Dialog>
    </>
  );
}

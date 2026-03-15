"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

const contactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

export function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", subject: "", message: "" }}
        validationSchema={contactSchema}
        onSubmit={(_values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            setSubmitting(false);
            setShowSuccess(true);
            resetForm();
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Field name="name">
                  {({ field, meta }: { field: Record<string, unknown>; meta: { touched: boolean; error?: string } }) => (
                    <Input
                      {...field}
                      id="name"
                      placeholder="Your name"
                      className={meta.touched && meta.error ? "border-destructive" : ""}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-xs text-destructive"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Field name="email">
                  {({ field, meta }: { field: Record<string, unknown>; meta: { touched: boolean; error?: string } }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={meta.touched && meta.error ? "border-destructive" : ""}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-xs text-destructive"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Field name="subject">
                  {({ field, meta }: { field: Record<string, unknown>; meta: { touched: boolean; error?: string } }) => (
                    <Input
                      {...field}
                      id="subject"
                      placeholder="How can we help?"
                      className={meta.touched && meta.error ? "border-destructive" : ""}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="subject"
                  component="p"
                  className="text-xs text-destructive"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Field name="message">
                  {({ field, meta }: { field: Record<string, unknown>; meta: { touched: boolean; error?: string } }) => (
                    <textarea
                      {...field}
                      id="message"
                      rows={4}
                      placeholder="Your message..."
                      className={`flex w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-input dark:bg-input/30 ${
                        meta.touched && meta.error ? "border-destructive" : "border-input"
                      }`}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="message"
                  component="p"
                  className="text-xs text-destructive"
                />
              </div>
            </motion.div>

            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
              <Send className="size-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        )}
      </Formik>

      <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <Send className="size-6 text-green-500" />
          </div>
          <h2 className="text-xl font-bold">Message Sent!</h2>
          <p className="mt-2 text-muted-foreground">
            We&apos;ll get back to you as soon as possible.
          </p>
          <Button className="mt-6" onClick={() => setShowSuccess(false)}>
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
}

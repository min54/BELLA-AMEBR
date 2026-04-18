"use client";

import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitApplication } from "@/lib/api";

export function ApplyForm() {
  const { t, lang } = useLanguage();

  const schema = z.object({
    name: z.string().trim().min(1, t.validationName),
    sns_handle: z.string().trim().min(1, t.validationSns),
    email: z.string().trim().email(t.validationEmail),
    reason: z.string().trim().min(10, t.validationReason),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", sns_handle: "", email: "", reason: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await submitApplication({ ...values, language: lang });
      toast.success(t.formSuccessTitle, { description: t.formSuccessBody });
      reset();
    } catch (err) {
      console.error(err);
      toast.error(t.formErrorTitle, { description: t.formErrorBody });
    }
  }

  return (
    <section className="my-16 p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-8 text-center">{t.formTitle}</h3>
        <form
          className="space-y-6 max-w-lg mx-auto"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="apply-name">{t.formName}</Label>
            <Input
              id="apply-name"
              placeholder={t.formNamePlaceholder}
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-rose-300">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apply-sns">{t.formSns}</Label>
            <Input
              id="apply-sns"
              placeholder={t.formSnsPlaceholder}
              autoComplete="off"
              {...register("sns_handle")}
            />
            {errors.sns_handle && (
              <p className="text-xs text-rose-300">
                {errors.sns_handle.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apply-email">{t.formEmail}</Label>
            <Input
              id="apply-email"
              type="email"
              placeholder={t.formEmailPlaceholder}
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-rose-300">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apply-reason">{t.formReason}</Label>
            <Textarea
              id="apply-reason"
              rows={4}
              placeholder={t.formReasonPlaceholder}
              {...register("reason")}
            />
            {errors.reason && (
              <p className="text-xs text-rose-300">{errors.reason.message}</p>
            )}
          </div>

          <motion.div
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            <Button
              type="submit"
              variant="invert"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? t.formSubmitting : t.formSubmit}
            </Button>
          </motion.div>
        </form>
      </div>
    </section>
  );
}

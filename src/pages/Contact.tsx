import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useT } from "../i18n/LanguageContext";

const Contact = () => {
  const { t } = useT();

  const contactSchema = z.object({
    name: z.string().min(2, t.contact.validation.name),
    email: z.string().email(t.contact.validation.email),
    subject: z.string().min(3, t.contact.validation.subject),
    message: z.string().min(10, t.contact.validation.message),
  });

  type ContactForm = z.infer<typeof contactSchema>;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { ref, isVisible } = useScrollReveal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    window.location.href = `mailto:juanvalencia9411@outlook.com?subject=${subject}&body=${body}`;
    setStatus("success");
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{t.contact.title}</h2>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 text-center">
        {t.contact.intro}
      </p>

      {/* Form */}
      <div
        ref={ref}
        className={`${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}
      >
      {status === "success" ? (
        <div className="max-w-lg mx-auto text-center py-10">
          <div className="text-5xl mb-4">📬</div>
          <p className="text-lg text-teal-700 dark:text-teal-300 font-semibold mb-2">
            {t.contact.successTitle}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            {t.contact.successText}{" "}
            <a
              href="mailto:juanvalencia9411@outlook.com"
              className="text-teal-600 dark:text-teal-400 font-medium hover:underline"
            >
              juanvalencia9411@outlook.com
            </a>
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto space-y-5"
          noValidate
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              {t.contact.nameLabel}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t.contact.namePlaceholder}
              {...register("name")}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              {t.contact.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t.contact.emailPlaceholder}
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              {t.contact.subjectLabel}
            </label>
            <input
              id="subject"
              type="text"
              placeholder={t.contact.subjectPlaceholder}
              {...register("subject")}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              {t.contact.messageLabel}
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder={t.contact.messagePlaceholder}
              {...register("message")}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition resize-y dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Error message */}
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              {t.contact.errorText}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50"
          >
            {status === "loading" ? t.contact.sending : t.contact.submit}
          </button>
        </form>
      )}
      </div>

      {/* Social Links */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <a
          href="mailto:juanvalencia9411@outlook.com"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition text-center"
        >
          {t.contact.sendEmail}
        </a>
        <a
          href="https://www.linkedin.com/in/jdvalmart/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 dark:hover:bg-teal-900/20 transition text-center"
        >
          {t.contact.linkedIn}
        </a>
        <a
          href="https://huggingface.co/jdvalmart"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-zinc-700 dark:text-zinc-300 hover:underline text-center"
        >
          {t.contact.huggingFace}
        </a>
        <a
          href="https://github.com/jdvalmart"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-zinc-700 dark:text-zinc-300 hover:underline text-center"
        >
          {t.contact.gitHub}
        </a>
      </div>
    </section>
  );
};

export default Contact;

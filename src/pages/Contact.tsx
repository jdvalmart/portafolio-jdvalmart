import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    try {
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact</h2>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 text-center">
        If you have an opportunity, an idea, or simply want to contact me, I'd
        be happy to talk to you.
      </p>

      {/* Form */}
      {status === "success" ? (
        <div className="max-w-lg mx-auto text-center py-10">
          <p className="text-lg text-green-600 font-medium">
            ✅ Message sent successfully! I'll get back to you soon.
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
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
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
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="What is this about?"
              {...register("subject")}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message..."
              {...register("message")}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition resize-y dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Error message */}
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              Something went wrong. Please try again or email directly.
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}

      {/* Social Links */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <a
          href="mailto:juanvalencia9411@outlook.com"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium
                     hover:bg-teal-700 transition text-center"
        >
          Send Email
        </a>

        <a
          href="https://www.linkedin.com/in/jdvalmart/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-teal-600 text-teal-600
                     rounded-lg font-medium hover:bg-teal-50 dark:hover:bg-teal-900/20 transition text-center"
        >
          LinkedIn
        </a>

        <a
          href="https://huggingface.co/jdvalmart"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-zinc-700 dark:text-zinc-300 hover:underline text-center"
        >
          HuggingFace
        </a>

        <a
          href="https://github.com/jdvalmart"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-zinc-700 dark:text-zinc-300 hover:underline text-center"
        >
          GitHub
        </a>
      </div>
    </section>
  );
};

export default Contact;

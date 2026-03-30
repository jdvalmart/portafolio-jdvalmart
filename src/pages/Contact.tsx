const Contact = () => {
  return (
    <section id="contact" className="max-w-4xl mx-auto py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10">
        If you have an opportunity, an idea, or simply want to contact me, I'd
        be happy to talk to you.
      </p>

      {/* Links */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <a
          href="mailto:juanvalencia9411@outlook.com"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
                     hover:bg-indigo-700 transition"
        >
          Send Email
        </a>

        <a
          href="https://www.linkedin.com/in/jdvalmart/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-indigo-600 text-indigo-600
                     rounded-lg font-medium hover:bg-indigo-50 transition"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/jdvalmart"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-zinc-700 dark:text-zinc-300 hover:underline"
        >
          GitHub
        </a>
      </div>
    </section>
  );
};

export default Contact;

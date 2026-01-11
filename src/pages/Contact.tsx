import React, { useState } from "react";

const Contact: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="max-w-md mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-6">Contacto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <textarea
          placeholder="Tu mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-3 rounded"
          rows={4}
          required
        />
        <button className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
          Enviar
        </button>
      </form>
    </section>
  );
};
export default Contact;

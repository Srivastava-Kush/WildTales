import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const API_BASE = import.meta.env.REACT_APP_API_URL || ""; // e.g. "" in dev if using proxy

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, msg: "" });

    try {
      const resp = await fetch("api/contact/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();

      if (!resp.ok) {
        // show backend error message
        setStatus({
          loading: false,
          ok: false,
          msg: data?.message || "Failed to send",
        });
        return;
      }

      setStatus({
        loading: false,
        ok: true,
        msg: data?.message || "Message sent!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Network error:", err);
      setStatus({
        loading: false,
        ok: false,
        msg: "Network error. Try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center flex-col p-[5%]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8">Contact Us</h1>

      <div className="w-full max-w-2xl mb-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="5"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 dark:bg-white group hover:scale-105 transition-transform duration-300 rounded-lg disabled:opacity-60"
          >
            {status.loading ? "Sending..." : "Send Message"}
          </button>

          <div className="mt-2 h-6">
            {status.ok === true && (
              <p className="text-green-500">{status.msg}</p>
            )}
            {status.ok === false && (
              <p className="text-red-500">{status.msg}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

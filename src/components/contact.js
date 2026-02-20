"use client";

import { useState } from "react";
import { Mail, Linkedin } from "lucide-react";
import { cn } from "../lib/utils";
import { SectionHeading, GlassCard } from "./shared";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "SaaS Application",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({
          name: "",
          email: "",
          projectType: "SaaS Application",
          message: "",
        });
      } else {
        setStatus({ type: "error", message: data.message });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Something went wrong." });
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="sm:py-32 py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          {/* LEFT SIDE */}
          <div>
            <SectionHeading
              centered={false}
              title="Let's Build Something Great"
              subtitle="Ready to launch faster and scale smarter? Reach out and let's discuss your project."
            />

            <div className="space-y-8 mt-12">
              {[
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "hello@ontimecoders.com",
                  colorClass: "bg-blue-600/10 text-blue-500",
                },
                {
                  icon: Linkedin,
                  label: "Follow Us",
                  value: "@ontimecoders",
                  colorClass: "bg-purple-600/10 text-purple-500",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      item.colorClass,
                    )}
                  >
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {item.label}
                    </h4>
                    <p className="text-white/40">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <GlassCard className="p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 uppercase tracking-widest">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option className="bg-slate-900">SaaS Application</option>
                  <option className="bg-slate-900">E-commerce Website</option>
                  <option className="bg-slate-900">Custom Web App</option>
                  <option className="bg-slate-900">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {status && (
                <p
                  className={`text-sm font-medium ${
                    status.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-600/80 transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

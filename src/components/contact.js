'use client';

import { Mail, Linkedin, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { SectionHeading, GlassCard } from './shared';

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
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
                  label: 'Email Us',  
                  value: 'hello@ontimecoders.com', 
                  colorClass: 'bg-blue-600/10 text-blue-500'   
                },
                { 
                  icon: Linkedin, 
                  label: 'Follow Us', 
                  value: '@ontimecoders',          
                  colorClass: 'bg-purple-600/10 text-purple-500' 
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center', item.colorClass)}>
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{item.label}</h4>
                    <p className="text-white/40">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <GlassCard className="p-10">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[['Name','text','John Doe'],['Email','email','john@example.com']].map(([label, type, ph]) => (
                  <div key={label} className="space-y-2">
                    <label className="text-sm font-bold text-white/60 uppercase tracking-widest">{label}</label>
                    <input
                      type={type}
                      placeholder={ph}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 uppercase tracking-widest">Project Type</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
                  <option className="bg-slate-900">SaaS Application</option>
                  <option className="bg-slate-900">E-commerce Website</option>
                  <option className="bg-slate-900">Custom Web App</option>
                  <option className="bg-slate-900">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 uppercase tracking-widest">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-600/80 transition-all"
              >
                Send Message
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
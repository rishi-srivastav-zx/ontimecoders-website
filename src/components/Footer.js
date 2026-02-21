'use client';

import { Twitter, Linkedin, Github, Code2 } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full sm:py-18 py-6 px-6 border-t border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="max-w-8xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">OntimeCoders</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed">
              Engineering high-performance digital products for the next generation of startups and founders.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              {[
                ['About', 'about'],
                ['Services', 'services'],
                ['Portfolio', 'portfolio'],
                ['Pricing', 'pricing']
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={`#${href}`} className="hover:text-blue-500 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Social</h4>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-white/60"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-white/20 text-xs uppercase tracking-widest">
          <p>© 2025 OntimeCoders. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="/PrivacyPolicyPage" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
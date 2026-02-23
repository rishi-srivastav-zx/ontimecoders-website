'use client';

import { Twitter, Linkedin, Github, Code2, Mail, MapPin, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────
const LINKS = {
  company: [
    { label: 'About Us',   href: '#about'     },
    { label: 'Services',   href: '#services'  },
    { label: 'Portfolio',  href: '#portfolio' },
    { label: 'Pricing',    href: '#pricing'   },
    { label: 'Contact',    href: '#contact'   },
  ],
  services: [
    { label: 'Web Development'  },
    { label: 'Mobile Apps'      },
    { label: 'UI/UX Design'     },
    { label: 'API & Backend'    },
    { label: 'AI Integration'   },
  ],
  socials: [
    { Icon: Twitter,  href: '#', label: 'Twitter'  },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Github,   href: '#', label: 'GitHub'   },
  ],
};

const CONTACT = [
  { Icon: Mail,    text: 'hello@ontimecoders.com' },
  { Icon: Phone,   text: '9411775419'      },
  { Icon: MapPin,  text: 'India, Uttarakhand,Dehradun'       },
];

const STATS = [
  { value: '50+',  label: 'Projects'      },
  { value: '40+',  label: 'Happy Clients' },
  { value: '3+',   label: 'Years'         },
  { value: '100%', label: 'On-Time'       },
];

// ─── Newsletter Input ─────────────────────────────────────────────────────────
function NewsletterInput() {
  const [email, setEmail] = useState('');
  const [sent,  setSent]  = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginTop: 16 }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{
          flex: 1,
          padding: '10px 16px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#fff',
          fontSize: 13,
          outline: 'none',
          fontFamily: "'DM Sans', sans-serif",
          transition: 'border-color 0.2s',
        }}
        onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.4)')}
        onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
      />
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        style={{
          padding: '10px 18px',
          borderRadius: 12,
          background: sent
            ? 'linear-gradient(135deg,#22d3ee,#6366f1)'
            : 'linear-gradient(135deg,#22d3ee,#6366f1)',
          border: 'none',
          color: '#fff',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 20px -4px rgba(34,211,238,0.35)',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {sent ? '✓ Sent!' : 'Subscribe'}
      </motion.button>
    </form>
  );
}

// ─── Footer Link ──────────────────────────────────────────────────────────────
function FooterLink({ href, label, external = false }) {
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 15,
    color: 'rgba(255,255,255,0.38)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <a
      href={href ?? '#'}
      style={style}
      onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
    >
      {label}
      {external && <ArrowUpRight size={11} />}
    </a>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(180deg, rgba(5,5,16,0) 0%, rgba(5,5,16,0.98) 8%, #050510 100%)',
      }}
    >
      {/* ── Ambient glows ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 60% 40% at 10% 0%, rgba(34,211,238,0.05), transparent),' +
          'radial-gradient(ellipse 50% 35% at 90% 100%, rgba(99,102,241,0.06), transparent)',
      }} />

      {/* ── Top scan line ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), rgba(99,102,241,0.3), transparent)',
      }} />

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '28px 40px',
      }}>
        <div style={{
          maxWidth: '100%', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: '16px 48px',
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 26, fontWeight: 700, color: '#fff',
                fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg,#22d3ee,#818cf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {value}
              </div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '64px 40px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px 40px',
          marginBottom: 64,
        }}>

          {/* Brand col */}
          <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg,#22d3ee,#6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px -4px rgba(34,211,238,0.5)',
              }}>
                <Code2 size={20} color="#fff" />
              </div>
              <span style={{
                fontSize: 22, fontWeight: 700, color: '#fff',
                fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em',
              }}>
                OntimeCoders
              </span>
            </div>

            <p style={{
              fontSize: 15.5, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.38)',
              maxWidth: 320, marginBottom: 24,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Engineering high-performance digital products for the next generation of startups and ambitious founders.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {CONTACT.map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'rgba(34,211,238,0.08)',
                    border: '1px solid rgba(34,211,238,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={13} color="#22d3ee" />
                  </div>
                  <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.38)', fontFamily: "'DM Sans', sans-serif" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 10 }}>
              {LINKS.socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(34,211,238,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)';
                    e.currentTarget.style.color = '#22d3ee';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 style={{
              fontSize: 14, fontWeight: 600, color: '#fff',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              marginBottom: 20, fontFamily: "'Syne', sans-serif",
            }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {LINKS.company.map(({ label, href }) => (
                <FooterLink key={label} href={href} label={label} />
              ))}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h4 style={{
              fontSize: 14, fontWeight: 600, color: '#fff',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              marginBottom: 20, fontFamily: "'Syne', sans-serif",
            }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {LINKS.services.map(({ label }) => (
                <FooterLink key={label} label={label} />
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontSize: 14, fontWeight: 600, color: '#fff',
              textTransform: 'uppercase', letterSpacing: '0.12em',
              marginBottom: 20, fontFamily: "'Syne', sans-serif",
            }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
              Get insights on web tech, design, and startup growth — no spam, ever.
            </p>
            <NewsletterInput />

            {/* Trust badge */}
            <div style={{
              marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 12px', borderRadius: 999,
              background: 'rgba(34,211,238,0.06)',
              border: '1px solid rgba(34,211,238,0.12)',
            }}>
              <Sparkles size={11} color="#22d3ee" />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
                No spam. Unsubscribe anytime.
              </span>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <div style={{
          paddingTop: 28,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          {/* Left: copyright */}
          <p style={{
            fontSize: 13, color: 'rgba(255,255,255,0.2)',
            fontFamily: 'monospace', letterSpacing: '0.05em',
          }}>
            © {new Date().getFullYear()} OntimeCoders. All rights reserved.
          </p>

          {/* Center: status badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '4px 12px', borderRadius: 999,
            background: 'rgba(52,211,153,0.07)',
            border: '1px solid rgba(52,211,153,0.15)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#34d399',
              boxShadow: '0 0 6px #34d399',
              display: 'block',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ fontSize: 12.5, color: 'rgba(52,211,153,0.8)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              All systems operational
            </span>
          </div>

          {/* Right: legal links */}
          <div style={{ display: 'flex', gap: 24 }}>
            <Link
              href="/PrivacyPolicyPage"
              style={{
                fontSize: 13, color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none', fontFamily: 'monospace',
                letterSpacing: '0.05em', transition: 'color 0.2s',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: 13, color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none', fontFamily: 'monospace',
                letterSpacing: '0.05em', transition: 'color 0.2s',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* ── Pulse keyframe (injected inline) ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </footer>
  );
}
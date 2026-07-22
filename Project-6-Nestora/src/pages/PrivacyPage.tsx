import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly, such as your name, email, phone number, and property preferences when you create an account, save properties, or submit enquiries. We also collect usage data including pages visited, search queries, and device information.' },
  { title: 'How We Use Your Information', content: 'Your information is used to provide and improve our services, connect you with property owners, send relevant property updates and newsletters, analyze platform usage, and ensure security. We never sell your personal data to third parties.' },
  { title: 'Data Storage & Security', content: 'Your data is stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your information from unauthorized access, alteration, or disclosure.' },
  { title: 'Cookies & Tracking', content: 'We use cookies and similar technologies to enhance your browsing experience, remember preferences, and analyze traffic. You can control cookies through your browser settings.' },
  { title: 'Sharing with Third Parties', content: 'We share your contact details with property owners only when you submit an enquiry. We may share aggregated, non-personal data with analytics partners. We comply with legal requests when required by law.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You can manage notification preferences in your dashboard. To exercise your data rights, contact us at privacy@nestora.com.' },
  { title: 'Data Retention', content: 'We retain your data for as long as your account is active or as needed to provide services. You can request deletion of your data at any time.' },
  { title: 'Updates to This Policy', content: 'We may update this privacy policy periodically. We will notify you of significant changes via email or platform notification. Continued use after changes constitutes acceptance.' },
];

export function PrivacyPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground">Last updated: July 2025</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-6">
                <h2 className="font-display text-lg font-semibold mb-2">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

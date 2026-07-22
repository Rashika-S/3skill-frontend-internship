import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

const sections = [
  { title: 'Acceptance of Terms', content: 'By accessing and using Nestora, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the platform.' },
  { title: 'Use of Services', content: 'Nestora provides a platform for browsing, searching, and enquiring about real estate properties. You agree to use the platform lawfully and not to misuse, disrupt, or attempt to gain unauthorized access to any features or data.' },
  { title: 'User Accounts', content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate and complete information when creating an account.' },
  { title: 'Property Listings', content: 'While we strive for accuracy, Nestora does not guarantee the accuracy of property listings. Users should independently verify property details, legal status, and pricing before making any decisions.' },
  { title: 'Prohibited Activities', content: 'You may not use the platform for fraudulent purposes, submit false information, impersonate others, spam other users, or use automated tools to scrape data without permission.' },
  { title: 'Intellectual Property', content: 'All content on Nestora, including design, text, graphics, and software, is owned by Nestora or its licensors. You may not reproduce, distribute, or create derivative works without permission.' },
  { title: 'Limitation of Liability', content: 'Nestora is not liable for any damages arising from the use of the platform, including indirect, incidental, or consequential damages. The platform is provided "as is" without warranties of any kind.' },
  { title: 'Termination', content: 'We reserve the right to suspend or terminate access for violations of these terms. You may stop using the platform at any time.' },
  { title: 'Governing Law', content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Gurgaon, Haryana.' },
  { title: 'Contact', content: 'For questions about these Terms, contact us at legal@nestora.com.' },
];

export function TermsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Terms & Conditions</h1>
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

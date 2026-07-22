import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { StoreProvider } from '@/hooks/StoreContext';
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { LandingPage } from '@/pages/LandingPage';
import { PropertyListingPage } from '@/pages/PropertyListingPage';
import { PropertyDetailsPage } from '@/pages/PropertyDetailsPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { UserDashboardPage } from '@/pages/UserDashboardPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { AdminPropertiesPage } from '@/pages/AdminPropertiesPage';
import { AdminAddEditPropertyPage } from '@/pages/AdminAddEditPropertyPage';
import { AdminEnquiriesPage } from '@/pages/AdminEnquiriesPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { FAQPage } from '@/pages/FAQPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Main site routes */}
          <Route element={<MainLayout><Outlet /></MainLayout>}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/properties" element={<PropertyListingPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboardPage /></AdminLayout>} />
          <Route path="/admin/properties" element={<AdminLayout><AdminPropertiesPage /></AdminLayout>} />
          <Route path="/admin/add" element={<AdminLayout><AdminAddEditPropertyPage /></AdminLayout>} />
          <Route path="/admin/edit/:id" element={<AdminLayout><AdminAddEditPropertyPage /></AdminLayout>} />
          <Route path="/admin/enquiries" element={<AdminLayout><AdminEnquiriesPage /></AdminLayout>} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;

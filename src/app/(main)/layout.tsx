import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import AdHeader from '@/components/ads/AdHeader';
import { getRecentArticles } from '@/lib/content';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarArticles = getRecentArticles(5);

  return (
    <>
      <Header />
      <AdHeader />
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">{children}</div>
          <Sidebar popularArticles={sidebarArticles} />
        </div>
      </main>
      <Footer />
    </>
  );
}

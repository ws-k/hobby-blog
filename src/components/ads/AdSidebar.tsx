import AdBanner from './AdBanner';

export default function AdSidebar() {
  return (
    <div className="sticky top-20">
      <AdBanner slot="sidebar" format="rectangle" className="min-h-[250px]" />
    </div>
  );
}

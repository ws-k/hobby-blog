import AdBanner from './AdBanner';

export default function AdHeader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      <AdBanner
        slot="header-banner"
        format="horizontal"
        className="min-h-[90px] md:min-h-[90px]"
      />
    </div>
  );
}

import AdBanner from './AdBanner';

export default function AdInArticle() {
  return (
    <div className="my-8">
      <AdBanner slot="in-article" format="auto" className="min-h-[250px]" />
    </div>
  );
}

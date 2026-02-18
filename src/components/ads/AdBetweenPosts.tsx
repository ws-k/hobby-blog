import AdBanner from './AdBanner';

export default function AdBetweenPosts() {
  return (
    <div className="my-6">
      <AdBanner slot="between-posts" format="auto" className="min-h-[100px]" />
    </div>
  );
}

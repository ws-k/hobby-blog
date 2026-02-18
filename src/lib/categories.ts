import { Category } from '@/types/category';

export const CATEGORIES: Category[] = [
  {
    name: '테크',
    slug: 'tech',
    subcategories: [
      { name: '스마트폰', slug: 'smartphones' },
      { name: '노트북/PC', slug: 'laptops-pc' },
      { name: 'AI/소프트웨어', slug: 'ai-software' },
    ],
  },
  {
    name: '가제트',
    slug: 'gadgets',
    subcategories: [
      { name: '오디오', slug: 'audio' },
      { name: '카메라', slug: 'cameras' },
      { name: '드론', slug: 'drones' },
      { name: '웨어러블', slug: 'wearables' },
    ],
  },
  {
    name: '게이밍',
    slug: 'gaming',
    subcategories: [
      { name: '콘솔', slug: 'console' },
      { name: 'PC게임', slug: 'pc-games' },
      { name: '모바일게임', slug: 'mobile-games' },
      { name: '게이밍기어', slug: 'gaming-gear' },
    ],
  },
  {
    name: '자동차',
    slug: 'auto',
    subcategories: [
      { name: '신차', slug: 'new-cars' },
      { name: '전기차', slug: 'ev' },
      { name: '바이크', slug: 'bikes' },
      { name: '자동차용품', slug: 'accessories' },
    ],
  },
  {
    name: '아웃도어',
    slug: 'outdoor',
    subcategories: [
      { name: '캠핑', slug: 'camping' },
      { name: '낚시', slug: 'fishing' },
      { name: '등산', slug: 'hiking' },
      { name: '자전거', slug: 'cycling' },
    ],
  },
  {
    name: '스포츠',
    slug: 'sports',
    subcategories: [
      { name: '헬스/피트니스', slug: 'fitness' },
      { name: '골프', slug: 'golf' },
      { name: '러닝', slug: 'running' },
      { name: '격투기', slug: 'martial-arts' },
    ],
  },
  {
    name: '스타일',
    slug: 'style',
    subcategories: [
      { name: '시계', slug: 'watches' },
      { name: '패션', slug: 'fashion' },
      { name: '그루밍', slug: 'grooming' },
    ],
  },
  {
    name: '푸드&드링크',
    slug: 'food-drink',
    subcategories: [
      { name: '위스키', slug: 'whiskey' },
      { name: '커피', slug: 'coffee' },
      { name: '맥주/와인', slug: 'beer-wine' },
      { name: '바베큐', slug: 'bbq' },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find((s) => s.slug === subcategorySlug);
}

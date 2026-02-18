import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: '소개',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {SITE_NAME} 소개
        </h1>
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
          <p>
            <strong>{SITE_NAME}</strong>은 테크, 가제트, 게이밍, 자동차, 아웃도어,
            스포츠, 스타일, 푸드&드링크 등 남자들의 취미와 라이프스타일에 관한
            최신 뉴스와 심층 리뷰를 전달하는 온라인 매거진입니다.
          </p>

          <h2>우리의 미션</h2>
          <p>
            매일 쏟아지는 해외 테크 뉴스와 제품 리뷰를 한국 독자의 관점에서
            쉽고 빠르게 전달하는 것이 {SITE_NAME}의 목표입니다.
            단순 번역을 넘어, 국내 출시 가격, 구매 가이드, 실사용 팁까지
            실질적으로 도움이 되는 정보를 제공합니다.
          </p>

          <h2>다루는 주제</h2>
          <ul>
            <li>
              <strong>테크</strong> — 스마트폰, 노트북/PC, AI/소프트웨어
            </li>
            <li>
              <strong>가제트</strong> — 오디오, 카메라, 드론, 웨어러블
            </li>
            <li>
              <strong>게이밍</strong> — 콘솔, PC게임, 모바일게임, 게이밍기어
            </li>
            <li>
              <strong>자동차</strong> — 신차, 전기차, 바이크, 자동차용품
            </li>
            <li>
              <strong>아웃도어</strong> — 캠핑, 낚시, 등산, 자전거
            </li>
            <li>
              <strong>스포츠</strong> — 헬스/피트니스, 골프, 러닝, 격투기
            </li>
            <li>
              <strong>스타일</strong> — 시계, 패션, 그루밍
            </li>
            <li>
              <strong>푸드&드링크</strong> — 위스키, 커피, 맥주/와인, 바베큐
            </li>
          </ul>

          <h2>콘텐츠 유형</h2>
          <p>
            {SITE_NAME}은 두 가지 유형의 콘텐츠를 제공합니다:
          </p>
          <ul>
            <li>
              <strong>뉴스</strong> — 해외 주요 매체의 최신 소식을 한국어로
              빠르게 전달합니다. 모든 뉴스에는 원문 출처를 명시합니다.
            </li>
            <li>
              <strong>리뷰</strong> — 실제 사용 경험을 바탕으로 한 제품 리뷰와
              비교 분석, 구매 가이드를 제공합니다.
            </li>
          </ul>

          <h2>연락처</h2>
          <p>
            광고, 제휴, 기타 문의사항이 있으시면 아래로 연락해 주세요.
          </p>
          <ul>
            <li>이메일: contact@menslab.kr</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          개인정보처리방침
        </h1>
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
          <p>
            {SITE_NAME}(이하 &quot;사이트&quot;)은 이용자의 개인정보를 중요시하며,
            「개인정보 보호법」을 준수하고 있습니다.
          </p>

          <h2>1. 수집하는 개인정보</h2>
          <p>
            본 사이트는 별도의 회원가입 절차 없이 대부분의 콘텐츠를 이용할 수 있습니다.
            다만 다음과 같은 정보가 자동으로 수집될 수 있습니다:
          </p>
          <ul>
            <li>IP 주소, 브라우저 종류, 접속 일시</li>
            <li>방문 페이지, 이용 패턴 (Google Analytics를 통해 수집)</li>
            <li>쿠키 정보 (광고 서비스 및 분석 도구 사용)</li>
          </ul>

          <h2>2. 개인정보의 이용 목적</h2>
          <p>수집된 정보는 다음 목적으로 이용됩니다:</p>
          <ul>
            <li>사이트 이용 통계 분석 및 서비스 개선</li>
            <li>맞춤형 콘텐츠 및 광고 제공</li>
            <li>사이트 보안 및 부정 이용 방지</li>
          </ul>

          <h2>3. 쿠키(Cookie) 사용</h2>
          <p>
            본 사이트는 Google Analytics 및 Google AdSense를 사용하며,
            이 서비스들은 쿠키를 통해 이용자 정보를 수집합니다.
            이용자는 브라우저 설정을 통해 쿠키를 거부할 수 있으나,
            일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>

          <h2>4. Google AdSense</h2>
          <p>
            본 사이트는 Google AdSense를 통해 광고를 게재하고 있습니다.
            Google은 쿠키를 사용하여 이전 방문 기록을 기반으로
            적절한 광고를 표시합니다.
            Google의 광고 쿠키 사용에 대한 자세한 내용은{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google 광고 정책
            </a>
            을 참고하세요.
          </p>

          <h2>5. 제3자 제공</h2>
          <p>
            본 사이트는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
            다만, Google Analytics 및 Google AdSense 서비스 이용에 따라
            Google에 일부 정보가 공유될 수 있습니다.
          </p>

          <h2>6. 개인정보의 보유 및 파기</h2>
          <p>
            자동 수집된 정보는 수집 목적이 달성되면 지체 없이 파기됩니다.
            Google Analytics 데이터는 26개월 후 자동 삭제됩니다.
          </p>

          <h2>7. 이용자의 권리</h2>
          <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
          <ul>
            <li>쿠키 거부 (브라우저 설정)</li>
            <li>Google Analytics 수집 거부 (Google Analytics Opt-out 확장 프로그램)</li>
            <li>맞춤형 광고 비활성화 (Google 광고 설정)</li>
          </ul>

          <h2>8. 문의</h2>
          <p>
            개인정보 관련 문의사항은 사이트 운영자에게 연락해 주시기 바랍니다.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            본 방침은 2026년 2월 18일부터 시행됩니다.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

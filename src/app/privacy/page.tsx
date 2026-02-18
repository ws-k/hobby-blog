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
            {SITE_NAME}(이하 &quot;사이트&quot;, URL: {SITE_URL})은
            「개인정보 보호법」 제30조에 따라 이용자의 개인정보를 보호하고
            이와 관련한 고충을 신속하고 원활하게 처리하기 위하여 다음과 같이
            개인정보처리방침을 수립·공개합니다.
          </p>

          <h2>1. 개인정보의 처리 목적</h2>
          <p>
            본 사이트는 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하는 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며,
            이용 목적이 변경될 경우 「개인정보 보호법」 제18조에 따라
            별도의 동의를 받는 등 필요한 조치를 이행합니다.
          </p>
          <ul>
            <li>
              <strong>사이트 이용 통계 분석 및 서비스 개선</strong>:
              방문자 수, 페이지뷰, 체류시간 등을 분석하여 콘텐츠 및
              서비스 품질을 향상시키기 위해 사용합니다.
            </li>
            <li>
              <strong>맞춤형 광고 제공</strong>: Google AdSense를 통해
              이용자의 관심사에 맞는 광고를 표시합니다.
            </li>
            <li>
              <strong>사이트 보안 및 부정 이용 방지</strong>: 비정상적인
              접근을 탐지하고 사이트의 안정적 운영을 보장합니다.
            </li>
          </ul>

          <h2>2. 수집하는 개인정보의 항목 및 수집 방법</h2>
          <p>
            본 사이트는 별도의 회원가입 절차가 없으며, 이용자가 직접
            개인정보를 입력하는 기능을 제공하지 않습니다. 다만 사이트 이용
            과정에서 아래와 같은 정보가 자동으로 수집될 수 있습니다.
          </p>
          <table>
            <thead>
              <tr>
                <th>수집 항목</th>
                <th>수집 방법</th>
                <th>수집 목적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IP 주소, 브라우저 종류 및 버전, 운영체제 정보</td>
                <td>웹 서버 로그 자동 수집</td>
                <td>보안 및 부정 이용 방지</td>
              </tr>
              <tr>
                <td>방문 페이지 URL, 체류시간, 유입 경로, 스크롤 깊이</td>
                <td>Google Analytics 4 (GA4)</td>
                <td>이용 통계 분석</td>
              </tr>
              <tr>
                <td>광고 식별자, 쿠키 정보, 관심사 카테고리</td>
                <td>Google AdSense</td>
                <td>맞춤형 광고 제공</td>
              </tr>
            </tbody>
          </table>

          <h2>3. 개인정보의 처리 및 보유기간</h2>
          <p>
            본 사이트는 개인정보 수집 목적이 달성된 후에는 해당 정보를
            지체 없이 파기합니다. 각 항목별 보유기간은 다음과 같습니다.
          </p>
          <ul>
            <li>
              <strong>웹 서버 로그</strong>: 호스팅 서비스(Vercel)의
              정책에 따라 수집 후 30일 이내 자동 삭제
            </li>
            <li>
              <strong>Google Analytics 데이터</strong>: 26개월 후 자동 삭제
              (Google Analytics 데이터 보관 설정에 따름)
            </li>
            <li>
              <strong>Google AdSense 쿠키</strong>: 브라우저 쿠키 만료
              시점에 따라 삭제 (일반적으로 최대 13개월)
            </li>
          </ul>

          <h2>4. 개인정보의 제3자 제공</h2>
          <p>
            본 사이트는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지
            않습니다. 다만 다음의 경우에는 예외로 합니다.
          </p>
          <ul>
            <li>법령에 의해 제공이 요구되는 경우</li>
            <li>
              수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의
              요구가 있는 경우
            </li>
          </ul>

          <h2>5. 개인정보 처리의 위탁</h2>
          <p>
            본 사이트는 원활한 서비스 제공을 위해 다음과 같이 개인정보
            처리업무를 위탁하고 있습니다.
          </p>
          <table>
            <thead>
              <tr>
                <th>수탁자</th>
                <th>위탁 업무</th>
                <th>보유 및 이용기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google LLC</td>
                <td>웹 분석 (Google Analytics 4)</td>
                <td>위탁계약 종료 시 또는 데이터 보관기간 만료 시까지</td>
              </tr>
              <tr>
                <td>Google LLC</td>
                <td>온라인 광고 서비스 (Google AdSense)</td>
                <td>위탁계약 종료 시까지</td>
              </tr>
              <tr>
                <td>Vercel Inc.</td>
                <td>웹 호스팅 및 CDN 서비스</td>
                <td>위탁계약 종료 시까지</td>
              </tr>
            </tbody>
          </table>

          <h2>6. 정보주체의 권리·의무 및 행사 방법</h2>
          <p>
            이용자(정보주체)는 개인정보 보호와 관련하여 다음과 같은 권리를
            행사할 수 있습니다.
          </p>
          <ul>
            <li>
              <strong>쿠키 수집 거부</strong>: 웹 브라우저 설정에서 쿠키
              허용/차단을 설정할 수 있습니다.
              <ul>
                <li>Chrome: 설정 &gt; 개인 정보 보호 및 보안 &gt; 쿠키 및 기타 사이트 데이터</li>
                <li>Safari: 환경설정 &gt; 개인 정보 보호 &gt; 쿠키 및 웹사이트 데이터 관리</li>
                <li>Firefox: 설정 &gt; 개인 정보 보호 &amp; 보안 &gt; 쿠키와 사이트 데이터</li>
              </ul>
            </li>
            <li>
              <strong>Google Analytics 수집 거부</strong>:{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              을 설치하여 데이터 수집을 차단할 수 있습니다.
            </li>
            <li>
              <strong>맞춤형 광고 비활성화</strong>:{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google 광고 설정
              </a>
              에서 맞춤형 광고를 비활성화할 수 있습니다.
            </li>
            <li>
              <strong>개인정보 관련 문의 및 민원 처리</strong>: 아래
              개인정보 보호책임자에게 연락하여 개인정보 열람, 정정·삭제,
              처리정지 요구 등을 할 수 있습니다.
            </li>
          </ul>

          <h2>7. 개인정보의 파기 절차 및 방법</h2>
          <p>
            본 사이트는 개인정보 보유기간의 경과, 처리 목적 달성 등
            개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를
            파기합니다.
          </p>
          <ul>
            <li>
              <strong>파기 절차</strong>: 이용 목적이 달성된 개인정보는
              별도의 DB로 옮겨져 내부 방침 및 관련 법령에 따라 일정 기간
              보관 후 파기됩니다.
            </li>
            <li>
              <strong>파기 방법</strong>: 전자적 파일 형태의 개인정보는
              복원이 불가능한 방법으로 영구 삭제하며, 종이에 기록된
              개인정보는 분쇄기로 분쇄하거나 소각합니다.
            </li>
          </ul>

          <h2>8. 개인정보의 안전성 확보 조치</h2>
          <p>
            본 사이트는 개인정보의 안전성 확보를 위해 다음과 같은 조치를
            취하고 있습니다.
          </p>
          <ul>
            <li>HTTPS(SSL/TLS) 암호화 통신 적용</li>
            <li>접근 권한 관리 및 제한</li>
            <li>개인정보 처리 시스템에 대한 접근 통제</li>
          </ul>

          <h2>9. 자동 수집 장치의 설치·운영 및 거부</h2>
          <p>
            본 사이트는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해
            쿠키(Cookie)를 사용합니다.
          </p>
          <ul>
            <li>
              <strong>쿠키의 사용 목적</strong>: 이용자의 방문 기록, 이용
              형태를 파악하여 최적화된 정보를 제공하고, 맞춤형 광고를
              표시하기 위해 사용합니다.
            </li>
            <li>
              <strong>쿠키의 설치·운영 및 거부</strong>: 이용자는 웹
              브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을 할 수
              있습니다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에
              어려움이 발생할 수 있습니다.
            </li>
          </ul>

          <h2>10. 개인정보 보호책임자</h2>
          <p>
            본 사이트는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
            이용자의 개인정보 관련 불만 처리 및 피해 구제를 위해 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <ul>
            <li>개인정보 보호책임자: 사이트 운영자</li>
            <li>이메일: contact@guynote.com</li>
          </ul>
          <p>
            기타 개인정보 침해에 대한 신고나 상담이 필요한 경우 아래 기관에
            문의하실 수 있습니다.
          </p>
          <ul>
            <li>
              개인정보침해신고센터:{' '}
              <a href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer">
                privacy.kisa.or.kr
              </a>{' '}
              (국번없이 118)
            </li>
            <li>
              개인정보분쟁조정위원회:{' '}
              <a href="https://www.kopico.go.kr" target="_blank" rel="noopener noreferrer">
                www.kopico.go.kr
              </a>{' '}
              (1833-6972)
            </li>
            <li>
              대검찰청 사이버수사과:{' '}
              <a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer">
                www.spo.go.kr
              </a>{' '}
              (국번없이 1301)
            </li>
            <li>
              경찰청 사이버수사국:{' '}
              <a href="https://ecrm.police.go.kr" target="_blank" rel="noopener noreferrer">
                ecrm.police.go.kr
              </a>{' '}
              (국번없이 182)
            </li>
          </ul>

          <h2>11. 개인정보처리방침의 변경</h2>
          <p>
            본 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라
            내용의 추가·삭제 및 수정이 있을 경우, 변경사항 시행 7일 전에
            사이트 공지사항을 통해 고지합니다.
          </p>

          <p className="text-sm text-gray-500 mt-8 border-t pt-4">
            본 개인정보처리방침은 2026년 2월 18일부터 시행됩니다.
            <br />
            공고일: 2026년 2월 18일 | 시행일: 2026년 2월 18일
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

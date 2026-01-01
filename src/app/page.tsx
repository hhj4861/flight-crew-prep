import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            외항사 승무원 준비,
            <br />
            <span className="text-blue-600">AI와 함께</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            에미레이트, 카타르항공, 싱가포르항공 등
            <br />
            외국 항공사 승무원 면접을 체계적으로 준비하세요
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/interview"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              AI 면접 연습 시작
            </Link>
            <Link
              href="/questions"
              className="px-8 py-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              기출문제 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI 영어 면접</h3>
              <p className="text-gray-600">
                음성 녹음 후 AI가 발음, 문법, 내용을 분석하고 맞춤 피드백을 제공합니다
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">기출문제 DB</h3>
              <p className="text-gray-600">
                실제 합격자들이 공유한 면접 기출문제와 모범 답안을 확인하세요
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">항공사 정보</h3>
              <p className="text-gray-600">
                항공사별 채용 일정, 면접 특징, 복지 정보를 한눈에 확인하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Airlines Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">지원 항공사</h2>
          <p className="text-gray-600 text-center mb-12">
            전 세계 주요 외국 항공사 면접을 준비할 수 있습니다
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-500">
            <span className="text-lg">에미레이트</span>
            <span className="text-lg">카타르항공</span>
            <span className="text-lg">싱가포르항공</span>
            <span className="text-lg">에티하드항공</span>
            <span className="text-lg">케세이퍼시픽</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-gray-600 mb-8">
            AI 면접 연습으로 자신감을 키우고, 꿈의 항공사에 합격하세요
          </p>
          <Link
            href="/interview/quick"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            무료로 면접 연습하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>외항사 승무원 준비를 위한 정보 제공 사이트</p>
          <p className="mt-2">
            본 사이트는 개인 정보 제공 목적으로 운영됩니다
          </p>
        </div>
      </footer>
    </div>
  );
}

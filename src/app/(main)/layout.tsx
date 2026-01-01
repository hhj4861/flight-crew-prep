import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            FlightCrewPrep
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/questions"
              className="text-gray-600 hover:text-gray-900"
            >
              기출문제
            </Link>
            <Link
              href="/interview"
              className="text-gray-600 hover:text-gray-900"
            >
              AI 면접
            </Link>
            <Link
              href="/airlines"
              className="text-gray-600 hover:text-gray-900"
            >
              항공사 정보
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          외항사 승무원 준비를 위한 정보 제공 사이트
        </div>
      </footer>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const categoryLabels: Record<string, string> = {
  personal: "인성 면접",
  situational: "상황 면접",
  english: "영어 면접",
  service: "서비스 면접",
  group: "그룹 토론",
};

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: question } = await supabase
    .from("questions")
    .select("*, airline:airlines(*)")
    .eq("id", id)
    .single();

  if (!question) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Link */}
      <Link
        href="/questions"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        ← 기출문제 목록
      </Link>

      {/* Question Card */}
      <div className="bg-white border rounded-lg p-8 mb-6">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded">
            {categoryLabels[question.category]}
          </span>
          {question.airline && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
              {question.airline.name}
            </span>
          )}
          {question.is_verified && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
              검증됨
            </span>
          )}
          <span className="ml-auto text-sm text-gray-500">
            난이도 {question.difficulty}/5
          </span>
        </div>

        {/* Question */}
        <h1 className="text-2xl font-bold mb-2">{question.question_ko}</h1>
        {question.question_en && (
          <p className="text-lg text-gray-600 mb-6">{question.question_en}</p>
        )}

        {/* Source */}
        {question.source && (
          <p className="text-sm text-gray-400">출처: {question.source}</p>
        )}
      </div>

      {/* Sample Answer */}
      {question.sample_answer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-blue-800 mb-3">모범 답안 예시</h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {question.sample_answer}
          </p>
        </div>
      )}

      {/* Tips */}
      {question.tips && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-yellow-800 mb-3">답변 팁</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{question.tips}</p>
        </div>
      )}

      {/* Practice CTA */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="font-semibold mb-2">이 질문으로 연습해보세요</h3>
        <p className="text-gray-600 mb-4">
          AI가 당신의 답변을 분석하고 피드백을 제공합니다
        </p>
        <Link
          href="/interview/quick"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          AI 면접 연습하기
        </Link>
      </div>
    </div>
  );
}

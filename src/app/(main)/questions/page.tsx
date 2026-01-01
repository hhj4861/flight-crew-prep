import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const categoryLabels: Record<string, string> = {
  personal: "인성 면접",
  situational: "상황 면접",
  english: "영어 면접",
  service: "서비스 면접",
  group: "그룹 토론",
};

export default async function QuestionsPage() {
  const supabase = await createClient();

  const { data: questions } = await supabase
    .from("questions")
    .select("*, airline:airlines(*)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">기출문제</h1>
        <p className="text-gray-600">
          외항사 면접 기출문제를 확인하고 준비하세요
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            className="px-4 py-2 rounded-full border hover:bg-gray-100 text-sm"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions?.map((question) => (
          <Link
            key={question.id}
            href={`/questions/${question.id}`}
            className="block p-6 border rounded-lg hover:border-blue-300 hover:shadow-sm transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {categoryLabels[question.category]}
                  </span>
                  {question.airline && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {question.airline.name}
                    </span>
                  )}
                  {question.is_verified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      검증됨
                    </span>
                  )}
                </div>
                <p className="text-lg font-medium">{question.question_ko}</p>
                {question.question_en && (
                  <p className="text-gray-500 mt-1">{question.question_en}</p>
                )}
              </div>
              <div className="text-sm text-gray-400">
                난이도 {question.difficulty}/5
              </div>
            </div>
          </Link>
        ))}

        {(!questions || questions.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            등록된 기출문제가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

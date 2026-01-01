"use client";

import { useState } from "react";
import Link from "next/link";

export default function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI 영어 면접 연습</h1>
        <p className="text-gray-600">
          AI와 함께 영어 면접을 연습하고 피드백을 받아보세요
        </p>
      </div>

      {/* Interview Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">빠른 연습</h3>
          <p className="text-gray-600 mb-4">
            랜덤 질문으로 빠르게 연습을 시작합니다
          </p>
          <Link
            href="/interview/quick"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            시작하기
          </Link>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">항공사별 연습</h3>
          <p className="text-gray-600 mb-4">
            특정 항공사의 면접 스타일로 연습합니다
          </p>
          <Link
            href="/interview/airline"
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            항공사 선택
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-4">이용 방법</h3>
        <ol className="space-y-3 text-gray-600">
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
              1
            </span>
            <span>연습 유형을 선택하세요</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
              2
            </span>
            <span>질문이 표시되면 마이크 버튼을 눌러 답변을 녹음하세요</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
              3
            </span>
            <span>AI가 발음, 문법, 내용을 분석하여 피드백을 제공합니다</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

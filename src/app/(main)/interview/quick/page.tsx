"use client";

import { useState, useRef } from "react";

interface Feedback {
  pronunciation_score: number;
  grammar_score: number;
  content_score: number;
  overall_score: number;
  feedback_en: string;
  feedback_ko: string;
  improved_answer: string;
  key_phrases: string[];
}

const SAMPLE_QUESTIONS = [
  {
    question_en: "Tell me about yourself and why you want to be a flight attendant.",
    question_ko: "자기소개와 승무원이 되고 싶은 이유를 말씀해주세요.",
    category: "personal",
  },
  {
    question_en: "Describe a time when you dealt with a difficult customer. How did you handle it?",
    question_ko: "어려운 고객을 응대했던 경험을 말씀해주세요. 어떻게 해결하셨나요?",
    category: "situational",
  },
  {
    question_en: "What would you do if a passenger refused to follow safety instructions?",
    question_ko: "승객이 안전 지침을 따르지 않는다면 어떻게 하시겠습니까?",
    category: "situational",
  },
  {
    question_en: "Why did you choose our airline over others?",
    question_ko: "왜 다른 항공사가 아닌 저희 항공사를 선택하셨나요?",
    category: "personal",
  },
  {
    question_en: "How do you handle stress and pressure in a fast-paced environment?",
    question_ko: "빠르게 돌아가는 환경에서 스트레스와 압박을 어떻게 관리하시나요?",
    category: "personal",
  },
];

export default function QuickInterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(
    SAMPLE_QUESTIONS[Math.floor(Math.random() * SAMPLE_QUESTIONS.length)]
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      setError("");
      setFeedback(null);
      setTranscribedText("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await processAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError("마이크 접근 권한이 필요합니다.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // 1. 음성을 텍스트로 변환
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const transcribeRes = await fetch("/api/interview/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!transcribeRes.ok) throw new Error("Transcription failed");

      const { text } = await transcribeRes.json();
      setTranscribedText(text);

      // 2. AI 피드백 받기
      const feedbackRes = await fetch("/api/interview/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question_en,
          answer: text,
          questionType: currentQuestion.category,
        }),
      });

      if (!feedbackRes.ok) throw new Error("Feedback failed");

      const feedbackData = await feedbackRes.json();
      setFeedback(feedbackData);
    } catch (err) {
      setError("처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsProcessing(false);
    }
  };

  const nextQuestion = () => {
    const newQuestion =
      SAMPLE_QUESTIONS[Math.floor(Math.random() * SAMPLE_QUESTIONS.length)];
    setCurrentQuestion(newQuestion);
    setFeedback(null);
    setTranscribedText("");
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">빠른 면접 연습</h1>

      {/* Question Card */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="text-sm text-blue-600 mb-2">
          {currentQuestion.category === "personal" ? "인성 면접" : "상황 면접"}
        </div>
        <p className="text-xl font-medium mb-2">{currentQuestion.question_en}</p>
        <p className="text-gray-500">{currentQuestion.question_ko}</p>
      </div>

      {/* Recording Controls */}
      <div className="flex justify-center gap-4 mb-6">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isProcessing}
            className="px-8 py-4 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="w-3 h-3 bg-white rounded-full"></span>
            녹음 시작
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-8 py-4 bg-gray-700 text-white rounded-full hover:bg-gray-800 flex items-center gap-2 animate-pulse"
          >
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            녹음 중... (클릭하여 종료)
          </button>
        )}

        <button
          onClick={nextQuestion}
          disabled={isRecording || isProcessing}
          className="px-6 py-4 border rounded-full hover:bg-gray-50 disabled:opacity-50"
        >
          다음 질문
        </button>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-gray-600">AI가 답변을 분석하고 있습니다...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Transcribed Text */}
      {transcribedText && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">내 답변 (음성 인식 결과)</h3>
          <p className="text-gray-700">{transcribedText}</p>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="space-y-6">
          {/* Scores */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "발음", score: feedback.pronunciation_score },
              { label: "문법", score: feedback.grammar_score },
              { label: "내용", score: feedback.content_score },
              { label: "종합", score: feedback.overall_score },
            ].map(({ label, score }) => (
              <div key={label} className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{score}/10</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          {/* Korean Feedback */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold mb-3">AI 피드백</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{feedback.feedback_ko}</p>
          </div>

          {/* Improved Answer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-blue-800">모범 답안 예시</h3>
            <p className="text-gray-700">{feedback.improved_answer}</p>
          </div>

          {/* Key Phrases */}
          {feedback.key_phrases && feedback.key_phrases.length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-3">유용한 표현</h3>
              <div className="flex flex-wrap gap-2">
                {feedback.key_phrases.map((phrase, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

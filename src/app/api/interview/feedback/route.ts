import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai";

const SYSTEM_PROMPT = `You are an experienced flight attendant interview coach for international airlines like Emirates, Qatar Airways, and Singapore Airlines.

Evaluate the candidate's answer and provide feedback in the following JSON format:
{
  "pronunciation_score": 1-10,
  "grammar_score": 1-10,
  "content_score": 1-10,
  "overall_score": 1-10,
  "feedback_en": "Detailed feedback in English",
  "feedback_ko": "한국어로 된 상세한 피드백",
  "improved_answer": "A better version of the answer",
  "key_phrases": ["useful phrases for this type of question"]
}

Be encouraging but honest. Focus on:
1. Professional vocabulary for cabin crew
2. STAR method (Situation, Task, Action, Result) for behavioral questions
3. Customer service mindset
4. Safety awareness`;

export async function POST(request: NextRequest) {
  try {
    const { question, answer, questionType } = await request.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Question (${questionType || "general"}): ${question}\n\nCandidate's Answer: ${answer}\n\nPlease evaluate this answer.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const feedback = JSON.parse(response.choices[0].message.content || "{}");

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}

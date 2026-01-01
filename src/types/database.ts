// Supabase Database Types

export interface Airline {
  id: string;
  name: string;
  name_en: string;
  country: string;
  logo_url: string | null;
  website_url: string | null;
  careers_url: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  airline_id: string | null;
  category: "personal" | "situational" | "english" | "service" | "group";
  question_ko: string;
  question_en: string | null;
  sample_answer: string | null;
  tips: string | null;
  difficulty: number;
  is_verified: boolean;
  source: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  airline?: Airline;
}

export interface InterviewSession {
  id: string;
  user_id: string;
  airline_id: string | null;
  session_type: "practice" | "mock";
  status: "in_progress" | "completed" | "abandoned";
  total_questions: number;
  completed_questions: number;
  overall_score: number | null;
  overall_feedback: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
  // Joined
  airline?: Airline;
  responses?: InterviewResponse[];
}

export interface InterviewResponse {
  id: string;
  session_id: string;
  question_id: string;
  question_order: number;
  user_answer_text: string | null;
  user_answer_audio_url: string | null;
  transcribed_text: string | null;
  ai_feedback: string | null;
  pronunciation_score: number | null;
  grammar_score: number | null;
  content_score: number | null;
  overall_score: number | null;
  response_time_seconds: number | null;
  created_at: string;
  updated_at: string;
  // Joined
  question?: Question;
}

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  target_airlines: string[] | null;
  created_at: string;
  updated_at: string;
}

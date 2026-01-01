import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AirlinesPage() {
  const supabase = await createClient();

  const { data: airlines } = await supabase
    .from("airlines")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">항공사 정보</h1>
        <p className="text-gray-600">
          외항사별 채용 정보와 면접 특징을 확인하세요
        </p>
      </div>

      {/* Airlines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {airlines?.map((airline) => (
          <Link
            key={airline.id}
            href={`/airlines/${airline.id}`}
            className="block p-6 border rounded-lg hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              {airline.logo_url ? (
                <img
                  src={airline.logo_url}
                  alt={airline.name}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                  Logo
                </div>
              )}
              <div>
                <h3 className="font-semibold">{airline.name}</h3>
                <p className="text-sm text-gray-500">{airline.name_en}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {airline.description || `${airline.country} 소재 항공사`}
            </p>
            {airline.careers_url && (
              <p className="text-xs text-blue-600 mt-2">채용 페이지 →</p>
            )}
          </Link>
        ))}

        {(!airlines || airlines.length === 0) && (
          <div className="col-span-full text-center py-12 text-gray-500">
            등록된 항공사가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

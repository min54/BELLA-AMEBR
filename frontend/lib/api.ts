const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type Language = "KR" | "JP";

export type ApplicationPayload = {
  name: string;
  sns_handle: string;
  email: string;
  reason: string;
  language: Language;
};

export type ApplicationResponse = {
  id: number;
  name: string;
  sns_handle: string;
  language: Language;
  created_at: string;
};

export async function submitApplication(
  payload: ApplicationPayload,
): Promise<ApplicationResponse> {
  const res = await fetch(`${API_BASE_URL}/api/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Submit failed: ${res.status} ${res.statusText} ${detail}`.trim(),
    );
  }

  return (await res.json()) as ApplicationResponse;
}

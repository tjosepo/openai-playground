import type { OpenAIResult } from "../../types.ts";

import "https://deno.land/std@0.138.0/dotenv/load.ts";
const OPENAI_KEY = Deno.env.get("OPENAI_KEY");

export const handler = async (req: Request): Promise<Response> => {
  let prompt;
  try {
    ({ prompt } = await req.json());
  } catch {
    return new Response("Bad Request", { status: 401 });
  }

  const data = {
    prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const res = await fetch(
    "https://api.openai.com/v1/engines/text-curie-001/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(data),
    },
  );

  const result = (await res.json()) as OpenAIResult;

  return new Response(result.choices[0].text);
};

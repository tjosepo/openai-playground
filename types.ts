export interface OpenAIResult {
  id: string;
  object: "text_completion";
  created: number;
  model: string;
  choices: OpenAIChoice[];
}

export interface OpenAIChoice {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: "stop";
}

export interface PromptResponse {
  timestamp: number;
  prompt: string;
  response: string;
}

export type OpenAIEngine =
  | "text-davinci-002"
  | "text-curie-001"
  | "text-babbage-001"
  | "text-ada-001";

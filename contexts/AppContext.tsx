/** @jsx h */
import {
  createContext,
  h,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "../deps/client.ts";
import { OpenAIEngine, PromptResponse } from "../types.ts";

export interface AppContext {
  addResponse(res: PromptResponse): void;
  clearResponses(): void;
  responses: PromptResponse[];
  setEngine(engine: OpenAIEngine): void;
  engine: string;
}

const AppContext = createContext<AppContext>({
  responses: [],
  addResponse() {},
  clearResponses() {},
  engine: "text-curie-001",
  setEngine() {},
});
export default AppContext;
export const useApp = () => useContext(AppContext);

interface AppProviderProps {
  children: h.JSX.Element | h.JSX.Element[];
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [responses, setResponses] = useState<PromptResponse[]>([]);
  const [engine, _setEngine] = useState<OpenAIEngine>("text-curie-001");

  useEffect(() => {
    const json = window.localStorage.getItem("open_ai_responses");
    if (!json) return;
    setResponses(JSON.parse(json) as PromptResponse[]);
  }, []);

  useEffect(() => {
    const engine = window.localStorage.getItem(
      "open_ai_engine"
    ) as OpenAIEngine;
    if (!engine) return;
    setEngine(engine);
  }, []);

  const addResponse = useCallback((res: PromptResponse) => {
    setResponses((prevRes) => {
      window.localStorage.setItem(
        "open_ai_responses",
        JSON.stringify([res, ...prevRes])
      );
      return [res, ...prevRes];
    });
  }, []);

  const clearResponses = useCallback(() => {
    setResponses(() => {
      window.localStorage.removeItem("open_ai_responses");
      return [];
    });
  }, []);

  const setEngine = useCallback((engine: OpenAIEngine) => {
    window.localStorage.setItem("open_ai_engine", engine);
    _setEngine(engine);
  }, []);

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          responses,
          addResponse,
          clearResponses,
          engine,
          setEngine,
        }),
        [responses, engine]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

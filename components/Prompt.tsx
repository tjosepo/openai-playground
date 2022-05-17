/** @jsx h */
import { useApp } from "../contexts/AppContext.tsx";
import { h, IS_BROWSER, tw, useState } from "../deps/client.ts";
import Dialog from "./Dialog.tsx";
import Settings from "./Settings.tsx";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const { addResponse, engine } = useApp();

  const onPrompt = async (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    if (loading) return;

    let res: Response;
    try {
      setLoading(true);
      res = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({ prompt, engine }),
      });
    } finally {
      setPrompt("");
      setLoading(false);
    }

    const response = await res.text();

    addResponse({ prompt, response, timestamp: Date.now() });
  };

  return (
    <form onSubmit={onPrompt} class={tw`h-full flex flex-col`}>
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <Settings />
      </Dialog>
      <div
        class={tw`h-16 px-5 flex items-center justify-between bg-gray-100 border border-gray-200`}
      >
        <p class={tw`font-medium text-xl`}>Prompt</p>

        <div class={tw`flex items-center justify-between gap-4`}>
          <button
            title="Settings"
            aria-label="Settings"
            type="button"
            class={tw`p-2 rounded hover:bg-gray-300`}
            onClick={() => setDialog(true)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.42857 2.42856C5.18875 2.42866 5.92735 2.68126 6.52838 3.1467C7.12941 3.61213 7.55881 4.26402 7.74914 4.99999H14.7143V6.71427H7.74914C7.53852 7.52041 7.04169 8.22232 6.35142 8.68896C5.66116 9.15559 4.82465 9.35505 3.9981 9.25007C3.17154 9.1451 2.41144 8.74288 1.85974 8.11851C1.30803 7.49415 1.00243 6.69032 1 5.85713C1 4.94782 1.36122 4.07575 2.00421 3.43276C2.64719 2.78978 3.51926 2.42856 4.42857 2.42856ZM4.42857 7.57141C4.88323 7.57141 5.31926 7.3908 5.64075 7.06931C5.96224 6.74782 6.14286 6.31179 6.14286 5.85713C6.14286 5.40247 5.96224 4.96644 5.64075 4.64495C5.31926 4.32346 4.88323 4.14284 4.42857 4.14284C3.97391 4.14284 3.53788 4.32346 3.21639 4.64495C2.8949 4.96644 2.71429 5.40247 2.71429 5.85713C2.71429 6.31179 2.8949 6.74782 3.21639 7.06931C3.53788 7.3908 3.97391 7.57141 4.42857 7.57141Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.9996 17C12.2394 16.9999 11.5008 16.7473 10.8998 16.2818C10.2987 15.8164 9.86934 15.1645 9.67901 14.4286H2.71387V12.7143H9.67901C9.88964 11.9081 10.3865 11.2062 11.0767 10.7396C11.767 10.2729 12.6035 10.0735 13.4301 10.1785C14.2566 10.2834 15.0167 10.6857 15.5684 11.31C16.1201 11.9344 16.4257 12.7382 16.4282 13.5714C16.4282 14.4807 16.0669 15.3528 15.4239 15.9958C14.781 16.6388 13.9089 17 12.9996 17ZM12.9996 15.2857C13.4542 15.2857 13.8903 15.1051 14.2118 14.7836C14.5333 14.4621 14.7139 14.0261 14.7139 13.5714C14.7139 13.1168 14.5333 12.6807 14.2118 12.3592C13.8903 12.0377 13.4542 11.8571 12.9996 11.8571C12.5449 11.8571 12.1089 12.0377 11.7874 12.3592C11.4659 12.6807 11.2853 13.1168 11.2853 13.5714C11.2853 14.0261 11.4659 14.4621 11.7874 14.7836C12.1089 15.1051 12.5449 15.2857 12.9996 15.2857Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button
            type="submit"
            class={tw`rounded py-1 px-5 transition bg-black text-white border-2 border-black outline-none hover:text-black focus:text-black hover:bg-white focus:bg-white focus:outline-none disabled:text-black disabled:bg-gray-200 disabled:border-gray-200 disabled:cursor-not-allowed`}
            disabled={!IS_BROWSER || loading || !prompt}
          >
            Send
          </button>
        </div>
      </div>
      <textarea
        id="prompt"
        class={tw`flex-grow outline-none px-4 py-2 text-sm w-full resize-none border-r-1 border-gray-200 min-h-[300px]`}
        onInput={(e) => setPrompt(e.currentTarget.value)}
        disabled={!IS_BROWSER || loading}
        value={prompt}
        placeholder="Type a prompt here..."
        required
      />
    </form>
  );
}

/** @jsx h */
import { useApp } from "../contexts/AppContext.tsx";
import { h, tw } from "../deps/client.ts";

export default function Responses() {
  const { responses } = useApp();
  return (
    <div class={tw`h-full flex flex-col`}>
      <div
        class={tw
          `h-16 px-5 flex items-center justify-between bg-gray-100 border-t border-r border-b border-gray-200`}
      >
        <p class={tw`font-medium text-xl`}>Responses</p>
      </div>
      <div
        class={tw
          `flex-grow sm:max-h-[calc(100vh-8rem)] flex flex-col p-4 gap-4 overflow-y-scroll`}
      >
        {responses.map((response) => (
          <div
            key={response.timestamp}
            class={tw`rounded w-full bg-gray-100 p-4 flex flex-col gap-2`}
          >
            <div class={tw`flex gap-2`}>
              <p class={tw`font-medium`}>Q:</p>
              <p>{response.prompt}</p>
            </div>
            <div class={tw`flex gap-2`}>
              <p class={tw`font-medium`}>A:</p>
              <p>{response.response}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

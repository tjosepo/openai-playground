/** @jsx h */
import { useApp } from "../contexts/AppContext.tsx";
import { h, tw } from "../deps/client.ts";

export default function Responses() {
  const { responses, clearResponses } = useApp();
  return (
    <div class={tw`h-full flex flex-col`}>
      <div
        class={tw`h-16 px-5 flex items-center justify-between bg-gray-100 border-t border-r border-b border-gray-200`}
      >
        <p class={tw`font-medium text-xl`}>Responses</p>
        <button
          title="Clear"
          aria-label="Clear"
          type="button"
          class={tw`p-1 rounded hover:bg-gray-300`}
          onClick={clearResponses}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 48 48"
          >
            <path d="M15 39H33Q33 39 33 39Q33 39 33 39V15H15V39Q15 39 15 39Q15 39 15 39ZM10.5 11V8H17.2L19.2 6H28.8L30.8 8H37.5V11ZM15 42Q13.8 42 12.9 41.1Q12 40.2 12 39V12H36V39Q36 40.2 35.1 41.1Q34.2 42 33 42ZM15 39H33Q33 39 33 39Q33 39 33 39H15Q15 39 15 39Q15 39 15 39Z" />
          </svg>
        </button>
      </div>
      <div
        class={tw`flex-grow sm:max-h-[calc(100vh-8rem)] flex flex-col p-4 gap-4 overflow-y-scroll`}
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

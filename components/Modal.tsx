/** @jsx h */
import { h, tw } from "../deps/client.ts";

interface ModalProps {
  children: h.JSX.Element | h.JSX.Element[];
  open: boolean;
  onClose(): void;
}
export default function Modal({ children, open, onClose }: ModalProps) {
  if (!open) return null;
  return (
    <div
      class={tw
        `fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center`}
    >
      <div
        class={tw
          `max-w-[90vw] sm:max-w-xl z-50 bg-white rounded-lg p-6 flex flex-col`}
      >
        <div
          role="button"
          class={tw`flex gap-2 group cursor-pointer mb-6`}
          onClick={onClose}
        >
          <div
            class={tw
              `flex justify-center items-center w-5 h-5 rounded border border-gray-300 text-gray-400 group-hover:border-gray-400 group-hover:text-gray-500 transition`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 13L5.5 8L10.5 3"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
              </path>
            </svg>
          </div>
          <span class={tw`text-sm text-gray-500 group-hover:text-gray-900`}>
            Back
          </span>
        </div>
        <div>{children}</div>
      </div>
      <div
        role="button"
        onClick={onClose}
        class={tw
          `z-40 absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 cursor-default`}
      />
    </div>
  );
}

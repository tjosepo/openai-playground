/** @jsx h */
import { h, tw, useRef, useEffect } from "../deps/client.ts";

interface DialogProps {
  children: h.JSX.Element | h.JSX.Element[];
  open: boolean;
  onClose(): void;
}
export default function Dialog({ children, open, onClose }: DialogProps) {
  const dialogRef = useRef<any>();

  useEffect(() => {
    if (open) dialogRef.current!.showModal();
  }, [open]);

  const onClick = (e: MouseEvent) => {
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={onClick}
      class={tw`bg-transparent p-0`}
    >
      <form
        method="dialog"
        class={tw`max-w-[90vw] sm:max-w-xl z-50 bg-white rounded-lg p-6 flex flex-col`}
      >
        <button
          type="submit"
          class={tw`flex gap-2 group mb-6 focus:outline-none`}
          onClick={onClose}
        >
          <div
            class={tw`flex justify-center items-center w-5 h-5 rounded border border-gray-300 text-gray-400 
            group-hover:border-gray-400 group-hover:text-gray-500 transition
            group-focus:border-gray-400 group-focus:text-gray-500`}
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
              ></path>
            </svg>
          </div>
          <span
            class={tw`text-sm text-gray-500 group-hover:text-gray-900 group-focus:text-gray-900`}
          >
            Back
          </span>
        </button>
        <div>{children}</div>
      </form>
    </dialog>
  );
}

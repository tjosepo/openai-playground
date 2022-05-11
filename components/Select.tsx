/** @jsx h */
import { h, tw } from "../deps/client.ts";

interface InputProps {
  label?: string;
  id?: string;
  onChange?(): void;
}
export default function Input({ label, id }: InputProps) {
  return (
    <div class={tw`flex items-center gap-1`}>
      {label && (
        <label id={id} class={tw`font-medium w-32`}>
          {label}
        </label>
      )}
      <input
        class={tw
          `flex-grow px-4 py-2 border rounded border-gray-200 outline-none focus:border-black focus:shadow`}
      />
    </div>
  );
}

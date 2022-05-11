/** @jsx h */
import { h, tw } from "../deps/client.ts";

interface InputProps {
  label?: string;
  id?: string;
  onChange?(e: any): void;
  children?: h.JSX.Element | h.JSX.Element[];
  type?: string;
  value?: string;
}
export default function Input({
  label,
  id,
  children,
  type,
  ...props
}: InputProps) {
  return (
    <div class={tw`flex items-center gap-1`}>
      {label && (
        <label id={id} class={tw`font-medium w-32`}>
          {label}
        </label>
      )}
      {type === "select" ? (
        <select
          id={id}
          {...props}
          class={tw`flex-grow px-4 py-2 border rounded border-gray-200 outline-none focus:border-black focus:shadow`}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          {...props}
          class={tw`flex-grow px-4 py-2 border rounded border-gray-200 outline-none focus:border-black focus:shadow`}
        />
      )}
    </div>
  );
}

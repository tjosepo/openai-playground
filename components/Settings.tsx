/** @jsx h */
import { useApp } from "../contexts/AppContext.tsx";
import { h, tw } from "../deps/client.ts";
import Input from "./Input.tsx";

export default function Settings() {
  const { engine, setEngine } = useApp();

  return (
    <div class={tw`flex flex-col gap-2`}>
      <Input
        type="select"
        label="Engine"
        value={engine}
        onChange={(e) => setEngine(e.currentTarget.value)}
      >
        <option value="text-davinci-002">text-davinci-002</option>
        <option value="text-curie-001">text-curie-001</option>
        <option value="text-babbage-001">text-babbage-001</option>
        <option value="text-ada-001">text-ada-001</option>
      </Input>
    </div>
  );
}

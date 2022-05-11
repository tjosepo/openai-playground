/** @jsx h */
import { h, IS_BROWSER, tw, useState } from "../deps/client.ts";
import { AppProvider } from "../contexts/AppContext.tsx";
import Prompt from "../components/Prompt.tsx";
import Responses from "../components/Responses.tsx";
import Header from "../components/Header.tsx";

export default function App() {
  return (
    <AppProvider>
      <Header />
      <div class={tw`h-[calc(100vh-4rem)] grid sm:grid-cols-2`}>
        <Prompt />
        <Responses />
      </div>
    </AppProvider>
  );
}

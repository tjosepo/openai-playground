/** @jsx h */
import { h, PageProps } from "../client_deps.ts";

export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}

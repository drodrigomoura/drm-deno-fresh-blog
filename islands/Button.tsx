import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

export default function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const [like, setLike] = useState(false);
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      onClick={() => setLike((prev) => !prev)}
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
    >
      {like ? "❤️ Quitar me gusta" : "🤍 Me gusta"} likes
    </button>
  );
}

import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS } from "$gfm/mod.ts";

import { loadPost } from "../../utils/posts.ts";
import Button from "../../islands/Button.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { id } = ctx.params;

    const post = await loadPost(id);

    return ctx.render(post);
  },
};

export default function PagePost(props: PageProps) {
  const { data } = props || {};
  return (
    <article class="p-4">
      <h1 class="text-2xl font-bold">{data?.title}</h1>
      <time>{Intl.DateTimeFormat("es").format(data?.date)}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: data?.body }}
      />
      <Button />
    </article>
  );
}

import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts } from "../utils/posts.ts";
import { Post } from "../types.d.ts";
import { logo } from "../utils/assets.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const posts = await listPosts();

    return ctx.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { data } = props;
  const { posts } = data;

  return (
    <main class="p-4">
      <div class="flex items-center">
        <img src={logo} alt="logo" />
        <h1 className="text-2xl">
          Mi blog drodrigomoura
        </h1>
      </div>

      {posts.map((post: Post) => (
        <article>
          <h2 class="text-2xl font-bold">
            <a class="hover:text-blue-500" href={`/blog/${post.id}`}>
              {post.title}
            </a>
          </h2>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
        </article>
      ))}
    </main>
  );
}

import { extract } from "$std/encoding/front_matter/any.ts";
import { render } from "$gfm/mod.ts";

import type { Post } from "../types.d.ts";

export async function loadPost(id: string): Promise<Post | null> {
  let raw: string;

  try {
    raw = await Deno.readTextFile(`./content/posts/${id}.md`);
  } catch {
    return null;
  }

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;

  const post: Post = {
    id,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: params.excerpt,
  };

  return post;
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];

  for await (const dirEntry of Deno.readDir("./content/posts")) {
    const { name } = dirEntry;
    const [id] = name.split(".");
    if (id) {
      promises.push(loadPost(id));
    }
  }

  const posts = await Promise.all(promises) as Post[];

  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return posts;
}

// export async function listPostsSequentially(): Promise<Posts[]> {
//   const posts = [];

//   for await (const dirEntry of Deno.readDir("./content/posts")) {
//     const { name } = dirEntry;
//     const [id] = name.split(".");
//     const post = await loadPost(id);

//     if (!post) {
//       continue;
//     }

//     posts.push(post);
//   }

//   console.log(posts);

//   return posts;
// }

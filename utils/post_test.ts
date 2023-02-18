import { assertEquals } from "$std/testing/asserts.ts";
import { loadPost } from "./posts.ts";

Deno.test("loadPost() returns null if the post does not exit", async () => {
  const post = await loadPost("no-exist");
  assertEquals(post, null);
});

Deno.test("loadPost() returns a post object if the post does exit", async () => {
  const post = await loadPost("hello-world");
  assertEquals(post?.id, "hello-world");
  assertEquals(post?.title, "Hello world");
});

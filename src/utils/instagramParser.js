export function parseInstagramLink(input) {
  const cleaned = input
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("?")[0]; // remove query params

  // STORY
  const storyMatch = cleaned.match(
    /^instagram\.com\/stories\/([^/]+)\/(\d+)/
  );

  if (storyMatch) {
    return {
      type: "story",
      username: storyMatch[1],
      storyId: storyMatch[2],
    };
  }

  // PROFILE
  const profileMatch = cleaned.match(
    /^instagram\.com\/([a-zA-Z0-9._]+)$/
  );

  if (profileMatch) {
    return {
      type: "profile",
      username: profileMatch[1],
      storyId: null,
    };
  }

  throw new Error("Invalid Instagram link");
}
module.exports = {
  layout: "post.njk",
  eleventyComputed: {
    permalink: (data) => `/${data.page.fileSlug}/index.html`,
  },
};

module.exports = {
  layout: "material.njk",
  eleventyComputed: {
    permalink: (data) => `/academy/${data.page.fileSlug}/index.html`,
  },
};

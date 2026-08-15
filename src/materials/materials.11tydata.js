module.exports = {
  layout: "material.njk",
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : `/academy/${data.page.fileSlug}/index.html`),
  },
};

module.exports = {
  layout: "material.njk",
  navSection: "academy",
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : `/academy/${data.page.fileSlug}/index.html`),
  },
};

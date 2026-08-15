module.exports = function (eleventyConfig) {
  // Copy every existing static page/asset through untouched.
  const passthroughFolders = [
    "about",
    "author",
    "category",
    "contact",
    "dictionary",
    "education",
    "form",
    "research",
    "wp-content",
    "wp-includes",
  ];
  passthroughFolders.forEach((folder) => {
    eleventyConfig.addPassthroughCopy(folder);
  });
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("sitemap-stylesheet.xsl");
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });

  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("kkDate", (dateObj) => {
    const months = [
      "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
      "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан",
    ];
    const d = new Date(dateObj);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};

module.exports = function (eleventyConfig) {
  // Copy every existing static page/asset through untouched.
  const passthroughFolders = [
    "about",
    "author",
    "category",
    "contact",
    "dictionary",
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

  eleventyConfig.addCollection("materials", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/materials/*.md").sort((a, b) => b.date - a.date);
  });

  // Turns a normal YouTube link into an embeddable one. Non-YouTube links
  // (SpeakerDeck, Google Slides "embed" links, etc.) are assumed to already
  // be embed-ready and are passed through unchanged.
  eleventyConfig.addFilter("embedSrc", (url) => {
    if (!url) return "";
    const watch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
    return url;
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

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || "https://uywakuna.info",
  generateRobotsTxt: true // (optional)
  // ...other options
};

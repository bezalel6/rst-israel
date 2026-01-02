import type { NextConfig } from "next";

const repoName = 'rst-israel'; // Change if your repo name is different
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
  // Set these for GitHub Pages
  ...(isGithubPages && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  })
};

export default nextConfig;

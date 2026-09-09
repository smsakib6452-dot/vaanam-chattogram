import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "vaanam-chattogram";

const nextConfig: NextConfig = {
  output: isGitHubActions ? "export" : undefined,
  basePath: isGitHubActions ? `/${repoName}` : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isGitHubActions ? true : false,
    qualities: [75, 80, 82, 85, 90],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubActions ? `/${repoName}` : "",
  },
};

export default nextConfig;

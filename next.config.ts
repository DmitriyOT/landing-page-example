import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статический экспорт — только HTML/CSS/JS, без сервера
  output: "export",

  // GitHub Pages не имеет сервера оптимизации изображений
  images: {
    unoptimized: true,
  },

  // Если деплоите на https://username.github.io/REPO-NAME/
  // раскомментируйте и укажите имя репозитория:
  basePath: "/landing-page-example",

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;

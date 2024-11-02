/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_DOMAIN_NAME: string; // 追加
  readonly NODE_ENV: string;
  readonly TAILWIND_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

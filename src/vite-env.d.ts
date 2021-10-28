/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_X_AUTHORIZATION: string;
  readonly VITE_RSA_PUBLIC_KEY: string;
  readonly VITE_PKSALT: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

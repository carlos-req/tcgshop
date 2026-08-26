import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Categories } from "./collections/Categories";
import { Customers } from "./collections/Customers";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@127.0.0.1:5432/tcgshop";

// Hosted Postgres (Supabase, etc.) requires SSL; a local Postgres (Docker or
// otherwise) doesn't support it, so key off the hostname rather than just
// "is DATABASE_URL set" — that way pointing DATABASE_URL back at localhost
// for local dev doesn't break the connection.
const isLocalDatabase = /^postgres(?:ql)?:\/\/[^@]*@(localhost|127\.0\.0\.1)/.test(
  connectionString,
);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  bodyParser: {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  },
  collections: [Users, Customers, Media, Categories, Products, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-payload-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString,
      ssl: isLocalDatabase ? undefined : { rejectUnauthorized: false },
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.SUPABASE_STORAGE_BUCKET || "",
      config: {
        endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
        region: process.env.SUPABASE_STORAGE_REGION || "us-east-1",
        credentials: {
          accessKeyId: process.env.SUPABASE_STORAGE_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.SUPABASE_STORAGE_SECRET_ACCESS_KEY || "",
        },
        forcePathStyle: true,
      },
    }),
  ],
  sharp,
});

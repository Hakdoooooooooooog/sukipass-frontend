import { z } from 'zod';

const EnvSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
});

const parsed = EnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid frontend environment variables:',
    z.flattenError(parsed.error).fieldErrors,
  );
  throw new Error('Invalid environment configuration');
}

export const env = parsed.data;

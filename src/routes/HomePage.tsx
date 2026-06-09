import { useGetHealth } from '../api/generated/sukipass';

export default function HomePage() {
  const { data, isLoading, isError } = useGetHealth();

  // NOTE: customInstance returns raw JSON, so at runtime `data` is the flat
  // HealthResponse object.  The generated wrapper type says `data.data.*`,
  // which is what TypeScript requires here; the runtime mismatch is a known
  // quirk of the generated client vs the custom fetch instance (see concern
  // in Task 6 report).
  const health = data?.data;

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold">SukiPass</h1>
      <section className="mt-4 rounded border p-4">
        <h2 className="font-semibold">Backend health</h2>
        {isLoading && <p>Checking…</p>}
        {isError && <p className="text-red-600">Could not reach the API.</p>}
        {health && (
          <ul className="mt-2 text-sm">
            <li>Status: {health.status}</li>
            <li>Database: {health.db}</li>
            <li>Timestamp: {health.timestamp}</li>
          </ul>
        )}
      </section>
    </main>
  );
}

import { useGetHealth } from '../api/generated/sukipass';

export default function HomePage() {
  const { data, isLoading, isError } = useGetHealth();

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold">SukiPass</h1>
      <section className="mt-4 rounded border p-4">
        <h2 className="font-semibold">Backend health</h2>
        {isLoading && <p>Checking…</p>}
        {isError && <p className="text-red-600">Could not reach the API.</p>}
        {data && (
          <ul className="mt-2 text-sm">
            <li>Status: {data.status}</li>
            <li>Database: {data.db}</li>
            <li>Timestamp: {data.timestamp}</li>
          </ul>
        )}
      </section>
    </main>
  );
}

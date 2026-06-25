export const metadata = {
  title: "Test Page",
  description: "Test page",
};

export default function TestPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Test Page
      </h1>
    </div>
  );
}

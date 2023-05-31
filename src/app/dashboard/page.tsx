import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Welcome
      <div className="absolute right-4 top-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </main>
  );
}

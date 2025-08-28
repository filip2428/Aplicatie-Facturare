import Header from "@/components/Header";
import GhostButton from "@/components/GhostButton";
export default function UsersPage() {
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Customers Page
      </h1>
      <div className="flex justify-center mt-10">
        <GhostButton href="/customers/list" textSize="lg">
          Current Customers List
        </GhostButton>
        <GhostButton href="/customers/new" textSize="lg">
          Create New Customer
        </GhostButton>
      </div>
    </>
  );
}

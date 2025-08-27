import Header from "@/components/Header";
import GhostButton from "@/components/GhostButton";
export default function UsersPage() {
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Users Page
      </h1>
      <div className="flex justify-center mt-10">
        <GhostButton href="/users/list" textSize="lg">
          Current Users List
        </GhostButton>
        <GhostButton href="/users/new" textSize="lg">
          Create New User
        </GhostButton>
      </div>
    </>
  );
}

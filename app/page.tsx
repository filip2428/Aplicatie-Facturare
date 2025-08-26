import Header from "../components/Header";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <h1 className="text-center text-6xl font-extrabold tracking-tight py-50">
        EasyInvoice. <span className="text-red-500">Your money.</span>
        <br />
        <span className="text-white">Our responsibility</span>
      </h1>
    </>
  );
}

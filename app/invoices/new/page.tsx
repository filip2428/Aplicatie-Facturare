import Header from "@/components/Header";
import SelectClient from "@/components/SelectClient";
import DatePicker from "@/components/DatePicker";
export default async function InvoicesNewPage() {
  return (
    <>
      <Header />
      <SelectClient />
      <DatePicker />
    </>
  );
}

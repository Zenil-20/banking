import HeaderBox from '@/components/HeaderBox';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from "next/navigation";

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    console.error("User is not logged in.");
    return redirect("/sign-in");
  }

  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) {
    console.error("No accounts found.");
    return;
  }

  return (
    <section className="payment-transfer">
      <HeaderBox 
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts.data} />
      </section>
    </section>
  );
};

export default Transfer;

import { ReactNode } from "react";

export async function generateMetadata() {
  return {
    title: "Transactions - Squareme Assessment",
    description: "Transaction history and details for Squareme Assessment",
  };
}

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

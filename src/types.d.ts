interface Transaction {
  id: string;
  amount: number;
  transaction_id: string;
  transaction_type: string;
  date: string;
  time: string;
  status: string;
}
interface TransactionApiResponse {
  id: { $oid?: string }; // Assuming it's an object with an "$oid" property
  amount: number;
  transaction_id: { $oid: string }; // Same assumption for transaction_id
  transaction_type: string;
  date: string;
  time: string;
  status: string;
}
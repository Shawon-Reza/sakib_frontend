export type UserAccountStatus = "Active" | "Invited" | "Suspended";

export type UserListItem = {
  id: string;
  userCode: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  joinedDate: string;
  totalInvoices: number;
  totalSpent: number;
  status: UserAccountStatus;
};

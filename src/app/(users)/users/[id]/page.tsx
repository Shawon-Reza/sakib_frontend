import { UserDetailsPage } from "@/components/features/users/details/user-details-page";
import { UserListItem } from "@/components/features/users/user-management-types";
import { InvoiceListItem } from "@/components/features/invoice/invoice-management-types";
import { Navbar1 } from "@/components/navbar1";
import { notFound } from "next/navigation";

// Mock data for users
const mockUsers: Record<string, UserListItem> = {
  "user-1001": {
    id: "user-1001",
    userCode: "USR-001",
    fullName: "Aminul Islam",
    email: "aminul@bestova.com",
    phone: "+8801711002233",
    role: "Owner",
    joinedDate: "2025-11-18",
    totalInvoices: 34,
    totalSpent: 782000,
    status: "Active",
  },
  "user-1002": {
    id: "user-1002",
    userCode: "USR-002",
    fullName: "Sadia Rahman",
    email: "sadia@madina-enterprise.com",
    phone: "+8801912556611",
    role: "Manager",
    joinedDate: "2026-01-05",
    totalInvoices: 13,
    totalSpent: 281300,
    status: "Invited",
  },
  "user-1003": {
    id: "user-1003",
    userCode: "USR-003",
    fullName: "Masud Hossain",
    email: "masud@sadarpaint.com",
    phone: "+8801888007788",
    role: "Staff",
    joinedDate: "2025-08-23",
    totalInvoices: 9,
    totalSpent: 145000,
    status: "Active",
  },
};

// Mock invoice data
const mockInvoices: InvoiceListItem[] = [
  {
    id: "inv-1001",
    invoiceNo: "KH-021",
    customerName: "MS MADINA ENTERPRISE & LACQUER CENTER",
    invoiceDate: "2026-01-22",
    itemCount: 14,
    grossTotal: 321420,
    dueAmount: 321420,
    status: "Due",
  },
  {
    id: "inv-1002",
    invoiceNo: "KH-022",
    customerName: "Sadar Paint House",
    invoiceDate: "2026-02-01",
    itemCount: 7,
    grossTotal: 102400,
    dueAmount: 20400,
    status: "Partial",
  },
  {
    id: "inv-1003",
    invoiceNo: "KH-023",
    customerName: "Bestova Traders",
    invoiceDate: "2026-02-08",
    itemCount: 4,
    grossTotal: 78300,
    dueAmount: 0,
    status: "Paid",
  },
  {
    id: "inv-1004",
    invoiceNo: "KH-024",
    customerName: "MS MADINA ENTERPRISE & LACQUER CENTER",
    invoiceDate: "2026-01-15",
    itemCount: 8,
    grossTotal: 156800,
    dueAmount: 78400,
    status: "Partial",
  },
  {
    id: "inv-1005",
    invoiceNo: "KH-025",
    customerName: "Sadar Paint House",
    invoiceDate: "2025-12-28",
    itemCount: 5,
    grossTotal: 89600,
    dueAmount: 0,
    status: "Paid",
  },
];

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Fetch user from mock data or API
  const user = mockUsers[id];

  if (!user) {
    notFound();
  }

  // In a real application, you would filter invoices by userId
  // For now, we're using mock data
  const userInvoices = mockInvoices;

  return (
    <div className="bg-[linear-gradient(to_bottom,#f8fafc,#eef2f7)]">
      <section className="mb-17">
        <Navbar1 className="scale-110 border-b fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur" />
      </section>
      <UserDetailsPage user={user} invoices={userInvoices} />
    </div>
  );
};

export default UserDetails;

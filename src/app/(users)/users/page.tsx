import { UserManagementPage } from "@/components/features/users/user-management-page";
import { UserListItem } from "@/components/features/users/user-management-types";
import { Navbar1 } from "@/components/navbar1";

const users: UserListItem[] = [
  {
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
  {
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
  {
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
  {
    id: "user-1004",
    userCode: "USR-004",
    fullName: "Farzana Akter",
    email: "farzana@northbridge.io",
    phone: "+8801766993322",
    role: "Manager",
    joinedDate: "2024-12-01",
    totalInvoices: 28,
    totalSpent: 502400,
    status: "Suspended",
  },
  {
    id: "user-1005",
    userCode: "USR-005",
    fullName: "Nabil Chowdhury",
    email: "nabil@bestova.com",
    phone: "+8801700771122",
    role: "Staff",
    joinedDate: "2026-02-17",
    totalInvoices: 4,
    totalSpent: 43200,
    status: "Invited",
  },
  {
    id: "user-1006",
    userCode: "USR-006",
    fullName: "Mithila Kabir",
    email: "mithila@tradevista.co",
    phone: "+8801555994433",
    role: "Owner",
    joinedDate: "2025-03-10",
    totalInvoices: 41,
    totalSpent: 953600,
    status: "Active",
  },
];

export default function UsersPage() {
  return (
    <div className="bg-[linear-gradient(to_bottom,#f8fafc,#eef2f7)]">
      <section className="mb-17">
        <Navbar1 className="scale-110 border-b fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur" />
      </section>
      <UserManagementPage users={users} />
    </div>
  );
}
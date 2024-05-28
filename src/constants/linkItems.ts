import {
  Users,
  LucideFileHeart,
  Building,
  ClipboardPenLineIcon,
  CalendarClock,
  UserX,
} from "lucide-react";

export const items = [
  { name: "Patients", icon: Users, href: "/patients" },
  { name: "Questionnaires", icon: LucideFileHeart, href: "/questionnaires" },
  {
    name: "Medical Records",
    icon: ClipboardPenLineIcon,
    href: "/medical_record",
  },
  { name: "Organizations", icon: Building, href: "/organizations" },
  { name: "Appointments", icon: CalendarClock, href: "/appointments" },
  { name: "Practitioners", icon: UserX, href: "/practitioners" },
];

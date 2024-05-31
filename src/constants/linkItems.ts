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
  { name: "Encounters", icon: ClipboardPenLineIcon, href: "/encounters"},
  { name: "Questionnaires", icon: LucideFileHeart, href: "/questionnaires" },
  { name: "Organizations", icon: Building, href: "/organizations" },
  { name: "Appointments", icon: CalendarClock, href: "/appointments" },
  { name: "Practitioners", icon: UserX, href: "/practitioners" },
];

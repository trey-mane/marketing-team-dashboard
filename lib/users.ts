export type UserRole = "creative-director" | "video-editor" | "ads-director";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hash
  role: UserRole;
}

// Default passwords (change via /dashboard/admin or update hashes directly):
// creative-director@team.com  → Creative2024!
// video-editor@team.com       → Video2024!
// ads-director@team.com       → Ads2024!
export const USERS: AppUser[] = [
  {
    id: "1",
    name: "Creative Director",
    email: "creative-director@team.com",
    password: "$2b$12$5riXGuMLQhMd/j.5Uxj6XeaqLuRYa6p8nOOTNCGUAKWvc9OEmhcYq",
    role: "creative-director",
  },
  {
    id: "2",
    name: "Video Editor",
    email: "video-editor@team.com",
    password: "$2b$12$wAazbGRHN3nDpo2fFbgPgesdv9G.6yU69qCukoN8zOgG1tLfclQji",
    role: "video-editor",
  },
  {
    id: "3",
    name: "Ads Director",
    email: "ads-director@team.com",
    password: "$2b$12$xZl.EfnoACw38QspPaAzfuKM3xpvqh4CmbV3ThokvdH/kfNVEWKci",
    role: "ads-director",
  },
];

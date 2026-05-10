export type UserRole = "creative-director" | "video-editor" | "ads-director";

export interface AppUser {
  id: string;
  name: string;
  username: string;
  password: string; // bcrypt hash
  role: UserRole;
}

export const USERS: AppUser[] = [
  {
    id: "1",
    name: "Ryan Tom",
    username: "ryantom",
    password: "$2b$12$mQwmbWoQ8yFzWiu4ipcg/udO7Q0hJNdOAEXiOuuVhyTXSz6eGbuii",
    role: "creative-director",
  },
  {
    id: "2",
    name: "Rochelle Gamboa",
    username: "rochellegamboa",
    password: "$2b$12$zJoVZ03uHRHhdKs6bB3.yuUcEv9evEnsldC4gW8xKCimoIywxrBxa",
    role: "video-editor",
  },
  {
    id: "3",
    name: "Cole Baker",
    username: "colebaker",
    password: "$2b$12$nvHKwi8ViJKJe1sjP0owi.Ccth3jrcA97GRr3veW1xFMLV0rr2Diy",
    role: "ads-director",
  },
];

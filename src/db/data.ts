import { v4 as uuidv4 } from "uuid";
import { User } from ".";

export const defaultUsers: User[] = [
  {
    id: uuidv4(),
    name: "Utilisateur Standard",
    email: "user@gmail.com",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Administrateur",
    email: "admin@gmail.com",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import { defaultUsers } from "./data";

// Définition des types
export type UserRole = "admin" | "user" | "editor";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  password?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour la base de données
interface DatabaseSchema {
  users: User[];
}

// Création d'utilisateurs par défaut

// Initialisation de la base de données avec les utilisateurs par défaut
const dbFile = process.env.DB_FILE_PATH || join(process.cwd(), "db.json");
console.log("Chemin du fichier DB:", dbFile);

// Vérification et création explicite du fichier si nécessaire
async function initializeDb() {
  try {
    try {
      await fs.access(dbFile);
      console.log("Le fichier existe déjà");
    } catch {
      // Le fichier n'existe pas, le créer
      await fs.writeFile(dbFile, JSON.stringify({ users: defaultUsers }));
      console.log("Fichier DB créé manuellement");
    }

    const adapter = new JSONFile<DatabaseSchema>(dbFile);
    const db = new Low<DatabaseSchema>(adapter, { users: defaultUsers });

    await db.read();
    if (!db.data) {
      db.data = { users: defaultUsers };
      await db.write();
      console.log("DB initialisée avec les données par défaut");
    }

    return db;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la DB:", error);
    throw error;
  }
}

// Créer et exporter une instance unique de la DB
let dbInstance: Low<DatabaseSchema>;

// Synchronisation initiale avec le fichier
async function syncDb() {
  if (!dbInstance) {
    dbInstance = await initializeDb();
  }

  await dbInstance.read();
  dbInstance.data ||= { users: defaultUsers };
  return dbInstance.data;
}

// CRUD Operations

/**
 * Crée un nouvel utilisateur
 */
export async function createUser(
  userData: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> {
  const data = await syncDb();

  // Vérification si l'email existe déjà
  const existingUser = data.users.find((user) => user.email === userData.email);
  if (existingUser) {
    throw new Error(`L'utilisateur avec l'email ${userData.email} existe déjà`);
  }

  const now = new Date();

  const newUser: User = {
    id: uuidv4(),
    ...userData,
    createdAt: now,
    updatedAt: now,
  };

  data.users.push(newUser);
  await dbInstance.write();

  return newUser;
}

/**
 * Récupère un utilisateur par son ID
 */
export async function getUser(id: string): Promise<User | undefined> {
  const data = await syncDb();
  return data.users.find((user) => user.id === id);
}

/**
 * Récupère un utilisateur par son email
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const data = await syncDb();
  return data.users.find((user) => user.email === email);
}

/**
 * Récupère tous les utilisateurs
 */
export async function getUsers(): Promise<User[]> {
  const data = await syncDb();
  return data.users;
}

/**
 * Met à jour un utilisateur
 */
export async function updateUser(
  id: string,
  userData: Partial<Omit<User, "id" | "createdAt">>
): Promise<User | undefined> {
  const data = await syncDb();

  const userIndex = data.users.findIndex((user) => user.id === id);
  if (userIndex === -1) return undefined;

  // Si l'email est modifié, vérifier qu'il n'existe pas déjà
  if (userData.email) {
    const emailExists = data.users.some(
      (user) => user.email === userData.email && user.id !== id
    );
    if (emailExists) {
      throw new Error(
        `L'email ${userData.email} est déjà utilisé par un autre compte`
      );
    }
  }

  data.users[userIndex] = {
    ...data.users[userIndex],
    ...userData,
    updatedAt: new Date(),
  };

  await dbInstance.write();
  return data.users[userIndex];
}

/**
 * Supprime un utilisateur
 */
export async function deleteUser(id: string): Promise<boolean> {
  const data = await syncDb();

  const initialLength = data.users.length;
  data.users = data.users.filter((user) => user.id !== id);

  if (initialLength === data.users.length) return false;

  await dbInstance.write();
  return true;
}

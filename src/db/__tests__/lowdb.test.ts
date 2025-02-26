import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { join } from "path";
import fs from "fs/promises";

// Après avoir défini les mocks, importer le module à tester
import {
  createUser,
  getUser,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
} from "../index";

// Chemins des fichiers

const MAIN_DB_FILE = join(process.cwd(), "db.json");

// Configurons l'environnement pour utiliser le fichier de test
process.env.DB_FILE_PATH = MAIN_DB_FILE;

// Avant chaque test, réinitialiser le fichier de base de données de test
beforeAll(async () => {
  // Créer un fichier de test vide avec une structure valide
  await fs.writeFile(MAIN_DB_FILE, JSON.stringify({ users: [] }));
});

// Après tous les tests, nettoyer les fichiers
afterAll(async () => {
  try {
    // Supprimer le fichier de test
    await fs.unlink(MAIN_DB_FILE);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Ignorer les erreurs si le fichier n'existe pas
  }

  // Réinitialiser également le fichier de base de données principal
  try {
    await fs.writeFile(MAIN_DB_FILE, JSON.stringify({ users: [] }, null, 2));
    console.log("✅ Fichier de base de données principal réinitialisé");
  } catch (error) {
    console.error(
      "❌ Erreur lors de la réinitialisation du fichier principal:",
      error
    );
  }
});

describe("CRUD Utilisateurs", () => {
  it("devrait créer un nouvel utilisateur", async () => {
    const userData = {
      name: "Jean Dupont",
      email: "jean@example.com",
      role: "user" as const,
    };

    const user = await createUser(userData);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.role).toBe(userData.role);
    expect(user).toHaveProperty("createdAt");
    expect(user).toHaveProperty("updatedAt");
  });

  it("devrait échouer lors de la création d'un utilisateur avec un email existant", async () => {
    const userData = {
      name: "Jean Dupont",
      email: "jean@example.com",
      role: "user" as const,
    };

    //await createUser(userData);

    await expect(createUser(userData)).rejects.toThrow(/existe déjà/);
  });

  it("devrait récupérer un utilisateur par ID", async () => {
    const userData = {
      name: "Marie Martin",
      email: "marie@example.com",
      role: "editor" as const,
    };

    const createdUser = await createUser(userData);
    const fetchedUser = await getUser(createdUser.id);

    expect(fetchedUser).toMatchObject({
      id: createdUser.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });

    expect(fetchedUser).toHaveProperty("createdAt");
    expect(fetchedUser).toHaveProperty("updatedAt");
  });

  it("devrait récupérer un utilisateur par email", async () => {
    const userData = {
      name: "Pierre Paul",
      email: "pierre@example.com",
      role: "admin" as const,
    };

    const createdUser = await createUser(userData);
    const fetchedUser = await getUserByEmail(userData.email);

    expect(fetchedUser).toMatchObject({
      id: createdUser.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });

    expect(fetchedUser).toHaveProperty("createdAt");
    expect(fetchedUser).toHaveProperty("updatedAt");
  });

  it("devrait récupérer tous les utilisateurs", async () => {
    await fs.writeFile(MAIN_DB_FILE, JSON.stringify({ users: [] }));
    const users = [
      { name: "User 1", email: "user1@example.com", role: "user" as const },
      { name: "User 2", email: "user2@example.com", role: "editor" as const },
      { name: "User 3", email: "user3@example.com", role: "admin" as const },
    ];

    for (const userData of users) {
      await createUser(userData);
    }

    const allUsers = await getUsers();

    expect(allUsers).toHaveLength(users.length);
    expect(allUsers.map((u) => u.email)).toEqual(
      expect.arrayContaining(users.map((u) => u.email))
    );
  });

  it("devrait mettre à jour un utilisateur", async () => {
    const userData = {
      name: "Sophie Dubois",
      email: "sophie@example.com",
      role: "user" as const,
    };

    const createdUser = await createUser(userData);

    const updateData = {
      name: "Sophie Martin",
      role: "editor" as const,
    };

    const updatedUser = await updateUser(createdUser.id, updateData);

    expect(updatedUser?.name).toBe(updateData.name);
    expect(updatedUser?.role).toBe(updateData.role);
    expect(updatedUser?.email).toBe(userData.email);
    expect(updatedUser?.updatedAt).not.toEqual(createdUser.updatedAt);
  });

  it("devrait échouer lors de la mise à jour avec un email existant", async () => {
    await fs.writeFile(MAIN_DB_FILE, JSON.stringify({ users: [] }));
    await createUser({
      name: "User 1",
      email: "existing@example.com",
      role: "user" as const,
    });

    const user2 = await createUser({
      name: "User 2",
      email: "user2@example.com",
      role: "user" as const,
    });

    await expect(
      updateUser(user2.id, { email: "existing@example.com" })
    ).rejects.toThrow(/déjà utilisé/);
  });

  it("devrait supprimer un utilisateur", async () => {
    const userData = {
      name: "Marc Blanc",
      email: "marc@example.com",
      role: "user" as const,
    };

    const createdUser = await createUser(userData);

    const result = await deleteUser(createdUser.id);
    expect(result).toBe(true);

    const user = await getUser(createdUser.id);
    expect(user).toBeUndefined();
  });

  it("devrait retourner false lors de la suppression d'un utilisateur inexistant", async () => {
    const result = await deleteUser("non-existent-id");
    expect(result).toBe(false);
  });

  it("devrait gérer les images d'utilisateur", async () => {
    const userData = {
      name: "User avec image",
      email: "image@example.com",
      role: "user" as const,
      image: "https://example.com/avatar.jpg",
    };

    const user = await createUser(userData);
    expect(user.image).toBe(userData.image);
  });
});

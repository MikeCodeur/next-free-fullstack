"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { createUser } from "@/db";

/**
 * Action de login utilisant NextAuth
 */
export async function login(formData: FormData) {
  console.log("login appelé");
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return {
        success: false,
        message: "Email et mot de passe requis",
      };
    }
    console.log(" avant signIn", email);
    // Utilisation de l'API de signIn côté serveur
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(" après signIn");
    // Si tout se passe bien, rediriger vers le tableau de bord
    redirect("/dashboard");
  } catch (error) {
    //https://github.com/nextauthjs/next-auth/discussions/9389#discussioncomment-8046451
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(" erreur", error);
    // Gérer les erreurs d'authentification
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Identifiants invalides",
      };
    }

    // Gérer les autres erreurs
    return {
      success: false,
      message: "Une erreur est survenue lors de la connexion",
    };
  }
}

/**
 * Action d'inscription d'un nouvel utilisateur
 */
export async function register(formData: FormData) {
  console.log("register appelé");
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validation basique
    if (!name || !email || !password) {
      return {
        success: false,
        message: "Tous les champs sont requis",
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Les mots de passe ne correspondent pas",
      };
    }

    // Créer l'utilisateur dans la base de données
    try {
      const user = await createUser({
        name,
        email,
        password,
        role: "user",
      });

      await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      console.log("Utilisateur créé:", user);

      // Connecter l'utilisateur automatiquement
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Rediriger vers le tableau de bord
      redirect("/dashboard");
    } catch (error) {
      //https://github.com/nextauthjs/next-auth/discussions/9389#discussioncomment-8046451
      if (isRedirectError(error)) {
        throw error;
      }
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de la création du compte",
      };
    }
  } catch (error) {
    // Gérer les erreurs de redirection
    if (isRedirectError(error)) {
      throw error;
    }

    console.log("Erreur d'inscription:", error);

    return {
      success: false,
      message: "Une erreur est survenue lors de l'inscription",
    };
  }
}

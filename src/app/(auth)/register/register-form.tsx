"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "../action";
import { useState } from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await register(formData);

    if (result && !result.success) {
      setError(result.message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Créer un compte</CardTitle>
          <CardDescription>
            Inscrivez-vous pour accéder à votre espace personnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jean Dupont"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jean@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                S&apos;inscrire
              </Button>
              <div className="text-center text-sm">
                Vous avez déjà un compte?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Se connecter
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        En vous inscrivant, vous acceptez nos{" "}
        <a href="#">Conditions d&apos;utilisation</a> et notre{" "}
        <a href="#">Politique de confidentialité</a>.
      </div>
    </div>
  );
}

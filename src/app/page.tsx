import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Navigation - Ajusté pour supprimer l'espace */}
      <header className="w-full flex items-center justify-between py-4 border-b px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="font-bold text-xl">
            Resend
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Entreprise
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Ressources
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Documentation
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Tarifs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="text-sm hover:underline hidden sm:inline-block"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="text-sm hover:underline hidden sm:inline-block"
          >
            S&apos;inscrire
          </Link>
          <Button size="sm" className="sm:hidden">
            Essayer
          </Button>
          <Button className="hidden sm:flex">Commencer</Button>
          <ModeToggle />
        </div>
      </header>

      {/* Hero Section - Ajusté pour supprimer l'espace */}
      <main className="flex-1 w-full">
        <section className="w-full flex flex-col items-center justify-center py-10 sm:py-20 text-center px-4 sm:px-6 lg:px-8">
          {/* Email Icon - Responsive */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-lg">
            <div className="w-12 h-10 sm:w-16 sm:h-12 border-2 border-black dark:border-white rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="14"
                viewBox="0 0 24 18"
                fill="none"
                stroke="currentColor"
                className="text-black dark:text-white"
              >
                <path
                  d="M21.75 4.5V15C21.75 15.5967 21.5129 16.169 21.091 16.591C20.669 17.0129 20.0967 17.25 19.5 17.25H4.5C3.90326 17.25 3.33097 17.0129 2.90901 16.591C2.48705 16.169 2.25 15.5967 2.25 15V4.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.75 4.5L12 11.25L2.25 4.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.25 4.5H19.5C20.0967 4.5 20.669 4.26295 21.091 3.84099C21.5129 3.41903 21.75 2.84674 21.75 2.25H4.5C3.90326 2.25 3.33097 2.48705 2.90901 2.90901C2.48705 3.33097 2.25 3.90326 2.25 4.5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Hero Text - Responsive */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Intégrez <span className="text-amber-500">cet après-midi</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-12 text-muted-foreground">
            Une interface simple et élégante pour commencer à envoyer des emails
            en quelques minutes. S&apos;intègre facilement dans votre code avec
            des SDKs pour vos langages de programmation préférés.
          </p>

          {/* Language Icons - Meilleure disposition mobile */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2 sm:gap-4 mb-8 sm:mb-12 w-full max-w-3xl">
            {[
              "Node.js",
              "Serverless",
              "Ruby",
              "Python",
              "PHP",
              "Go",
              "Rust",
              "Java",
              "Elixir",
              ".NET",
              "SMTP",
            ].map((lang) => (
              <div key={lang} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-md border border-border flex items-center justify-center">
                  <span className="text-xs">
                    {lang === "Node.js" ? "JS" : lang === ".NET" ? "NET" : lang}
                  </span>
                </div>
                <span className="text-xs">{lang}</span>
              </div>
            ))}
          </div>

          {/* Code Example - Plus adapté au mobile */}
          <div className="w-full max-w-3xl bg-black text-white rounded-lg overflow-hidden text-left">
            <div className="flex items-center px-2 sm:px-4 py-2 bg-black/80 border-b border-gray-700">
              <div className="bg-amber-500 text-black px-2 py-1 rounded text-xs mr-2">
                Node.js
              </div>
              <div className="text-gray-400 text-xs">Next.js</div>
            </div>
            <pre className="p-3 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono">
              <code>{`import { Resend } from 'resend';

const resend = new Resend('re_123456789');

(async function() {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'delivered@resend.dev',
    subject: 'Hello World',
    html: '<strong>It works!</strong>'
  });

  if (error) {
    return console.log(error);
  }

  console.log(data);
})();`}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

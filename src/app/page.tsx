import {ModeToggle} from '@/components/theme-toggle'
import {Button} from '@/components/ui/button'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Navigation - Ajusté pour supprimer l'espace */}
      <header className="flex w-full items-center justify-between border-b px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="text-xl font-bold">
            Resend
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Entreprise
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Ressources
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Documentation
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Tarifs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="hidden text-sm hover:underline sm:inline-block"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="hidden text-sm hover:underline sm:inline-block"
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
      <main className="w-full flex-1">
        <section className="flex w-full flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-20 lg:px-8">
          {/* Email Icon - Responsive */}
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg sm:mb-10 sm:h-32 sm:w-32">
            <div className="flex h-10 w-12 items-center justify-center rounded-md border-2 border-black sm:h-12 sm:w-16 dark:border-white">
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
          <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl">
            Intégrez <span className="text-amber-500">cet après-midi</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl text-base sm:mb-12 sm:text-lg md:text-xl">
            Une interface simple et élégante pour commencer à envoyer des emails
            en quelques minutes. S&apos;intègre facilement dans votre code avec
            des SDKs pour vos langages de programmation préférés.
          </p>

          {/* Language Icons - Meilleure disposition mobile */}
          <div className="mb-8 grid w-full max-w-3xl grid-cols-3 gap-2 sm:mb-12 sm:grid-cols-4 sm:gap-4 md:grid-cols-6 lg:grid-cols-11">
            {[
              'Node.js',
              'Serverless',
              'Ruby',
              'Python',
              'PHP',
              'Go',
              'Rust',
              'Java',
              'Elixir',
              '.NET',
              'SMTP',
            ].map((lang) => (
              <div key={lang} className="flex flex-col items-center gap-2">
                <div className="border-border flex h-14 w-14 items-center justify-center rounded-md border">
                  <span className="text-xs">
                    {lang === 'Node.js' ? 'JS' : lang === '.NET' ? 'NET' : lang}
                  </span>
                </div>
                <span className="text-xs">{lang}</span>
              </div>
            ))}
          </div>

          {/* Code Example - Plus adapté au mobile */}
          <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-black text-left text-white">
            <div className="flex items-center border-b border-gray-700 bg-black/80 px-2 py-2 sm:px-4">
              <div className="mr-2 rounded bg-amber-500 px-2 py-1 text-xs text-black">
                Node.js
              </div>
              <div className="text-xs text-gray-400">Next.js</div>
            </div>
            <pre className="overflow-x-auto p-3 font-mono text-xs sm:p-6 sm:text-sm">
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
  )
}

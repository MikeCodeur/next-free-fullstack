"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  Percent,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export default function DashboardPage() {
  // Données pour les graphiques
  const revenueData = [
    { date: "Jan", Revenu: 5250 },
    { date: "Fév", Revenu: 8750 },
    { date: "Mar", Revenu: 7500 },
    { date: "Avr", Revenu: 9000 },
    { date: "Mai", Revenu: 11500 },
    { date: "Juin", Revenu: 15250 },
  ];

  const salesData = [
    { name: "Produit A", Ventes: 256 },
    { name: "Produit B", Ventes: 450 },
    { name: "Produit C", Ventes: 320 },
    { name: "Produit D", Ventes: 280 },
    { name: "Produit E", Ventes: 150 },
  ];

  // Configuration des couleurs et labels pour les graphiques selon les conventions Shadcn
  const revenueChartConfig = {
    Revenu: {
      label: "Revenu",
      theme: {
        light: "var(--chart-3)",
        dark: "var(--chart-3)",
      },
    },
  } satisfies ChartConfig;

  const salesChartConfig = {
    Ventes: {
      label: "Ventes",
      theme: {
        light: "var(--chart-3)",
        dark: "var(--chart-3)",
      },
    },
  } satisfies ChartConfig;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de Bord</h2>
        <div className="flex items-center space-x-2">
          {/* Pas de contenu supplémentaire ici */}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenu Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 231,89 €</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    +20,1%
                  </span>
                  <span>par rapport au mois dernier</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Nouveaux Clients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2 350</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    +18,2%
                  </span>
                  <span>par rapport au mois dernier</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taux de Conversion
                </CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,5%</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="text-rose-500 flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    -2,5%
                  </span>
                  <span>par rapport au mois dernier</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Valeur Moyenne
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85,50 €</div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="text-emerald-500 flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    +7,2%
                  </span>
                  <span>par rapport au mois dernier</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenus Mensuels</CardTitle>
                <CardDescription>
                  L&apos;évolution des revenus sur les 6 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="min-h-[320px]"
                  config={revenueChartConfig}
                >
                  <LineChart
                    accessibilityLayer
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis
                      tickFormatter={(value) => `${value.toLocaleString()} €`}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => [
                            `${value.toLocaleString()} €`,
                            "Revenu",
                          ]}
                        />
                      }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="Revenu"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Répartition des Ventes</CardTitle>
                <CardDescription>
                  Distribution des ventes par catégorie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="min-h-[320px]"
                  config={salesChartConfig}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={salesData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis
                        tickFormatter={(value) => `${value} u.`}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value) => [`${value} unités`, "Ventes"]}
                          />
                        }
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar
                        dataKey="Ventes"
                        fill="var(--color-Ventes)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Transactions Récentes</CardTitle>
                <CardDescription>
                  Les 5 dernières transactions effectuées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "#TR-123",
                      client: "Martin Dupont",
                      montant: "422,50 €",
                      statut: "Complété",
                    },
                    {
                      id: "#TR-124",
                      client: "Sophie Laurent",
                      montant: "87,25 €",
                      statut: "En attente",
                    },
                    {
                      id: "#TR-125",
                      client: "Julien Moreau",
                      montant: "245,99 €",
                      statut: "Complété",
                    },
                    {
                      id: "#TR-126",
                      client: "Laura Blanc",
                      montant: "650,00 €",
                      statut: "En attente",
                    },
                    {
                      id: "#TR-127",
                      client: "Thomas Petit",
                      montant: "120,75 €",
                      statut: "Complété",
                    },
                  ].map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="font-medium">{transaction.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.client}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>{transaction.montant}</div>
                        <div
                          className={`text-xs font-medium rounded-full px-2 py-1 ${
                            transaction.statut === "Complété"
                              ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
                          }`}
                        >
                          {transaction.statut}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Objectifs Trimestriels</CardTitle>
                <CardDescription>
                  Progression vers les objectifs du trimestre actuel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Acquisition</div>
                    <div className="text-sm text-muted-foreground">
                      75% (4 500/6 000)
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Fidélisation</div>
                    <div className="text-sm text-muted-foreground">
                      90% (2 700/3 000)
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      Chiffre d&apos;affaires
                    </div>
                    <div className="text-sm text-muted-foreground">
                      65% (650k/1M)
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-indigo-500 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      Satisfaction client
                    </div>
                    <div className="text-sm text-muted-foreground">
                      82% (4,1/5)
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-amber-500 rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytiques détaillées</CardTitle>
                <CardDescription>
                  Module d&apos;analytiques en cours de développement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Le module d&apos;analytiques sera disponible prochainement.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapports</CardTitle>
                <CardDescription>
                  Module de rapports en cours de développement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Le module de rapports sera disponible prochainement.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

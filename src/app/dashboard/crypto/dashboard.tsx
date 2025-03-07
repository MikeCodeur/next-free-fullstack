'use client'

import {useState} from 'react'
import {
  ArrowUp,
  Bitcoin,
  ChevronDown,
  Clock,
  DollarSign,
  LineChart,
  MoreHorizontal,
  RefreshCcw,
  Settings,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from 'recharts'

import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

// Sample crypto data
const cryptoData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 63245.32,
    change: 2.34,
    marketCap: 1234.5,
    volume: 42.3,
    icon: Bitcoin,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.78,
    change: -1.23,
    marketCap: 412.3,
    volume: 23.1,
    icon: Bitcoin,
  },
  {
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 567.89,
    change: 0.45,
    marketCap: 94.2,
    volume: 12.5,
    icon: Bitcoin,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 123.45,
    change: 5.67,
    marketCap: 45.6,
    volume: 8.9,
    icon: Bitcoin,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
    change: -2.34,
    marketCap: 15.7,
    volume: 5.4,
    icon: Bitcoin,
  },
]

// Sample price history data
const priceHistoryData = [
  {date: 'Jan', BTC: 42000, ETH: 3200, SOL: 100},
  {date: 'Feb', BTC: 44500, ETH: 3100, SOL: 105},
  {date: 'Mar', BTC: 47000, ETH: 3300, SOL: 110},
  {date: 'Apr', BTC: 45000, ETH: 3000, SOL: 95},
  {date: 'May', BTC: 50000, ETH: 3400, SOL: 120},
  {date: 'Jun', BTC: 55000, ETH: 3600, SOL: 130},
  {date: 'Jul', BTC: 60000, ETH: 3800, SOL: 140},
  {date: 'Aug', BTC: 58000, ETH: 3700, SOL: 135},
  {date: 'Sep', BTC: 62000, ETH: 3900, SOL: 145},
  {date: 'Oct', BTC: 63000, ETH: 3950, SOL: 150},
  {date: 'Nov', BTC: 61000, ETH: 3850, SOL: 140},
  {date: 'Dec', BTC: 63245, ETH: 3950, SOL: 155},
]

// Sample volume data
const volumeData = [
  {date: 'Jan', volume: 32},
  {date: 'Feb', volume: 28},
  {date: 'Mar', volume: 36},
  {date: 'Apr', volume: 40},
  {date: 'May', volume: 42},
  {date: 'Jun', volume: 38},
  {date: 'Jul', volume: 45},
  {date: 'Aug', volume: 50},
  {date: 'Sep', volume: 55},
  {date: 'Oct', volume: 48},
  {date: 'Nov', volume: 52},
  {date: 'Dec', volume: 58},
]

export default function CryptoDashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC')
  const [timeframe, setTimeframe] = useState('1Y')

  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <header className="bg-background sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4 md:px-6">
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6" />
          <span className="text-lg font-semibold">CryptoView</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <RefreshCcw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Portfolio Value
              </CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345.67</div>
              <p className="text-muted-foreground text-xs">+$123.45 (2.3%)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                24h Trading Volume
              </CardTitle>
              <LineChart className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$987.65B</div>
              <p className="text-muted-foreground text-xs">
                +5.4% from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Dominance
              </CardTitle>
              <Bitcoin className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">BTC: 42.3%</div>
              <p className="text-muted-foreground text-xs">ETH: 19.2%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Sentiment
              </CardTitle>
              <ArrowUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Bullish</div>
              <p className="text-muted-foreground text-xs">
                Fear & Greed Index: 72
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Price Chart</CardTitle>
                <CardDescription>
                  Historical price data for {selectedCrypto}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      {selectedCrypto}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Select Crypto</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedCrypto('BTC')}>
                      Bitcoin (BTC)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedCrypto('ETH')}>
                      Ethereum (ETH)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedCrypto('SOL')}>
                      Solana (SOL)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-1">
                  <Button
                    variant={timeframe === '1M' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeframe('1M')}
                  >
                    1M
                  </Button>
                  <Button
                    variant={timeframe === '3M' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeframe('3M')}
                  >
                    3M
                  </Button>
                  <Button
                    variant={timeframe === '1Y' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeframe('1Y')}
                  >
                    1Y
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  [selectedCrypto]: {
                    label: selectedCrypto,
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className="aspect-[4/3] w-full sm:aspect-[2/1]"
              >
                <RechartsLineChart
                  data={priceHistoryData}
                  margin={{top: 20, right: 0, left: 0, bottom: 0}}
                >
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    minTickGap={30}
                    tickFormatter={(value) => value}
                  />
                  <YAxis
                    dataKey={selectedCrypto}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    domain={['auto', 'auto']}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => `Date: ${label}`}
                        formatter={(value) => `$${value.toLocaleString()}`}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey={selectedCrypto}
                    strokeWidth={2}
                    activeDot={{r: 6}}
                    dot={false}
                  />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
              <CardDescription>
                Monthly trading volume in billions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  volume: {
                    label: 'Volume',
                    color: 'var(--chart-1)',
                  },
                }}
                className="aspect-[4/3] w-full"
              >
                <BarChart
                  data={volumeData}
                  margin={{top: 0, right: 0, left: 0, bottom: 0}}
                >
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => value.substring(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `$${value}B`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => label}
                        formatter={(value) => `$${value}B`}
                      />
                    }
                  />
                  <Bar
                    dataKey="volume"
                    fill="var(--color-volume)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Top Cryptocurrencies</CardTitle>
            <CardDescription>
              Market overview of top cryptocurrencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left font-medium">Name</th>
                    <th className="h-12 px-4 text-right font-medium">Price</th>
                    <th className="h-12 px-4 text-right font-medium">
                      24h Change
                    </th>
                    <th className="h-12 px-4 text-right font-medium">
                      Market Cap
                    </th>
                    <th className="h-12 px-4 text-right font-medium">
                      Volume (24h)
                    </th>
                    <th className="h-12 px-4 text-right font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoData.map((crypto) => (
                    <tr key={crypto.symbol} className="border-b">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <crypto.icon className="h-6 w-6" />
                          <div>
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-muted-foreground">
                              {crypto.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="p-4 text-right align-middle"
                        suppressHydrationWarning
                      >
                        ${crypto.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-right align-middle">
                        <span
                          className={
                            crypto.change > 0
                              ? 'text-green-500'
                              : 'text-red-500'
                          }
                        >
                          {crypto.change > 0 ? '+' : ''}
                          {crypto.change}%
                        </span>
                      </td>
                      <td className="p-4 text-right align-middle">
                        ${crypto.marketCap}B
                      </td>
                      <td className="p-4 text-right align-middle">
                        ${crypto.volume}B
                      </td>
                      <td className="p-4 text-right align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              Add to Watchlist
                            </DropdownMenuItem>
                            <DropdownMenuItem>Trade</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-muted-foreground text-xs">
              <Clock className="mr-1 inline h-3 w-3" />
              Updated 2 minutes ago
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

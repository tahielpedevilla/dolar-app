import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

interface CurrencyResponse {
  fecha: string
  compra: number
  venta: number
}

type Props = {
  currency: CurrencyResponse
}

const Home: NextPage<Props> = ({ currency }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-2">
      <Head>
        <title>Cotización Dólar Blue</title>
        <meta content="Tahiel Pedevilla" name="copyright" />
        <meta content="tahiel" name="author" />
        <meta
          name="description"
          content="Portal para conocer los valores del dólar BLUE con la última cotización"
        />
        <meta
          name="keywords"
          content="dolar blue, dolar blue cotizacion, dolar blue cotizaciones, dolar blue hoy"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center bg-black px-20 font-mono text-white">
        <h1 className="hidden text-3xl font-bold md:block">
          COTIZACIÓN DÓLAR BLUE
        </h1>
        <h1 className="block text-3xl font-bold md:hidden">
          COTIZACIÓN <br /> DÓLAR BLUE
        </h1>
        <div className="mt-4 flex flex-col items-center justify-center">
          <article className="flex flex-row items-center justify-between gap-4 rounded bg-green-500 px-4 py-1">
            <p className="uppercase">Compra</p>
            <Image src="/arrow-right.svg" width={24} height={24} />
            <p>${currency.compra}</p>
          </article>
          <article className="mt-2 flex flex-row items-center justify-between gap-4 rounded bg-red-500 px-4 py-1">
            <p className="uppercase">Venta</p>
            <Image src="/arrow-right.svg" width={24} height={24} />
            <p>${currency.venta}</p>
          </article>
          <span className="mt-8 rounded bg-blue-500 px-2 py-1 text-xs">
            Última actualización: {currency.fecha}
          </span>
        </div>
      </main>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const response = await fetch(
    'https://api-dolar-argentina.herokuapp.com/api/dolarblue'
  )

  if (!response.ok) throw new Error(`Error! status: ${response.status}`)

  if (response.status === 200) {
    const currency: CurrencyResponse = await response.json()

    return {
      props: {
        currency: currency,
      },

      revalidate: 30,
    }
  }
}

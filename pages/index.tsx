import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

interface CurrencyResponse {
  fecha: string
  compra: number
  venta: number
}

type Props = {
  currency: CurrencyResponse
}

const Home: NextPage<Props> = ({ currency }) => {
  const [notifyCopy, setNotifyCopy] = useState(false)

  const message = `Compra: $${currency.compra} \nVenta: $${currency.venta} \nFecha: ${currency.fecha} \nCotización dólar blue desde -> https://dolar-blue.vercel.app/`

  function handleClick() {
    navigator.clipboard.writeText(message)

    setNotifyCopy(true)

    setTimeout(() => {
      setNotifyCopy(false)
    }, 3000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-2">
      <main
        className="flex w-full flex-1 flex-col items-center justify-center bg-black px-12 font-mono text-white"
        onClick={handleClick}
      >
        <h1 className="hidden text-3xl font-bold md:block">
          COTIZACIÓN DÓLAR BLUE
        </h1>
        <h1 className="block text-3xl font-bold md:hidden">
          COTIZACIÓN <br /> DÓLAR BLUE
        </h1>
        <div className="mt-4 flex flex-col items-center justify-center">
          <article className="flex flex-row items-center justify-between gap-2 rounded bg-green-500 px-2 py-1 md:gap-4">
            <p className="font-bold uppercase">Compra</p>
            <Image
              src="/arrow-right.svg"
              width={24}
              height={24}
              layout="fixed"
            />
            <p className="font-bold">${currency.compra}</p>
          </article>
          <article className="mt-2 flex flex-row items-center justify-between gap-2 rounded bg-red-500 px-2 py-1 md:gap-4">
            <p className="font-bold uppercase">Venta</p>
            <Image
              src="/arrow-right.svg"
              width={24}
              height={24}
              layout="fixed"
            />
            <p className="font-bold">${currency.venta}</p>
          </article>
          <span className="mt-8 block rounded bg-blue-500 px-2 py-1 text-center text-xs md:hidden">
            Última actualización <br /> {currency.fecha}
          </span>
          <span className="mt-8 hidden rounded bg-blue-500 px-4 py-1 text-xs md:block">
            Última actualización: {currency.fecha}
          </span>
        </div>

        {notifyCopy && (
          <div className="fixed bottom-4 flex max-w-xs items-center justify-between rounded-md bg-white p-2 shadow-sm shadow-green-600">
            <div className="flex items-center">
              <Image src="/check.svg" width={20} height={20} />
              <p className="mx-2 text-xs font-bold text-green-600">
                Copiado al portapapeles!
              </p>
            </div>
          </div>
        )}
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

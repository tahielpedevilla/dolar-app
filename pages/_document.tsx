import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

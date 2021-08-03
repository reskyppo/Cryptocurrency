import Head from 'next/head';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Cryptocurrency</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container ">
          <h1 className="text-purple-500 font-extrabold text-6xl text-center">
            first init with tailwindcss setup
          </h1>
        </div>
      </main>
    </div>
  );
}

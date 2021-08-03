import Head from "next/head";

function Home({ datas }) {
  return (
    <>
      <Head>
        <title>Cryptocurrency</title>
      </Head>

      <div className="bg-gray-50 py-4">
        <div className="text-2xl font-extrabold text-center">
          Crypto Asset Market
        </div>
        <div className=" mx-auto w-2/3 bg-white p-8 mt-8 rounded-3xl">
          <div className="flex">
            <div className="w-1/6 text-center">Pair</div>
            <div className="w-1/6 text-center">Coin</div>
            <div className="w-1/6 text-center">Last Price</div>
            <div className="w-1/6 text-center">24H Change</div>
            <div className="w-1/6 text-center">Market Cap</div>
            <div className="w-1/6 text-center">24H Global Volume</div>
          </div>
          {datas.map((data) => (
            <div
              key={data.id}
              className="flex hover:bg-gray-50 cursor-pointer border-b-2 p-4
           "
            >
              <div className="font-semibold w-1/6  text-center">
                {data.symbol} <span className="text-gray-500">/ USDT</span>{" "}
              </div>

              <div className="w-1/6  text-center">{data.name}</div>
              <div className="w-1/6  text-center">
                {Number(data.priceUsd).toFixed(5)}
              </div>

              <div className="w-1/6  text-center">
                {/* logic to change colors according to market changes */}
                {Number(data.changePercent24Hr).toFixed(2) > 0 ? (
                  <p className="text-green-500 font-semibold">
                    {Number(data.changePercent24Hr).toFixed(2)} %
                  </p>
                ) : (
                  <p className="text-red-500 font-semibold">
                    {Number(data.changePercent24Hr).toFixed(2)} %
                  </p>
                )}
                {/* end of the logic */}
              </div>
              <div className="w-1/6  text-center">
                {Number(data.marketCapUsd).toFixed(2)}
              </div>
              <div className="w-1/6  text-center">
                {Number(data.volumeUsd24Hr).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://api.coincap.io/v2/assets");
  const json = await res.json();
  const datas = await json.data;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      datas,
    },
  };
}

export default Home;

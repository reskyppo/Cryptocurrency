import Head from "next/head";
import { useState } from "react";

function Home({ datas }) {
  const [inputVal, setInputVal] = useState("");
  const [results, setResults] = useState([]);

  const filterData = (input) => {
    setInputVal(input);
    const res = datas.filter((data) => {
      return data.name.toLowerCase().includes(input);
    });
    setResults(res);
  };

  return (
    <>
      <Head>
        <title>Cryptocurrency</title>
      </Head>

      <div className="bg-gray-50 py-4">
        <div className="text-2xl font-extrabold text-center">
          Crypto Asset Market
        </div>

        <div className="w-2/30">
          <div className="text-center">
            <input
              className=" border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              onChange={(e) => filterData(e.target.value)}
            />
          </div>

          <div></div>
        </div>
        <div className=" mx-auto w-2/3 bg-white p-8 mt-8 rounded-3xl">
          <div className="flex p-4">
            <div className="w-1/6 font-semibold">Pair</div>
            <div className="w-1/6 font-semibold">Coin</div>
            <div className="w-1/6 font-semibold">Last Price</div>
            <div className="w-1/6 font-semibold">24H Change</div>
            <div className="w-1/6 font-semibold">Market Cap</div>
            <div className="w-1/6 font-semibold">24H Global Volume</div>
          </div>
          {inputVal === ""
            ? datas.map((data) => (
                <div
                  key={data.id}
                  className="flex hover:bg-gray-50 cursor-pointer diwddvide-x border-b-2 p-4
           "
                >
                  <div className="font-semibold w-1/6">
                    {data.symbol} <span className="text-gray-500">/ USDT</span>{" "}
                  </div>

                  <div className="w-1/6">{data.name}</div>
                  <div className="w-1/6">
                    {Number(data.priceUsd).toFixed(5)}
                  </div>

                  <div className="w-1/12 text-right ">
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
                  <div className="w-1/12"></div>
                  <div className="w-1/6">
                    {Number(data.marketCapUsd).toFixed(2)}
                  </div>
                  <div className="w-1/6 ">
                    {Number(data.volumeUsd24Hr).toFixed(2)}
                  </div>
                </div>
              ))
            : results.map((result) => (
                <div
                  key={result.id}
                  className="flex hover:bg-gray-50 cursor-pointer diwddvide-x border-b-2 p-4
           "
                >
                  <div className="font-semibold w-1/6">
                    {result.symbol}{" "}
                    <span className="text-gray-500">/ USDT</span>{" "}
                  </div>

                  <div className="w-1/6">{result.name}</div>
                  <div className="w-1/6">
                    {Number(result.priceUsd).toFixed(5)}
                  </div>

                  <div className="w-1/12 text-right ">
                    {/* logic to change colors according to market changes */}
                    {Number(result.changePercent24Hr).toFixed(2) > 0 ? (
                      <p className="text-green-500 font-semibold">
                        {Number(result.changePercent24Hr).toFixed(2)} %
                      </p>
                    ) : (
                      <p className="text-red-500 font-semibold">
                        {Number(result.changePercent24Hr).toFixed(2)} %
                      </p>
                    )}
                    {/* end of the logic */}
                  </div>
                  <div className="w-1/12"></div>
                  <div className="w-1/6">
                    {Number(result.marketCapUsd).toFixed(2)}
                  </div>
                  <div className="w-1/6 ">
                    {Number(result.volumeUsd24Hr).toFixed(2)}
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

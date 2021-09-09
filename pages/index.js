import Head from "next/head";
import { useState } from "react";

function Home({ datas }) {
  // States
  const [inputVal, setInputVal] = useState("");
  const [results, setResults] = useState([]);
  const [isFound, setIsFound] = useState(true);

  // Function
  const filterData = (input) => {
    setInputVal(input);
    const res = datas.filter((data) => {
      return (
        data.name.toLowerCase().includes(input) ||
        data.symbol.toLowerCase().includes(input)
      );
    });
    setResults(res);
    res.length > 0 ? setIsFound(true) : setIsFound(false);
  };

  return (
    <>
      <Head>
        <title>Cryptocurrency</title>
      </Head>

      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="text-3xl font-serif font-extrabold text-center">
          Crypto Asset Market
        </div>

        <div className="w-2/30 mt-8 text-center">
          <input
            placeholder="Enter your search term here"
            className=" p-2 w-1/4 rounded-lg border-blue-500 border-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={(e) => filterData(e.target.value)}
          />
        </div>

        <div className=" mx-auto w-2/3 bg-white border-2 border-gray-100 p-8 mt-8 rounded-3xl">
          <div className="flex p-4 border-b-2 border-blue-500">
            <div className="w-1/6 text-lg font-semibold">Pair</div>
            <div className="w-1/6 text-lg font-semibold">Coin</div>
            <div className="w-1/6 text-lg font-semibold">Last Price</div>
            <div className="w-1/6 text-lg font-semibold">24H Change</div>
            <div className="w-1/6 text-lg font-semibold">Market Cap</div>
            <div className="w-1/6 text-lg font-semibold">24H Global Volume</div>
          </div>
          
          {isFound ? (
            inputVal === "" ? (
              datas.map((data) => (
                <div
                  key={data.id}
                  className="flex hover:bg-gray-50 cursor-pointer border-b-2 p-4
           "
                >
                  <div className="font-semibold w-1/6">
                    {data.symbol} <span className="text-gray-500">/ USDT</span>{" "}
                  </div>

                  <div className="w-1/6">{data.name}</div>
                  <div className="w-1/6">
                    {Number(data.priceUsd)
                      .toFixed(5)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </div>

                  <div className="w-1/12 text-right pr-8">
                    {/* logic to change colors according to market changes */}
                    {Number(data.changePercent24Hr)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,") > 0 ? (
                      <p className="text-green-500 font-semibold">
                        {Number(data.changePercent24Hr)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                        %
                      </p>
                    ) : (
                      <p className="text-red-500 font-semibold">
                        {Number(data.changePercent24Hr)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                        %
                      </p>
                    )}
                    {/* end of the logic */}
                  </div>
                  <div className="w-1/12"></div>
                  <div className="w-1/6">
                    {Number(data.marketCapUsd)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </div>
                  <div className="w-1/6 ">
                    {Number(data.volumeUsd24Hr)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </div>
                </div>
              ))
            ) : (
              results.map((result) => (
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
                    {Number(result.priceUsd)
                      .toFixed(5)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </div>

                  <div className="w-1/12 text-right ">
                    {/* logic to change colors according to market changes */}
                    {Number(result.changePercent24Hr)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,") > 0 ? (
                      <p className="text-green-500 font-semibold">
                        {Number(result.changePercent24Hr)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                        %
                      </p>
                    ) : (
                      <p className="text-red-500 font-semibold">
                        {Number(result.changePercent24Hr)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                        %
                      </p>
                    )}
                    {/* end of the logic */}
                  </div>
                  <div className="w-1/12"></div>
                  <div className="w-1/6">
                    {Number(result.marketCapUsd)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </div>
                  <div className="w-1/6 ">
                    {Number(result.volumeUsd24Hr)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </div>
                </div>
              ))
            )
          ) : (
            <p className="text-2xl text-red-500 text-center">Data not found</p>
          )}
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

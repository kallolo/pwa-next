import Layout from '../components/Layout'
import { QueryClient, useQuery } from 'react-query';
import { useState } from 'react';
import { dehydrate } from 'react-query/hydration';

const getMarket = async (page = 1) =>{ // fungsi get data
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&per_page=10&page=${page}`;
  const response = await fetch(URL);
  if(!response.ok){
    throw new Error("Fetching Error");
  }
  return await response.json();
};

const formatNumber = (number) =>{ // fungsi format number indonesia
  return Intl.NumberFormat("id-Id").format(number);
}

const Percentage = ({percent}) =>{ // componen percentage
  const formatPercent = Intl.NumberFormat("id-Id",{
    style: "percent",
    maximumFractionDigits:1,
    minimumFractionDigits:1
  }).format(percent / 100);

  let color = "text-black"
  if(percent > 0){
    color = "text-green-500"
  }else{
    color = "text-red-500"
  }

  return <div className={color}>{formatPercent}</div>
}

//SSR with Hydrate
export async function getStaticProps(){
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["market", 1], ()=> getMarket());

  return{
    props: {
      dehydratedState : dehydrate(queryClient),
    }
  };
}
export default function Home() {
  const [page, setPage] = useState(1);
  const nextPage = () => {
    setPage((old) => old + 1);
  }
  const prevPage = () => {
    setPage((old) => old - 1);
  }
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(
    ["market", page],
    () => getMarket(page),{
    staleTime : 3000, //ms stale time
    refetchInterval : 3000, //ms refatch setiap 3000ms
  })
  return (
    <Layout title={'Home # ' + process.env.appName}>
      <div className="container">
        <h1 className="text-lg font-bold text-blue-600"> Home</h1>
        <table className="table-auto border-collapse  border border-gray-400 dark:border-white">
          <thead className="text-left uppercase">
            <tr>
              <th className="border border-gray-400 dark:border-white p-2">Coin</th>
              <th className="border border-gray-400 dark:border-white p-2">Last Price</th>
              <th className="border border-gray-400 dark:border-white p-2">24h % Change</th>
            </tr>
          </thead>
          <tbody>
          {/* {isLoading && // digunakan ketika pertama kali fetching belum ada data
          <div className="text-green-400">Loading..</div>} */}
          {/* {isFetching && // digunakan ketika refatching
          <div className="text-green-400">Loading lagi..</div>} */}
          {isError && // jika ada error
          <div className="text-red-500"> Eror Request Data</div>} 
          {
          isSuccess && // kalau sudah success data dimap seperti dibawah
          data?.map((r,i) => ( // ? => jika datanya ada baru dimap
            <tr key={i}>
              <td className="border border-gray-400 dark:border-white p-2">{r.id}</td>
              <td className="border border-gray-400 dark:border-white p-2">{formatNumber(r.current_price) }</td>
              <td className="border border-gray-400 dark:border-white p-2"><Percentage percent={r.price_change_percentage_24h}/></td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="flex items-center mt-1">
          <button className="bg-blue-600 hover:bg-blue-500 rounded-sm px-3" onClick={prevPage} disabled={page == 1 ? true : false}>
          Prev
        </button>
        <div className="mx-4">{page}</div>
        <button className="bg-blue-600 hover:bg-blue-500 rounded-sm px-3" onClick={nextPage}>
          Next
        </button>
        </div>
        
      </div>
    </Layout>
  )
}

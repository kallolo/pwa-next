import Layout from '../components/Layout'
import { useQuery } from 'react-query';

const getMarket = async () =>{ // fungsi get data
  const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&per_page=10";
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

  return <span className={color}>{formatPercent}</span>
}
export default function Home() {
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery("market", getMarket)
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
          {
          isSuccess && // kalau sudah success data dimap seperti dibawah
          data?.map((r,i) => ( // ? => jika datanya ada baru dimap
            <tr>
              <td className="border border-gray-400 dark:border-white p-2">{r.id}</td>
              <td className="border border-gray-400 dark:border-white p-2">{formatNumber(r.current_price) }</td>
              <td className="border border-gray-400 dark:border-white p-2"><Percentage percent={r.price_change_percentage_24h}/></td>
            </tr>
          ))}
          </tbody>
        </table>
        
      </div>
    </Layout>
  )
}

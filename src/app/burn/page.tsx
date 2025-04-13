'use client';
import { useEffect, useState } from "react";
import { format } from "date-fns";

export function formatTimestamp(timestamp) {
  return format(new Date(timestamp * 1000), 'yyyy-MM-dd');
}

export default function Home() {
  const [burnData, setBurnData] = useState([]);
  const [totalBurned, setTotalBurned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chiave API Hiro da env
  const HIRO_API_KEY = process.env.NEXT_PUBLIC_HIRO_API_KEY;



  // Funzione per formattare il timestamp in YYYY-MM-DD hh:mm:ss
  // const formatTimestamp = (timestamp) => {
  //   if (!timestamp) return "N/D";
  //   const date = new Date(timestamp);
  //   return date.toISOString().replace("T", " ").substring(0, 19); // YYYY-MM-DD hh:mm:ss
  // };

  // Fetch delle attività di burn
  const fetchBurnHistory = async () => {
    try {
      let offset = 0;
      const limit = 60;
      let allBurns = [];
      let hasMore = true;
      
      while (hasMore) {
        const response = await fetch(
          `https://api.hiro.so/runes/v1/etchings/870360:2296/activity/bc1qhkav5fk20r24w3p6tfrht0f272csry95txt3dp?limit=${limit}&offset=${offset}`,
          {
            headers: {
              "X-API-Key": HIRO_API_KEY,
              "Accept": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Errore API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Log per debug: verifica la struttura dei dati
        // console.log("Dati API:", data);

        const burns = data.results
          .filter((activity) => activity.operation === "burn")
          .map((burn) => ({
            txid: burn.location.tx_id || burn.txid || "N/D", // Fallback per tx_id o txid
            date: (formatTimestamp(burn.location.timestamp) || burn.block_timestamp), // Fallback per timestamp
            amount: burn.amount || 0, // Fallback per amount
          }));

        allBurns = [...allBurns, ...burns];

        if (data.results.length < limit) break;
        offset += limit;
      }

      updateBurnData(allBurns);
    } catch (error) {
      console.error("Errore nel fetch dei burn:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchBurnHistory();

      // Polling ogni 2 minuti per aggiornamenti lowrate così non si satura l'API
      const interval = setInterval(fetchBurnHistory, 120000);
      return () => clearInterval(interval);
    }
  }, []);

  // Aggiorna i dati e il totale
  const updateBurnData = (burns) => {
    setBurnData(burns);
    const total = burns.reduce((sum, burn) => sum + Number(burn.amount || 0), 0);
    setTotalBurned(total);
  };

  if (loading) return <p><br/>Loading...</p>;
  if (error) return <p><br/>Error: {error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "10px" }}>
        MEME•ALPHA•RUNE•SONIC•IMPULSE 
        <br/>
      <p className="font-size:10px" style={{ marginBottom: "20px" }}>
        Burnt coins amount: {totalBurned.toLocaleString()}
      </p>
       
      </h1>
      <h2 style={{ marginBottom: "10px", marginLeft: "1%" }}>Past Transactions:</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0000", textAlign: "left" }}>
            <th style={{ maxBlockSize: "10%", padding: "12px", borderBottom: "2px solid #ddd" }}>
              TxID
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Date & Time
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Total Burnt
            </th>
          </tr>
        </thead>
        <tbody>
          {burnData.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ padding: "12px", textAlign: "center" }}>
                No burnt data found
              </td>
            </tr>
          ) : (
            burnData.map((burn, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#0f0f0f0f" : "#000000",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0f0f0f0f")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#0f0f0f0" : "#000000")
                }
              >
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <a
                  href={'https://mempool.space/tx/' + burn.txid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  >
                  {burn.txid}
                  </a>
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd", whiteSpace: "nowrap" }}>
                    {burn.date}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {burn.amount.toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
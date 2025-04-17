'use client';

import { format } from "date-fns";
import { useEffect, useState } from "react";
import styles from "./Burn.module.css";

interface BurnInfo {
  txid: string;
  date: string;
  amount: string | number;
}



export default function Burn() {
  const [burnData, setBurnData] = useState<BurnInfo[]>([]);
  const [totalBurned, setTotalBurned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recordsPerPage, setRecordsPerPage] = useState(10); // Stato per il numero di record per pagina
  function formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp * 1000), 'yyyy/MM/dd');
  }
  
  function formatAmount(amount: string | number): string {
    const num = Number(amount);
    if (isNaN(num)) return "0";
    return (num / 1_000_000).toFixed(0) + "M"; // Converte in milioni (es. 99999999999999 -> 99999M)
  }
  
  const fetchBurnData = async () => {
    try {
      let offset = 0;
      const limit = 60;
      let allBurns: BurnInfo[] = [];
      let hasMore = true;
  
      while (hasMore) {
        const response = await fetch(
          `https://marsi-proxy.federicoserra-jobs.workers.dev/proxy/runes/v1/etchings/870360:2296/activity/bc1qhkav5fk20r24w3p6tfrht0f272csry95txt3dp?limit=${limit}&offset=${offset}`
        );
  
        if (!response.ok) throw new Error(`Errore API: ${response.status}`);
  
        const data = await response.json();
  
        const burns = data.results
          .filter((activity: any) => activity.operation === "burn")
          .map((burn: any) => ({
            txid: burn.location.tx_id || "N/D",
            date: formatTimestamp(burn.location.timestamp),
            amount: burn.amount || 0,
          }));
  
        allBurns = [...allBurns, ...burns];
        offset += limit;
        
        if (data.results.length < limit || offset >= 1000) {
          hasMore = false;
        }
      }
  
      setBurnData(allBurns);
      setTotalBurned(allBurns.reduce((sum: number, burn: BurnInfo) => sum + Number(burn.amount), 0));
  
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBurnData();
  }, []);

  // Calcola i record da mostrare
  const displayedRecords = burnData.slice(0, recordsPerPage);

  if (loading) return <div role="status">Caricamento...</div>;
  if (error) return <div role="alert">Errore: {error}</div>;

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <h1>Burn History:</h1>
        <h2>Total Burned: {formatAmount(totalBurned)}</h2><br/>
        <div className={styles.tableControls}>
          <span className={styles.recordsInfo}>
            Showing {displayedRecords.length}/{burnData.length} records
          </span>
          <select
            className={styles.recordsSelect}
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table} aria-label="Storico delle transazioni di burn">
            <thead>
              <tr className={styles.headerRow}>
                <th scope="col" className={styles.headerTxid}>TXID</th>
                <th scope="col" className={styles.header}>Timestamp</th>
                <th scope="col" className={styles.header}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {displayedRecords.map((burn, index) => (
                <tr key={index} className={styles.row}>
                  <td className={styles.cellTxid}>
                  <a
                    href={'https://mempool.space/tx/' + burn.txid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                      {burn.txid}
                    </a>
                  </td>
                  <td className={styles.cell}>{burn.date}</td>
                  <td className={styles.cell}>{formatAmount(burn.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
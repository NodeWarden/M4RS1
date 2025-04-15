'use client';

import { format } from "date-fns";
import { useEffect, useState } from "react";
import styles from "./Burn.module.css";

interface BurnInfo {
  txid: string;
  date: string;
  amount: string | number;
}

export function formatTimestamp(timestamp: number): string {
  return format(new Date(timestamp * 1000), 'yyyy/MM/dd');
}

export function formatCurrency(value: number): string {
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`; // Miliardi
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`; // Milioni
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`; // Migliaia
  return value.toString(); // Valore normale
}

export default function Burn() {
  const [burnData, setBurnData] = useState<BurnInfo[]>([]);
  const [totalBurned, setTotalBurned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  
        // Filtra solo i "burn" e mappa i dati
        const burns = data.results
          .filter((activity: any) => activity.operation === "burn")
          .map((burn: any) => ({
            txid: burn.location.tx_id || "N/D",
            date: formatTimestamp(burn.location.timestamp),
            amount: burn.amount || 0,
          }));
  
        allBurns = [...allBurns, ...burns];
        offset += limit;
        
        // Condizione di uscita: meno risultati del limite o raggiunto il massimo
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

  // if (loading) return <div role="status">Caricamento...</div>;
  if (error) return <div role="alert">Errore: {error}</div>;

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <h1>Burn History:</h1>
        <p>Total Burned: {formatCurrency(totalBurned)}</p>
        <table className={styles.table} aria-label="Storico delle transazioni di burn">
          <thead>
            <tr className={styles.headerRow}>
              <th scope="col" className={styles.headerTxid}>TXID</th>
              <th scope="col" className={styles.header}>Timestamp</th>
              <th scope="col" className={styles.header}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {burnData.map((burn, index) => (
              <tr key={index} className={styles.row}>
                <td className={styles.cellTxid}>{burn.txid}</td>
                <td className={styles.cell}>{burn.date}</td>
                <td className={styles.cell}>{formatCurrency(Number(burn.amount))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
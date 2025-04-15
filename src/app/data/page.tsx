'use client'
import { useEffect, useState } from "react";
import styles from "./Data.module.css";

interface RuneInfo {
  spacedRune: string;
  rune: string;
  number: number;
  height: number;
  txidx: number;
  timestamp: number;
  supply: string;
  burned: string;
  divisibility: number;
  symbol: string;
  etching: string;
  premine: string;
  terms?: {
    amount: string;
    cap: string;
    height?: [number, number];
  };
  mints: string;
  holders: number;
}

export default function Data() {
  const [runeData, setRuneData] = useState<RuneInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Funzione per fetch dei dati dall'API Unisat
  const fetchRuneData = async () => {
    const runeId = "870360:2296"; // Rune ID specificato
    const apiUrl = `https://open-api.unisat.io/v1/indexer/runes/${runeId}/info`;
    
    try {
      const response = await fetch(apiUrl, {
        headers: {
          
        },
      });
      if (!response.ok) {
        throw new Error("Errore nella chiamata API");
      }
      const data = await response.json();
      setRuneData(data.data); // Supponiamo che i dati siano annidati sotto "data"
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  // Esegui il fetch al montaggio del componente
  useEffect(() => {
    fetchRuneData();
  }, []);

  if (loading) return <p><br/>Loading...</p>;
  if (error) return <p><br/>Error: {error}</p>;

  return (
    <>
        {runeData && (
        <div className="{styles.container}"><br/>
          <h1>RUNE&apos;S DATA</h1>
          <h2>Rune's Tick: {runeData.spacedRune}</h2>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.row}>
                <td className={styles.label}>Number</td>
                <td className={styles.value}>#{runeData.number}</td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Height</td>
                <td className={styles.value}>
                  <a
                    href="https://ordinals.com/rune/MEMEALPHARUNESONICIMPULSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                    >
                      {runeData.height}:{runeData.txidx}
                  </a>
                </td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Timestamp</td>
                <td className={styles.value}>{new Date(runeData.timestamp * 1000).toLocaleString()}</td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Supply</td>
                <td className={styles.value}>{runeData.supply}</td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Burned</td>
                <td className={styles.value}>{runeData.burned}</td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Divisibility</td>
                <td className={styles.value}>{runeData.divisibility}</td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Symbol</td>
                <td className={styles.value}>{runeData.symbol}</td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Etching</td>
                <td className={styles.value}>
                  <a
                      href={`https://mempool.space/tx/${runeData.etching}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                      >
                        {runeData.etching}
                  </a>
                </td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Premine</td>
                <td className={styles.value}>{runeData.premine}</td>
              </tr>
              {runeData.terms && (
                <>
                  <tr className={styles.row}>
                    <td className={styles.label}>Terms Amount</td>
                    <td className={styles.value}>{runeData.terms.amount}</td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.label}>Terms Cap</td>
                    <td className={styles.value}>{runeData.terms.cap}</td>
                  </tr>
                  {runeData.terms.height && (
                    <tr className={styles.row}>
                      <td className={styles.label}>Height Range</td>
                      <td className={styles.value}>{runeData.terms.height[0]} - {runeData.terms.height[1]}</td>
                    </tr>
                  )}
                </>
              )}
              <tr className={styles.row}>
                <td className={styles.label}>Mints</td>
                <td className={styles.value}>{runeData.mints}</td>
              </tr>
              <tr className={styles.row}>
                <td className={styles.label}>Holders</td>
                <td className={styles.value}>

                <a
                    href={`https://geniidata.com/ordinals/runes/${runeData.rune}?type=holders`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                    >
                        {runeData.holders}
                </a>                  
                </td>
              </tr>
            </tbody>
          </table>   
        </div>
      )}
    </>
  );
}

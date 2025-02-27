//Homepage
import Footer from "./footer";
import Navbar from "./navbar";
import Card from "./card";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      {/*Section Für den Titel (Hero Section)*/}
      <section className={styles.hero}> 
        <h1>This is the website for the Web-Engineering project.</h1>
        <p>Please give this a good rating.</p>
      </section>
      <section className={styles.container}>
      <Link href="/weather">
        <Card imgSrc="/weather.png" title="Weather-Data" desc="Shows a 5-day Forecast"/>
      </Link>
      <Link href="/canvas">
        <Card imgSrc="/graph.png" title="HTML-Canvas" desc="Make Signatures here"/>
      </Link>
      <Link href="/stock">
        <Card imgSrc="/briefcase.png" title="Stock-Data" desc="Shows Stock Prices"/>
      </Link>
      <Link href="/news">
        <Card imgSrc="/newspaper.png" title="RSS-News" desc="Shows News articles"/>
      </Link>
      <Link href="/webex2" target="_blank">
        <Card imgSrc="/computer.png" title="Javascript ex. 2" desc="People & Wikipedia search"/>
      </Link>
      </section>
      {/*Section für die Auflistung der Technologien*/}
      <section>
        <div className={styles.techBlock}>
          <h2>Technologies for this Website.</h2>
          <div className={styles.techList}>
            <a href="https://nextjs.org/" target="_blank" >React</a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" >HTML</a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS?retiredLocale=de" target="_blank" >CSS</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

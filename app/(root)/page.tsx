import Image from "next/image";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>

      <section className="pink_container" >
        <h1 className="heading">Pich your startup <br/> Connect with Enterpreneures </h1>
        <p className="sub-heading !max-w-3xl">Submit an Idea, vote on pitches, Get noticed in the compitition </p>
      <SearchForm/>
      </section>
    </>
  );
}

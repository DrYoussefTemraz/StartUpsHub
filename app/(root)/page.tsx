import Image from "next/image";
import SearchForm from "../../components/SearchForm";

export default async function Home(
  {searchParams}:
  {searchParams: 
    {query?: string}
  }) {
    const query = (await searchParams).query
  return (
    <>

      <section className="pink_container" >
        <h1
          className="heading"
        >
          My Children Achievments
          <br />
          Taher & Mariam 
        </h1>
        <p
          className="sub-heading !max-w-3xl"
        >
          Submit an Idea, vote on Achievment, Get noticed in the compitition
        </p>
        <SearchForm query = {query}/>
      </section>
    </>
  );
}

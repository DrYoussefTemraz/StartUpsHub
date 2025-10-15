import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home(
  { searchParams }:
    {
      searchParams:
      { query?: string }
    }) {
  const query = (await searchParams).query

  const posts = await client.fetch(STARTUPS_QUERY)
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
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p>
          {query ? `search for the ${query}` : "All Startups"
          }
        </p>
        <ul className="mt-7 card_grid ">
          {posts.length > 0
            // TODO --> Make the types with Sanity lib
            ? posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
            : <p>No posts found</p>}


        </ul>
      </section>
    </>
  );
}


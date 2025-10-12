import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home(
  { searchParams }:
    {
      searchParams:
      { query?: string }
    }) {
  const query = (await searchParams).query

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      _id: '1',
      author: {
        id: 1,
        name: 'Taher'
      },
      description: 'this is the description',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG7HsYUU0xC3LVTs5w3csqTPx_4sr-ywREKg&s",
      category: 'AI',
      title: 'AI for all'


    }
  ]
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
      <section>
        <p>
          {query ? `search for the ${query}` : "All Startups"
          }
        </p>
        <ul className="mt-7 card-grid ">
          {posts.length > 0
            // TODO --> Make the types with Sanity lib
            ? posts.map((post: any, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
            : <p>No posts found</p>}


        </ul>
      </section>
    </>
  );
}

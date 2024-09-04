import { NextPage } from "next";
import prisma from "~/prisma/db";
import Image from "next/image";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const allListings = trpc.getAllListings.useQuery();
  if (!allListings.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {allListings.data.map((listing) => {
        return (
          <div key={listing.id}>
            <Image
              src={listing.image}
              alt={listing.title}
              width={320}
              height={180}
            />
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

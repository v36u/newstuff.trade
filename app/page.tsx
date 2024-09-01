import prisma from "@/prisma/db";
import Image from "next/image";

export default async function Home() {
  const prismaTest = await prisma.listing.findMany();

  return (
    <div>
      {prismaTest.map((listing) => {
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
}

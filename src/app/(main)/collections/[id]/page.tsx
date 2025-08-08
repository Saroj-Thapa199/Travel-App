import Collection from "@/model/Collection";
import CollectionDetailPage from "./CollectionPage";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/auth";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const getCachedCollection = cache(async (collectionId: string) => {
  const collection = await Collection.findById(
    collectionId,
    "name description user visibility",
  );
  return collection;
});

export const generateMetadata = async ({ params }: PageProps) => {
  const { id } = await params;
  const data = await getCachedCollection(id);

  return {
    title: data?.name,
    description: data?.description,
  };
};

export default async function CollectionPage({ params }: PageProps) {
  const { id } = await params;

  const session = await auth();

  const collection = await getCachedCollection(id);

  if (!collection) {
    return notFound();
  }

  if (
    collection.visibility === "private" &&
    collection.user.toString() !== session?.user.id
  ) {
    return redirect("/");
  }

  return (
    <div className="mx-auto min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container">
      <CollectionDetailPage userId={session?.user.id} collectionId={id} />
    </div>
  );
}

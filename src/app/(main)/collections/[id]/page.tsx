import CollectionDetailPage from "./CollectionPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CollectionPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container">
    {/* <div className="mx-auto min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container"> */}
      <CollectionDetailPage collectionId={id} />
    </div>
  );
}

import { SlugResultsView } from "@/components/SlugResultsView";

export default function SlugResultsPage({
  params,
}: {
  params: { slug: string };
}) {
  return <SlugResultsView slug={params.slug} />;
}


import { SlugResultsView } from "@/components/SlugResultsView";

type Props = {
  params: { slug: string };
};

export default function SlugResultsPage({ params }: Props) {
  return <SlugResultsView slug={params.slug} />;
}


import Link from "next/link";

interface PageProps {
  params: { productId: string };
  searchParams: { product_name: string };
}

export default function Page(props: PageProps) {
  console.log('props', props);

  return (
    <div>
      <h1>Product Review Page from the APP</h1>
    </div>
  );
}

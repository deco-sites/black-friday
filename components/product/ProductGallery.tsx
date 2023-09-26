import { Product } from "apps/commerce/types.ts";

import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  shopUrl: string;
  products: Product[] | null;
  layout?: cardLayout;
}

function ProductGallery({ products, layout,shopUrl }: Props) {
  const platform = usePlatform();
  return (
    <div class=" container lg:max-w-[1200px] max-w-[95%] grid grid-cols-2 gap-2 items-center sm:grid-cols-4 sm:gap-10">
      {products?.map((product, index) => (
        <ProductCard
          shopUrl = {shopUrl}
          product={product}
          preload={index === 0}
          layout={layout}
          platform={platform}
        />
      ))}
    </div>
  );
}

export default ProductGallery;

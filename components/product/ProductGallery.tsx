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
  title?: string;
  products: Product[] | null;
  layout?: cardLayout;
}

function ProductGallery({ products, layout, title}: Props) {
  const platform = usePlatform();
  return (
    <div class=" container lg:max-w-[1200px] max-w-[95%] flex flex-col items-center lg:items-start mt-8 lg:mt-16 gap-6 lg:gap-12">
      {
        title &&  (
          <h3 class={"lg:text-4xl font-semibold uppercase text-black  text-base "}>{title}</h3>
        )
      }
      <div class="w-full grid grid-cols-2 gap-2 items-center sm:grid-cols-4 sm:gap-10">
        {products?.map((product, index) => (
          <ProductCard
            product={product}
            preload={index === 0}
            layout={layout}
            platform={platform}
          />
        ))}
      </div>
      
    </div>
  );
}

export default ProductGallery;
import { Product } from "apps/commerce/types.ts";
import { Layout as cardLayout,} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import ProductHomeGallery from "$store/islands/ProductHomeGallery.tsx"

export interface Props {
    title?: string;
    products: Product[] | null;
    showMoreButtonLabel?: string;
    layout?: cardLayout;
  }


export default function ProductGalleryContainer({ products, layout, title, showMoreButtonLabel}: Props){

    const platform = usePlatform();
    return(
        <div class=" container lg:max-w-[1200px] max-w-[95%] flex flex-col items-center lg:items-start mt-8 lg:mt-16 gap-6 lg:gap-12">
        {
          title &&  (
            <h3 class={"lg:text-4xl font-semibold uppercase text-black  text-base "}>{title}</h3>
          )
        }
        <ProductHomeGallery
            platform={platform}
            products={products || []}
            layout={layout}
            showMoreButtonLabel={showMoreButtonLabel}
        />
      </div>
    )
}
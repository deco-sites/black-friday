import { Product } from "apps/commerce/types.ts";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import {  useEffect, useState } from "preact/hooks";


export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | [];
  layout?: cardLayout;
  platform: ReturnType<typeof usePlatform>;
  showMoreButtonLabel?: string;
}

function ProductHomeGallery({ products = [], layout,platform, showMoreButtonLabel = "Ver mais produtos em oferta"}: Props) {
  const [hasmore,setHasMore] = useState(true)
  const ITEMSPERPAGE = 8
  const [startIndex, setStartIndex] = useState(8)
  const [renderProducts,setRenderProducts] = useState(products?.slice(0,ITEMSPERPAGE))

  useEffect(()=> {
    const getProductWidth = () => {
      if(products && products?.length <= 8 || !products){
        setHasMore(false)
      }
    }
    getProductWidth()
  },[])
  
  const loadMoreData = () => {
    
    if(!renderProducts?.length) return
   
    // Calcule os próximos resultados a serem exibidos
    const nextBatch = products?.slice(startIndex, startIndex + ITEMSPERPAGE) || [];
    
    

    

    // Verifique se há mais resultados para carregar
    if (nextBatch.length === 0) {
      setHasMore(false); // Não há mais resultados
      return;
    }
    else{
       // Atualize o índice de início para a próxima renderização
      setStartIndex(startIndex + ITEMSPERPAGE);
    }
    
    // Adicione os resultados à lista visível
    setRenderProducts([...renderProducts, ...nextBatch]);
   
    if(startIndex + ITEMSPERPAGE >= products?.length)
    setHasMore(false);
  };
  return (
    <div class=" container lg:max-w-[1200px] max-w-[95%] flex flex-col items-center  mt-8 lg:mt-16 gap-6 lg:gap-12">
     
      <div class="w-full grid grid-cols-2 gap-2 items-start sm:grid-cols-4 sm:gap-6">
        {renderProducts?.map((product, index) => (
          <ProductCard
            product={product}
            preload={index === 0}
            layout={layout}
            platform={platform}
          />
        ))}
      </div>
      {
        hasmore && (
          <button class="text-sm font-semibold text-[#595959] rounded-lg py-2 px-10 text-center btn bg-transparent border border-[#595959] hover:text-white" onClick={()=> loadMoreData()}>{showMoreButtonLabel}</button>
        )
      }
    </div>
  );
}

export default ProductHomeGallery;

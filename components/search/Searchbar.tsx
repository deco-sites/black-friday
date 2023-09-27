/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef } from "preact/compat";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

function Searchbar({
  placeholder = "Digite aqui sua  busca",
  action = "/s",
  name = "q",
  query,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  return (
    <div class="gap-8 container w-[245px]" // style={{ gridTemplateRows: "min-content auto" }}
    >
      <form
        id={id}
        action={action}
        class="min-w-[245px] flex bg-[#F5F5F7] rounded-lg h-8"
      >
        <Button
          type="submit"
          class="join-item px-2 bg-[#F5F5F7] border-none hover:bg-[#F5F5F7]  rounded-lg max-h-8 min-h-full"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={24} strokeWidth={1} />}
        </Button>
        <input
          ref={searchInputRef}
          id="search-input"
          class="input w-52 border-none bg-[#F5F5F7] rounded-lg p-0 outline-none focus:outline-none text-[#111] font-normal text-sm font-[Ubuntu] h-8 placeholder:font-sans"
          name={name}
          defaultValue={query}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setSearch(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        {
          /* <Button
          type="button join-item"
          class="btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => displaySearchPopup.value = false}
        >
         <Icon id="XMark" size={24} strokeWidth={2} />
        </Button> */
        }
      </form>

      {notFound
        ? (
          <div class="flex flex-col gap-4 w-full">
            {
              /* <span
              class="font-medium text-xl text-center"
              role="heading"
              aria-level={3}
            >
              Nenhum resultado encontrado
            </span>
            <span class="text-center text-base-300">
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </span> */
            }
          </div>
        )
        : (
          <div class="">
            <div class="">
              <div
                class={hasTerms ? "flex flex-col gap-6" : "hidden"}
              >
                <span
                  class="font-medium text-xl"
                  role="heading"
                  aria-level={3}
                >
                  Sugestões
                </span>
                <ul id="search-suggestion" class="flex flex-col gap-6">
                  {searches.map(({ term }) => (
                    <li>
                      <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                        <span>
                          <Icon
                            id="MagnifyingGlass"
                            size={24}
                            strokeWidth={0.01}
                          />
                        </span>
                        <span>
                          {term}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                class={hasProducts
                  ? "flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden"
                  : "hidden"}
              >
                <span
                  class="font-medium text-xl"
                  role="heading"
                  aria-level={3}
                >
                  Produtos sugeridos
                </span>
                <Slider class="carousel">
                  {products.map((product, index) => (
                    <Slider.Item
                      index={index}
                      class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                    >
                      <ProductCard product={product} platform={"vtex"} />
                    </Slider.Item>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Searchbar;

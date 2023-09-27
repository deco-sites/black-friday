import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
// import Searchbar from "$store/islands/Header/Searchbar.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";
import Image from "apps/website/components/Image.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { INavItem } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";
import { headerHeight, navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full gap-2 px-4"
      >
        <div class="w-[104px]">
          <MenuButton />
        </div>

        {logo && (
          <a
            href="/"
            class="flex items-center justify-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={91} height={23} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" size={24} strokeWidth={1} />
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col justify-center selection: items-center border-b border-base-200 w-full px-10">
        <div class="flex flex-row justify-between w-full items-center pt-8 pb-4">
          <a
            href="/"
            class="w-44 text-xs text-[#595959] font-bold font-sans"
          >
            SEJA UM FRANQUEADO
          </a>
          <div class="flex w-44 justify-center items-center">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="flex justify-center items-center"
              >
                <Image src={logo.src} alt={logo.alt} width={145} height={37} />
              </a>
            )}
          </div>
          <div class="flex-none w-44 flex items-center justify-end gap-6">
            {/* <SearchButton /> */}
            <Searchbar />
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon
                id="Heart"
                size={24}
                strokeWidth={1}
                fill="none"
              />
            </a>
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/login"
              aria-label="Log in"
            >
              <Icon id="User" size={24} strokeWidth={1} />
            </a>

            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "shopify" && <CartButtonShopify />}
          </div>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;

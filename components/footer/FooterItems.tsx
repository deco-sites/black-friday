import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-14 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-3">
                  <span class="font-[Ubunto] text-base text-[#000] font-bold uppercase">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-3 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      item.label.toLowerCase() ==
                          "seja um franqueado".toLowerCase()
                        ? (
                          <li>
                            <a
                              href={item.href}
                              class="text-white font-normal capitalize font-[Ubunto] text-sm bg-black py-2 px-5 rounded-lg flex gap-3 items-center justify-center max-w-[195px]"
                            >
                              {item.label}
                              <Icon
                                width={24}
                                height={24}
                                strokeWidth={1}
                                id="ArrowLeft"
                              />
                            </a>
                          </li>
                        )
                        : (
                          <li>
                            <a
                              href={item.href}
                              class="text-[#8C8C8C] text-sm font-normal flex "
                            >
                              {item.label}
                            </a>
                          </li>
                        )
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden divide-y">
            {sections.map((section) => (
              <>
                <li>
                  <details class="flex gap-3 flex-col">
                    <summary class="marker:content-none flex justify-center p-4">
                      <span class="font-[Ubunto] text-base text-[#000] font-bold uppercase">
                        {section.label}
                      </span>
                    </summary>
                    <ul
                      class={`flex flex-col gap-3 items-center pb-8`}
                    >
                      {section.items?.map((item) => (
                        item.label.toLowerCase() ==
                            "seja um franqueado".toLowerCase()
                          ? (
                            <li>
                              <a
                                href={item.href}
                                class="text-white font-normal capitalize font-[Ubunto] text-sm bg-black py-2 px-5 rounded-lg flex gap-3 items-center justify-center max-w-[195px]"
                              >
                                {item.label}
                                <Icon
                                  width={24}
                                  height={24}
                                  strokeWidth={1}
                                  id="ArrowLeft"
                                />
                              </a>
                            </li>
                          )
                          : (
                            <li>
                              <a
                                href={item.href}
                                class="text-[#8C8C8C] text-sm font-normal flex justify-center"
                              >
                                {item.label}
                              </a>
                            </li>
                          )
                      ))}
                    </ul>
                  </details>
                </li>
              </>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

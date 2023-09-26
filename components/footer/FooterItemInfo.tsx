import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  title?: string;
  label: string;
  href?: string;
};

export type SectionInfo = {
  label: string;
  items: Item[];
};

export default function FooterItemInfo(
  { sectionsInfo, justify = false }: {
    sectionsInfo: SectionInfo[];
    justify: boolean;
  },
) {
  return (
    <>
      {sectionsInfo.length > 0 && (
        <>
          <ul
            class={`flex flex-col gap-6 lg:gap-10 items-center justify-center ${
              justify && "lg:justify-between"
            }`}
          >
            {sectionsInfo.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-[Ubunto] text-base text-[#000] font-bold uppercase text-center">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      section.label.toLocaleLowerCase() ==
                          "Encontre uma loja".toLocaleLowerCase()
                        ? (
                          <li class="flex justify-center flex-col items-center pb-10">
                            <p class="text-[#BFBFBF] font-bold uppercase font-[Ubunto] text-base">
                              {item?.title}
                            </p>
                            <a
                              href={item.href}
                              class="text-white font-normal capitalize font-[Ubunto] text-sm bg-black py-2 px-5 rounded-lg flex gap-3 items-center justify-center"
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
                          <li class="flex justify-center flex-col items-center">
                            <p class="text-[#BFBFBF] font-bold uppercase font-[Ubunto] text-base">
                              {item.title}
                            </p>
                            <a
                              href={item.href}
                              class="text-black font-bold uppercase font-[Ubunto] text-base"
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
        </>
      )}
    </>
  );
}

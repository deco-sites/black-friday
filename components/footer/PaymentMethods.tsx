import Icon from "$store/components/ui/Icon.tsx";

export interface PaymentItem {
  label:
    | "Diners"
    | "Elo"
    | "Mastercard"
    | "Pix"
    | "Visa"
    | "Amex"
    | "Hipercard"
    | "Ame"
    | "Cashback";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4 px-11">
          {content.title && (
            <h3 class="hidden md:flex text-[#000] font-bold uppercase text-base">
              {content.title}
            </h3>
          )}
          <ul class="flex items-center gap-4 flex-wrap justify-center">
            {content.items.map((item) => {
              return (
                <li
                  class=""
                  title={item.label}
                >
                  <Icon
                    width={35}
                    height={24}
                    strokeWidth={1}
                    id={item.label}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

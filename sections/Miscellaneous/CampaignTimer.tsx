import { useId } from "$store/sdk/useId.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {

    /**
   * @title Text
   * @default Time left for a campaign to end wth a link
   */
    title?: HTMLWidget;

  /**
   * @title Text
   * @default Time left for a campaign to end wth a link
   */
  text?: HTMLWidget;

  /**
   * @title Expires at date
   * @format datetime
   */
  expiresAt?: string;

  labels?: {
    /**
     * @title Text to show when expired
     */
    expired?: string;
    days?:string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };

  link?: {
    /**
     * @title Link Text
     * @default button
     */
    text: string;
    /**
     * @title Link href
     * @default #
     */
    href: string;
  };

  layout?: {
    textPosition?: "Before counter" | "After counter";
  };
}

const snippet = (expiresAt: string, rootId: string) => {
  const expirationDate = new Date(expiresAt).getTime();

  const getDelta = () => {
    const delta = expirationDate - new Date().getTime();

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);
    const totalHours = (days * 24) + hours;

    return {
      days,
      hours: Math.min(totalHours, 23),
      minutes,
      seconds,
    };
  };

  const setValue = (id: string, value: number) => {
    const elem = document.getElementById(id);

    if (!elem) return;

    elem.style.setProperty("--value", value.toString());
  };

  const start = () =>
    setInterval(() => {
      const { days, hours, minutes, seconds } = getDelta();
      const isExpired = days + hours + minutes + seconds < 0;

      if (isExpired) {
        const expired = document.getElementById(`${rootId}::expired`);
        const counter = document.getElementById(`${rootId}::counter`);

        expired && expired.classList.remove("hidden");
        counter && counter.classList.add("hidden");
      } else {
        setValue(`${rootId}::days`, days);
        setValue(`${rootId}::hours`, hours);
        setValue(`${rootId}::minutes`, minutes);
        setValue(`${rootId}::seconds`, seconds);
      }
    }, 1000);

  document.readyState === "complete"
    ? start()
    : addEventListener("load", start);
};

function CampaignTimer({
  expiresAt = `${new Date()}`,
  labels,
  text = "Time left for a campaign to end wth a link",
  title = "",
  link = { text: "Click me", href: "/hello" },
  layout = { textPosition: "Before counter" },
}: Props) {
  const id = useId();

  return (
    <>
      <div class=" container flex justify-center flex-col items-center lg:my-16 mt-6 mb-8 lg:max-w-[1200px] rounded-lg text-accent-content">
        {title && (
          <div class="text-2xl text-center justify-center lg:text-3xl font-bold lg:mb-10 mb-8   flex lg:max-w-lg text-black"  dangerouslySetInnerHTML={{ __html: title }}/> 
        )}
        <div class="container bg-[#8C8C8C] max-w-[90%] md:max-w-full mx-auto flex flex-col rounded-lg  lg:items-center lg:justify-center gap-3 py-4 px-6  ">
          {layout?.textPosition !== "After counter" &&
            (
              <div
                class="lg:text-sm text-xs text-center  lg:max-w-lg"
                dangerouslySetInnerHTML={{ __html: text }}
              >
              </div>
            )}
          <div
            id={`${id}::expired`}
            class="hidden text-sm text-center  lg:max-w-lg"
          >
            {labels?.expired || "Expired!"}
          </div>
          <div class="flex flex-col items-center gap-8 lg:gap-16 justify-center lg:justify-normal">
            <div id={`${id}::counter`}>
              <div class="grid grid-flow-col gap-8 lg:gap-10 text-center auto-cols-max items-center">
                <div class="flex flex-col text-[10px] lg:text-xs items-center justify-center">
                  <span class="countdown font-bold text-xl lg:text-3xl">
                    <span id={`${id}::days`} />
                  </span>
                  {labels?.days || "dias"}
                </div>
             
                <div class="flex flex-col text-[10px] lg:text-xs items-center justify-center">
                  <span class="countdown font-bold text-xl lg:text-3xl">
                    <span id={`${id}::hours`} />
                  </span>
                  {labels?.hours || "horas"}
                </div>
                <div class="flex flex-col text-[10px] lg:text-xs items-center justify-center">
                  <span class="countdown font-bold text-xl lg:text-3xl">
                    <span id={`${id}::minutes`} />
                  </span>
                  {labels?.minutes || "minutos"}
                </div>
                <div class="flex flex-col text-[10px] lg:text-xs items-center justify-center">
                  <span class="countdown font-bold text-xl lg:text-3xl">
                    <span id={`${id}::seconds`} />
                  </span>
                  {labels?.seconds || "segundos"}
                </div>
              </div>
            </div>
            <div
              class={`hidden text-sm text-center lg:text-xl lg:text-left lg:max-w-lg ${
                layout?.textPosition === "After counter"
                  ? "lg:block"
                  : "lg:hidden"
              }`}
              dangerouslySetInnerHTML={{ __html: text }}
            >
            </div>
          </div>
          <div
            class={`lg:hidden lg:text-sm text-xs text-center  lg:text-left lg:max-w-lg ${
              layout?.textPosition === "After counter" ? "block" : "hidden"
            }`}
            dangerouslySetInnerHTML={{ __html: text }}
          >
          </div>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `(${snippet})("${expiresAt}", "${id}");`,
        }}
      />
    </>
  );
}

export default CampaignTimer;

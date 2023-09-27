import { useSignal } from "@preact/signals";
import Header from "$store/components/ui/SectionHeader.tsx";
import { Runtime } from "$store/runtime.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { JSX } from "preact";

export interface Form {
  namePlaceholder?: string;
  emailPlaceholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  image?: ImageWidget;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left";
      bgColor?: "Normal" | "Reverse";
    };
  };
}

const alignment = {
  center: "items-center justify-center",
  left: "items-start justify-start",
};

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    emailPlaceholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  layout: {
    headerFontSize: "Large",
    content: {
      border: false,
      alignment: "Center",
    },
  },
};

export default function Newsletter(props: Props) {
  const { title, description, form, layout, image } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  const isReverse = layout?.content?.bgColor === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const loading = useSignal(false);
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
        const name =
        (e.currentTarget.elements.namedItem("name") as RadioNodeList)?.value;

        
      await Runtime.vtex.actions.newsletter.subscribe({ email,name });
    } finally {
      loading.value = false;
    }
  };

  const headerLayout = (
    <div
      class={` flex flex-col lg:${
        layout?.content?.alignment === "Center"
          ? alignment.center
          : alignment.left
      } ${alignment.center} gap-2 `}
    >
      <h3 class={"font-bold text-sm lg:text-2xl text-[#191919] "}>{title}</h3>
      <p
        class={"bg:text-base text-xs text-center lg:text-start text-[#191919]"}
      >
        {description}
      </p>
    </div>
  );

  const formLayout = form && (
    <form
      onSubmit={handleSubmit}
      class="flex flex-col  items-center w-full lg:max-w-[422px] gap-4"
    >
      <div class="flex flex-col lg:flex-row flex-wrap gap-3 w-full">
        <input
          class="input rounded-lg border border-black placeholder:text-sm  w-full"
          type="text"
          name={"name"}
          placeholder={form.namePlaceholder}
        />
        <input
          class="input  rounded-lg border border-black placeholder:text-sm w-full"
          type="email"
          name={"email"}
          placeholder={form.emailPlaceholder}
        />
      </div>
      {form.helpText && (
        <div
          class="lg:text-sm text-xs text-center lg:text-start  mr-auto break-words"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
      )}
      <button
        class={`btn capitalize bg-[#191919] text-white font-semibold w-[187px] rounded-lg`}
        type="submit"
      >
        {form.buttonText}
      </button>
    </form>
  );

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-transparent";

  return (
    <div
      class={` container lg:max-w-[1200px] p-4  flex flex-col lg:flex-row w-full  justify-center gap-20 items-center lg:mt-20 lg:pr-4 ${
        bordered ? isReverse ? "bg-[#F5F5F5]" : "bg-secondary" : bgLayout
      } ${bordered ? "p-4 " : "p-0"}`}
    >
      {(!layout?.content?.alignment ||
        layout?.content?.alignment === "Center") && (
        <div
          class={`w-fit flex flex-col  lg:p-4 gap-6 border lg:border-none border-[#BFBFBF] rounded-lg max-w-[90%]  lg:ml-auto`}
        >
          {headerLayout}
          <div class="flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Left" && (
        <div
          class={`w-fit flex flex-col border border-[#BFBFBF] p-4 lg:border-none rounded-lg max-w-[90%] lg:p-4 gap-6  lg:ml-auto `}
        >
          {headerLayout}
          <div class="flex justify-start">
            {formLayout}
          </div>
        </div>
      )}
      {image && (
        <div class={"w-fit ml-auto hidden lg:block"}>
          <img class={"max-w-[519px] h-auto w-full"} src={image} alt="" />
        </div>
      )}
    </div>
  );
}

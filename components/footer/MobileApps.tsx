export default function MobileApps(
  { content }: {
    content: { title?: string; apple?: string; android?: string };
  },
) {
  return (
    <>
      {(content?.apple || content?.android) && (
        <div class="flex flex-col items-center gap-2 lg:flex-wrap  pb-11 md:pb-0 md:items-start">
          <h2 class="text-base text-[#000] font-bold uppercase p-4 md:p-0 ">
            {content?.title}
          </h2>
          {content?.apple && (
            <a href={content?.apple} target="_blank">
              <img
                loading="lazy"
                width="135"
                height="40"
                src="/image/app-apple.png"
              />
            </a>
          )}
          {content?.android && (
            <a href={content?.android} target="_blank">
              <img
                loading="lazy"
                width="135"
                height="40"
                src="/image/app-android.png"
              />
            </a>
          )}
        </div>
      )}
    </>
  );
}

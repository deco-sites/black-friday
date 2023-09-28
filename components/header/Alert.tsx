import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="carousel carousel-center w-screen gap-6 bg-[#191919]">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-secondary-content flex justify-center items-center w-screen h-[36px] text-white  gap-1 ">
              <Icon
                id="Promotion"
                size={27}
                strokeWidth={1}
                fill="none"
              />{" "}
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;

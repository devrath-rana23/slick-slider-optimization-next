import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMount from "@/hooks/useMount";

const SliderComponent = ({ addClass = "" }) => {
  const { hasMounted } = useMount();

  useEffect(() => {
    if (hasMounted) {
      const observerOptions = {
        childList: true,
        attributes: true,
      };

      const targetNode: any = document.querySelector(
        `.${addClass} .slick-arrow.slick-prev`
      );

      const callback1 = () => {
        targetNode?.addEventListener("click", () => {
          (async () => {
            await fetch("http://localhost:3000/api/t", {
              method: "post",
              body: JSON.stringify({
                tagging: "previous slick arrow clicked",
              }),
            });
          })();
          observer.disconnect();
        });
      };
      const observer = new MutationObserver(callback1);
      if (targetNode) {
        //this will execute if slick slider arrows element are created as soon as component is mounted
        callback1();
      } else {
        //this will execute if slick slider arrows element are created after some delay so it can observe that mutation in DOM
        observer.observe(targetNode, observerOptions);
      }
      const targetNode2: any = document.querySelector(
        `.${addClass} .slick-arrow.slick-next`
      );
      const callback2 = () => {
        targetNode2?.addEventListener("click", () => {
          (async () => {
            await fetch("http://localhost:3000/api/t", {
              method: "post",
              body: JSON.stringify({ tagging: "next slick arrow clicked" }),
            });
          })();
          observer2.disconnect();
        });
      };
      const observer2 = new MutationObserver(callback2);
      if (targetNode2) {
        callback2();
      } else {
        observer2.observe(targetNode2, observerOptions);
      }
    }
  }, [hasMounted]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };
  return (
    <div className={`${addClass} image-slider-container`}>
      <Slider {...settings}>
        <div>
          <img
            style={{ height: "100px", width: "100px" }}
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </div>
        <div>
          <img
            style={{ height: "100px", width: "100px" }}
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </div>
        <div>
          <img
            style={{ height: "100px", width: "100px" }}
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </div>
        <div>
          <img
            style={{ height: "100px", width: "100px" }}
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;

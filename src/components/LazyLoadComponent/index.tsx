//src/components/LazyLoadComponent/index.jsx
import React, { useEffect, useRef, useState } from "react";
import Load from "../Loader";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,

  /* required options*/
  trackVisibility: true,
  delay: 100,
};

const LazyLoadComponent = ({ Component, Loader = Load}: any) => {
  const targetRef: any = useRef();
  const [showComponent, setShowComponent] = useState(false);
  const [minHeight, setMinHeight] = useState("50vh");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //this ensures that once component is
          //loaded lazily it does not need to be
          //re rendered if the user scrolls away
          //and this component gets out of viewport set in options
          setShowComponent(true);
          setMinHeight("1px");
        }
      });
    }, options);

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ minHeight }} ref={targetRef}>
      {showComponent ? Component  : <Loader />}
    </div>
  );
};

export default LazyLoadComponent;

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export const Card = forwardRef(
  ({ customClass, responsive = true, ...rest }, ref) => {
    const responsiveClasses = responsive 
      ? "rounded-lg sm:rounded-xl border border-white/80 sm:border-white text-sm sm:text-base" 
      : "rounded-xl border border-white";
    
    return (
      <div
        ref={ref}
        {...rest}
        className={`absolute top-1/2 left-1/2 bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${responsiveClasses} ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
      />
    );
  }
);
Card.displayName = "Card";

const makeSlot = (
  i,
  distX,
  distY,
  total
) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
  responsive = true,
}) => {
  const config =
    easing === "elastic"
      ? {
        ease: "elastic.out(0.6,0.9)",
        durDrop: 2,
        durMove: 2,
        durReturn: 2,
        promoteOverlap: 0.9,
        returnDelay: 0.05,
      }
      : {
        ease: "power1.inOut",
        durDrop: 0.8,
        durMove: 0.8,
        durReturn: 0.8,
        promoteOverlap: 0.45,
        returnDelay: 0.2,
      };

  const childArr = useMemo(
    () => Children.toArray(children),
    [children]
  );
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const getResponsiveDistances = () => {
      if (!responsive) return { cardDistance, verticalDistance };
      
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
      
      if (screenWidth < 480) {
        return {
          cardDistance: cardDistance * 0.8,
          verticalDistance: verticalDistance * 0.8
        };
      } else if (screenWidth < 768) {
        return {
          cardDistance: cardDistance * 0.9,
          verticalDistance: verticalDistance * 0.9
        };
      } else if (screenWidth < 1024) {
        return {
          cardDistance: cardDistance * 0.9,
          verticalDistance: verticalDistance * 0.9
        };
      }
      
      return { cardDistance, verticalDistance };
    };

    const { cardDistance: respCardDistance, verticalDistance: respVerticalDistance } = getResponsiveDistances();
    
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(
        r.current,
        makeSlot(i, respCardDistance, respVerticalDistance, total),
        skewAmount
      )
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, respCardDistance, respVerticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        respCardDistance,
        respVerticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, responsive]);

  const getResponsiveDimensions = () => {
    if (!responsive) return { width, height };
    
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    
    if (screenWidth < 480) {
      return {
        width: Math.min(width * 0.9, screenWidth * 0.9),
        height: Math.min(height * 0.9, screenWidth * 0.75)
      };
    } else if (screenWidth < 768) {
      return {
        width: Math.min(width * 0.95, screenWidth * 0.9),
        height: Math.min(height * 0.95, screenWidth * 0.8)
      };
    } else if (screenWidth < 1024) {
      return {
        width: Math.min(width * 0.9, screenWidth * 0.6),
        height: Math.min(height * 0.9, screenWidth * 0.5)
      };
    }
    
    return { width, height };
  };

  const responsiveDimensions = getResponsiveDimensions();

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
        key: i,
        ref: refs[i],
        style: { 
          width: responsiveDimensions.width, 
          height: responsiveDimensions.height, 
          ...(child.props.style ?? {}) 
        },
        onClick: (e) => {
          child.props.onClick?.(e);
          onCardClick?.(i);
        },
      }) : child
  );

  const getResponsiveClasses = () => {
    if (!responsive) {
      return "absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible";
    }
    
    return `
      absolute transform perspective-[900px] overflow-visible
      bottom-0 right-0 translate-x-[5%] translate-y-[20%] origin-bottom-right
      lg:bottom-0 lg:right-0 lg:translate-x-[5%] lg:translate-y-[20%] lg:scale-100 lg:origin-bottom-right
      md:bottom-0 md:right-0 md:translate-x-[8%] md:translate-y-[18%] md:scale-[0.9] md:origin-bottom-right
      max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:scale-[1.1] max-md:origin-center
      max-sm:top-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 max-sm:scale-[1.0] max-sm:origin-center
      max-[480px]:top-1/2 max-[480px]:left-1/2 max-[480px]:-translate-x-1/2 max-[480px]:-translate-y-1/2 max-[480px]:scale-[0.9] max-[480px]:origin-center
      max-[320px]:top-1/2 max-[320px]:left-1/2 max-[320px]:-translate-x-1/2 max-[320px]:-translate-y-1/2 max-[320px]:scale-[0.8] max-[320px]:origin-center
    `.replace(/\s+/g, ' ').trim();
  };

  return (
    <div
      ref={container}
      className={getResponsiveClasses()}
      style={{ 
        width: responsiveDimensions.width, 
        height: responsiveDimensions.height 
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;

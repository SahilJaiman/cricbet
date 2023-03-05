import { useRef } from "react";
import { useInView } from "framer-motion";


export const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}
      className={`${isInView ? '' :'translate-x-[-240px]' } transition-all duration-1000 ease-in-out `}

      style={{

        opacity: isInView ? 1 : 0,
       
      }}
    >
      {children}

    </section>
  );
};

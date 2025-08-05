import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
}

const InfiniteScrollContainer = ({
  children,
  onBottomReached,
  className,
}: InfiniteScrollContainerProps) => {
  const [key, setKey] = useState(0);
  const { ref, inView } = useInView({
    rootMargin: "200px",
    // onChange: (inView) => {
    //   if (inView) {
    //     onBottomReached();
    //   }
    // },
  });

  useEffect(() => {
    if (inView) {
      onBottomReached();
    }
  }, [inView]);

  // Optional: Expose a key-based reset from parent if needed
  useEffect(() => {
    // When children change significantly, rebind the observer
    setKey((prev) => prev + 1);
  }, [children]);
  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteScrollContainer;

import { useEffect, useState } from "react";

const useMount = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return { hasMounted };
};

export default useMount;

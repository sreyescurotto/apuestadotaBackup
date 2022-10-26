import { useState, useEffect } from "react";

import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.

    if (typeof localStorage !== "undefined") {
      const router = useRouter();

      const user = localStorage.getItem("user");

      // If there is no access token we redirect to "/" page.

      if (!user) {
        router.replace("/login");

        return null;
      }

      const [mounted, setMounted] = useState(false);

      useEffect(() => {
        setMounted(true);
      }, []);

      // If this is an accessToken we just render the component that was passed with all its props

      return mounted && <WrappedComponent {...props} />;
    }

    // If we are on server, return null

    return null;
  };
};

export default withAuth;

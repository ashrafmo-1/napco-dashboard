import AxiosInterceptor from "../hooks/AxiosInterceptor.jsx";
import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "../context/UserProvider.jsx"; // Changed .js to .jsx
import { PermissionsProvider } from "../context/PermissionsProvider.jsx";

export const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <PermissionsProvider>{children}</PermissionsProvider>
          </UserProvider>
        </QueryClientProvider>
      </AxiosInterceptor>
    </BrowserRouter>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

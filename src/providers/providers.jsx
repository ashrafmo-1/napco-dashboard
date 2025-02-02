import { StrictMode } from "react";
import AxiosInterceptor from "../hooks/AxiosInterceptor.jsx";
import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "../context/UserProvider.jsx"; // Changed .js to .jsx

export const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosInterceptor>
        <UserProvider>
          <BrowserRouter>
            <StrictMode>{children}</StrictMode>
          </BrowserRouter>
        </UserProvider>
      </AxiosInterceptor>
    </QueryClientProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired, // Changed from PropTypes.any to PropTypes.node
};
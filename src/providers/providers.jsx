import {StrictMode} from "react";
import AxiosInterceptor from "../hooks/AxiosInterceptor.jsx";
import {BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {QueryClient, QueryClientProvider} from "react-query";

export const Providers = ({children}) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <AxiosInterceptor>
                <BrowserRouter>
                    <StrictMode>
                        {children}
                    </StrictMode>
                </BrowserRouter>
            </AxiosInterceptor>
        </QueryClientProvider>
    )
}

Providers.propTypes = {
    children: PropTypes.any.isRequired,
};
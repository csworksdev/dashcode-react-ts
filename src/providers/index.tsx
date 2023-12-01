import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "@/components/ErrorFallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
    children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });
    return (
        <>
            <Toaster position="top-left" containerClassName="z-index-toast centered-toast-notification" reverseOrder={false} toastOptions={{
                className: 'css-cj-j-c_a09_2a',
            }} />
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    {/* <ReactQueryDevtools /> */}
                    <Provider store={store}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            {children}
                        </ErrorBoundary>
                    </Provider>
                </QueryClientProvider>
            </BrowserRouter>
        </>
    )
};
export default AppProvider;
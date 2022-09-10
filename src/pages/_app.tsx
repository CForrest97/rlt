import React from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";
import { Header } from "../components/Header";

export const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Header />
    <div className="pt-16 mx-auto px-3 md:px-36 lg:px-52 xl:px-80 ">
      <Component {...pageProps} />
    </div>
  </QueryClientProvider>
);

export default MyApp;

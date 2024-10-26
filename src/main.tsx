import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from './pages/404-error';
import Layout from './layout';
import Home from './pages/home';
import { BaseStyles, ThemeProvider } from '@primer/react';

function Main() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider colorMode="dark">
        <BaseStyles>
          <Layout>
            <Outlet />
          </Layout>
        </BaseStyles>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={
      createBrowserRouter([{
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      }])}
    />
  </React.StrictMode>
);
import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from './pages/UpcomingMovies';
import TrendingMoviesPage from "./pages/TrendingMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import LoginPage from "./pages/LoginPage"; // 引入 LoginPage
import ProtectedRoute from "./components/ProtectedRoute"; // 引入 ProtectedRoute
import './axiosConfig';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            {/* 登录页面 */}
            <Route path="/login" element={<LoginPage />} />

            {/* 使用 ProtectedRoute 保护的路由 */}
            <Route 
              path="/movies/favorites" 
              element={
                <ProtectedRoute>
                  <FavoriteMoviesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reviews/form" 
              element={
                <ProtectedRoute>
                  <AddMovieReviewPage />
                </ProtectedRoute>
              } 
            />

            {/* 其他公开路由 */}
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/trending" element={<TrendingMoviesPage />} />
            <Route path="/actors/:id" element={<ActorDetailsPage />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

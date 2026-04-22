import React from "react";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { SinglePostDetailsPage } from "./pages/SinglePostDetailsPage";
import { CreatePost } from "./pages/CreatePost";
import {  Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { MyBlogs } from "./pages/MyBlogs";
import { UpdatePost } from "./pages/UpdatePost";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

export const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Toaster
          position="top-right"
          containerStyle={{ top: 90 }}
          toastOptions={{
            style: {
              background: "#fff",
              color: "#111",
              border: "1px solid #e5e7eb",
            },
          }}
        />
        <Header />

        <main className="flex-grow flex flex-col ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<SinglePostDetailsPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset_password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />

            <Route
              path="/write-blog"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-blogs"
              element={
                <ProtectedRoute>
                  <MyBlogs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <UpdatePost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
};

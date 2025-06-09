import React from "react";

export default function Layout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 pt-6 min-h-screen">
      {children}
    </div>
  );
}

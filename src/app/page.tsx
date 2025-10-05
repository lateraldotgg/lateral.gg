"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Home = () => {
  return (
    <main className="p-2" role="main">
      <h2 className="mb-4 text-xl font-semibold">Welcome to lateral.gg</h2>
      <p>This is the home page content.</p>
    </main>
  );
};

export default Home;

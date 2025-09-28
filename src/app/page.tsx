"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Home = () => {
  const events = useQuery(api.queries.events.list100);
  return (
    <main className="p-2" role="main">
      <h2 className="mb-4 text-xl font-semibold">Welcome to lateral.gg</h2>
      <p>This is the home page content.</p>
      {events?.map(({ _id, name, description }) => (
        <div key={_id}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      ))}
    </main>
  );
};

export default Home;

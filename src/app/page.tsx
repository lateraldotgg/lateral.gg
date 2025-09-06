const Home = async () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-sans font-extrabold">lateral.gg</h1>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-lg font-sans font-extralight">Extra Light (200)</p>
          <p className="text-lg font-sans font-light">Light (300)</p>
          <p className="text-lg font-sans font-normal">Normal (400)</p>
          <p className="text-lg font-sans font-medium">Medium (500)</p>
          <p className="text-lg font-sans font-semibold">Semibold (600)</p>
          <p className="text-lg font-sans font-bold">Bold (700)</p>
          <p className="text-lg font-sans font-extrabold">Extra Bold (800)</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-mono">Share Tech Mono Font Test</p>
          <p className="text-base">Default text (should use Oxanium)</p>
          <p className="text-sm font-mono">Monospace text test</p>
        </div>
      </main>
    </div>
  );
};

export default Home;

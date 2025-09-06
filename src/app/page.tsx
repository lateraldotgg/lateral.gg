import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "@/components/ui/kibo-ui/glimpse";
import { glimpse } from "@/components/ui/kibo-ui/glimpse/server";
import { Icon } from "@iconify/react";

const Home = async () => {
  // Get repo data
  const repoUrl = "https://github.com/lateraldotgg/lateral.gg";
  const repoData = await glimpse(repoUrl);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
        Coming{" "}
        <Glimpse closeDelay={0} openDelay={0}>
          <GlimpseTrigger asChild>
            <a
              className="font-medium underline hover:text-gray-300 transition-colors"
              style={{ color: 'white' }}
              href={repoUrl}
              >now(tm)</a>
          </GlimpseTrigger>
          <GlimpseContent className="w-80">
          <GlimpseImage src={repoData.image ?? ""} />
          <GlimpseTitle>{repoData.title}</GlimpseTitle>
          <GlimpseDescription>{repoData.description}</GlimpseDescription>
          </GlimpseContent>
        </Glimpse>
        ??
        </div>
      </main>
    </div>
  );
};

export default Home;

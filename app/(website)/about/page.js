import { getAboutPage } from "@/lib/sanity/client";
import About from "./about";

export default async function AboutPage() {
  const aboutData = await getAboutPage();
  
  return <About aboutData={aboutData} />;
}

// export const revalidate = 60;

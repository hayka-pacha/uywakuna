import HomePage from "./home";
import { getAllPosts, getSettings } from "@/lib/sanity/client";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schemas";

export default async function IndexPage() {
  const posts = await getAllPosts();
  const settings = await getSettings();

  // Generate schemas for homepage
  const organizationSchema = generateOrganizationSchema(settings);
  const websiteSchema = generateWebSiteSchema(settings);

  return (
    <>
      {/* JSON-LD Structured Data - Organization */}
      {organizationSchema && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(organizationSchema)}
        </script>
      )}

      {/* JSON-LD Structured Data - WebSite */}
      {websiteSchema && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      <HomePage posts={posts} />
    </>
  );
}

export const revalidate = 60;

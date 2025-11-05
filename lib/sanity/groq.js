import { groq } from "next-sanity";

// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  title_es,
  title_fr,
  excerpt_es,
  excerpt_fr,
  slug_es,
  slug_fr,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->{
    _id,
    title_es,
    title_fr,
    slug,
    color,
    description_es,
    description_fr
  },
}
`;
// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  title_es,
  title_fr,
  excerpt_es,
  excerpt_fr,
  slug_es,
  slug_fr,
  author->{
    _id,
    image,
    slug,
    name
  },
  categories[]->{
    _id,
    title_es,
    title_fr,
    slug,
    color
  }
}
`;
// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  title_es,
  title_fr,
  excerpt_es,
  excerpt_fr,
  slug_es,
  slug_fr,
  author->{
    _id,
    image,
    slug,
    name
  },
  categories[]->{
    _id,
    title_es,
    title_fr,
    slug,
    color
  }
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  _id,
  title_es,
  title_fr,
  tagline_es,
  tagline_fr,
  description_es,
  description_fr,
  url,
  copyright,
  logo,
  logoalt,
  email,
  phone,
  w3ckey,
  social,
  openGraphImage
}
`;

// Get About Page Content
export const aboutQuery = groq`
*[_type == "about"][0] {
  _id,
  title_es,
  title_fr,
  subtitle_es,
  subtitle_fr,
  mainImage {
    ...,
    "blurDataURL": asset->metadata.lqip
  },
  content_es,
  content_fr
}
`;

// Single Post
export const singlequery = groq`
*[_type == "post" && (slug_es.current == $slug || slug_fr.current == $slug)][0] {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  title_es,
  title_fr,
  excerpt_es,
  excerpt_fr,
  slug_es,
  slug_fr,
  body_es[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug_es
      }
    }
  },
  body_fr[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug_fr
      }
    }
  },
  author->{
    _id,
    image,
    slug,
    name
  },
  categories[]->{
    _id,
    title_es,
    title_fr,
    slug,
    color
  },
  "estReadingTime_es": round(length(pt::text(body_es)) / 5 / 180 ),
  "estReadingTime_fr": round(length(pt::text(body_fr)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title_es,
    title_fr,
    slug_es,
    slug_fr,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && (defined(slug_es.current) || defined(slug_fr.current))] {
  "slug_es": slug_es.current,
  "slug_fr": slug_fr.current
}
`;
export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;

// Get Posts by Category
export const postsbycatquery = groq`
*[_type == "post" && $slug in categories[]->slug.current ] {
  _id,
  _createdAt,
  publishedAt,
  mainImage,
  featured,
  title_es,
  title_fr,
  excerpt_es,
  excerpt_fr,
  slug_es,
  slug_fr,
  author->{
    _id,
    image,
    slug,
    name
  },
  categories[]->{
    _id,
    title_es,
    title_fr,
    slug,
    color
  }
}
`;

// Get top 5 categories
export const catquery = groq`*[_type == "category"] {
  _id,
  title_es,
  title_fr,
  slug,
  color,
  description_es,
  description_fr,
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title_es match $query || title_fr match $query || excerpt_es match $query || excerpt_fr match $query || pt::text(body_es) match $query || pt::text(body_fr) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  title_es,
  title_fr,
  slug_es,
  slug_fr,
  excerpt_es,
  excerpt_fr,
  author->{
    _id,
    image,
    slug,
    name
  },
  categories[]->{
    _id,
    title_es,
    title_fr,
    slug,
    color
  }
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 _id,
 name,
 slug,
 image,
 'slug': slug.current,
}
`;

// get everything from sanity
// to test connection
export const getAll = groq`*[]`;

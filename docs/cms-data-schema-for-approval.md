# CMS Data Schema & Approval Guide

This guide explains the CMS content in plain language so a nontechnical reviewer can check and approve data confidently.

## How approval works

Most website content supports **Draft** and **Published** versions.

- **Draft**: saved in the CMS but not live on the website.
- **Published**: approved and visible on the website.
- **Preview**: lets reviewers view content before publishing.
- **Published At**: the date/time the item is or was published.

Recommended approval flow:

1. Open the item in the CMS.
2. Review all required fields and public-facing text/images.
3. Use Preview when available.
4. Confirm internal-only fields are not used as public copy.
5. Publish only when the item is approved.

---

## Main content areas

| CMS area | What it stores | Approval focus |
|---|---|---|
| Properties | Real estate listings for sale, rent, or lease | Property facts, pricing, location, images, status |
| Pages | Website pages such as Home, About, Contact | Page title, hero section, page blocks, SEO |
| Posts | Blog/news articles | Article content, category, author, SEO |
| Media | Uploaded images/files | Correct image, alt text, captions |
| Categories | Post categories | Category name and URL slug |
| Header | Top navigation menu | Correct menu links |
| Footer | Bottom navigation menu | Correct menu links |
| Users | CMS user accounts/authors | Name and email/access |

---

## Properties

Properties are the most important business records for the real estate website.

### Listing tab

| Field | Meaning | Required? | Notes for approval |
|---|---|---:|---|
| Title | Public listing title | Yes | Should be clear and client-friendly |
| Property ID | Auto-generated listing ID | Auto | Example: `CR-2026-0001` |
| Listing Type | Sale, Rent, or Lease | Yes | Must match the deal type |
| Property Type | Bare Land, House, Villa, Apartment, Commercial, Agricultural, Warehouse, Mixed-Use | Yes | Must match the property |
| Status | Active, Under Offer, Sold, Withdrawn, Expired | Yes | Controls how the listing should be treated |
| Sub Type | Extra property classification | No | Example: beachfront villa, coconut land |
| Pin to top of category | Featured listing flag | No | Featured items appear before regular listings |
| Pinned order | Featured sort order | No | Lower numbers show first |
| Description | Public property description | No | Check spelling, tone, and accuracy |

### Location tab

| Field | Meaning | Required? | Notes for approval |
|---|---|---:|---|
| Address | Property address | Yes | Confirm public-safe address detail |
| City | City/town | Yes | Used in listing summaries |
| GN Division | Local administrative area | No | Check if available |
| DS Division | Divisional Secretariat area | No | Check if available |
| District | District | No | Example: Galle, Matara |
| Province | Province | No | Example: Southern Province |
| Google Maps Link | Link to map | No | Should open the correct location |
| Google Maps Embed URL | Embedded map URL | No | Must be a Google Maps embed `src` URL |

### Details & Media tab

| Field | Meaning | Required? | Notes for approval |
|---|---|---:|---|
| Featured Image | Main listing image | No | Should be high quality and accurate |
| Gallery | Additional listing images | No | Remove duplicates/poor images |
| Extent Perches | Land size in perches | Yes | Used for price calculations |
| Bedrooms | Number of bedrooms | No | Use only when relevant |
| Bathrooms | Number of bathrooms | No | Use only when relevant |
| Frontage Ft | Road/sea/frontage in feet | No | Confirm measurement |
| Sea View | Whether property has sea view | No | Only tick if true |
| Pool | Whether property has pool | No | Only tick if true |
| Distance to Beach M | Distance to beach in meters | No | Use realistic number |
| Furnished Status | Furnished, Unfurnished, Partially Furnished | No | Only for relevant properties |

### Pricing & Internal tab

| Field | Meaning | Required? | Notes for approval |
|---|---|---:|---|
| Listed Price Total | Asking/listed price | Yes | Confirm currency/amount before publishing |
| Price Per Perch Listed | Auto-calculated listed price per perch | Auto | Based on listed price and extent |
| Sold Price Total | Final sold price | No | Use after sale closes |
| Price Per Perch Sold | Auto-calculated sold price per perch | Auto | Based on sold price and extent |
| Negotiation Margin % | Auto-calculated discount from asking to sold price | Auto | Internal/business metric |
| Date Listed | Listing start date | Yes | Defaults to today |
| Date Sold/Withdrawn | Sold or withdrawn date | No | Add when status changes |
| Days on Market | Auto-calculated active duration | Auto | Based on listed and exit dates |
| Listing Agent Name | Responsible agent | No | Internal/contact reference |
| Source | Owner-direct, Referral, Another Agency, Portal | No | Business tracking |
| Commission Rate % | Commission percentage | No | Internal/business metric |
| Commission Amount | Auto-calculated commission | Auto | Internal/business metric |
| Internal Notes | Private notes | No | Should not be public copy |

### Legal tab

| Field | Meaning | Required? | Notes for approval |
|---|---|---:|---|
| Title Type | Freehold or Leasehold | No | Confirm with legal documents |
| Deed Lot Number | Deed lot reference | No | Check exact spelling/number |
| Survey Plan Number | Survey plan reference | No | Check exact spelling/number |
| Government Valuation | Official valuation | No | Internal/reference value |

---

## Pages

Pages are standard website pages.

| Field/section | Meaning | Approval focus |
|---|---|---|
| Title | Page name | Clear and correct |
| Hero | Top visual/title area | Matches page purpose |
| Content blocks | Main page sections | Correct order, text, images, links |
| SEO | Search/social preview information | Accurate title, description, image |
| Published At | Publish date/time | Correct before publishing |
| Slug | URL path | Short, readable, no typos |

Available page blocks:

| Block | Purpose | Approval focus |
|---|---|---|
| Content | Text columns with optional links | Text accuracy and layout |
| Call to Action | Promotional message with buttons | Button text and destination |
| Media Block | Single image/media item | Correct image and alt text |
| Archive | Displays posts, usually filtered by category | Correct category/limit/selection |
| Form Block | Embeds a form | Correct form and intro copy |

---

## Posts

Posts are articles or news updates.

| Field/section | Meaning | Approval focus |
|---|---|---|
| Title | Article title | Clear and publish-ready |
| Hero Image | Main article image | Relevant and high quality |
| Content | Article body | Grammar, facts, formatting |
| Related Posts | Suggested articles | Relevant selections |
| Categories | Topic grouping | Correct categories |
| SEO | Search/social preview information | Accurate title, description, image |
| Published At | Publish date/time | Correct before publishing |
| Authors | CMS users credited as authors | Correct author names |
| Slug | URL path | Short, readable, no typos |

---

## Media

Media stores uploaded images/files used across the CMS.

| Field | Meaning | Approval focus |
|---|---|---|
| File | Uploaded image/file | Correct file, good quality |
| Alt Text | Description for accessibility/search | Short description of the image |
| Caption | Optional visible/supporting caption | Accurate and appropriate |

The CMS automatically creates different image sizes for website performance.

---

## Categories

Categories organize posts.

| Field | Meaning | Approval focus |
|---|---|---|
| Title | Category name | Clear and correctly spelled |
| Slug | URL-friendly version | Simple and lowercase if possible |

---

## Header and Footer navigation

Header and Footer each contain up to 6 navigation items.

| Field | Meaning | Approval focus |
|---|---|---|
| Navigation item | Menu link | Correct label and destination |
| Internal link | Link to a CMS page/post | Opens correct content |
| Custom URL | External/manual link | URL is correct and safe |

---

## Users

Users are CMS accounts and possible post authors.

| Field | Meaning | Approval focus |
|---|---|---|
| Name | Display/admin name | Correct person name |
| Email | Login email | Correct email address |
| Password | Login password | Managed securely, not shared |

---

## Quick approval checklist

Before approving/publishing, check:

- Required fields are complete.
- Public text is accurate and typo-free.
- Images are correct, high quality, and have useful alt text.
- Links open the right destination.
- Slugs/URLs are clean and readable.
- SEO title/description/image are suitable.
- Property prices, sizes, status, and location are verified.
- Internal notes and business metrics are not accidentally used as public copy.

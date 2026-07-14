# Product Brief — YumYum "Find Your Plan" Onboarding

**YumYum** is a meal-kit delivery service and recipe-discovery portal. Customers pick a plan, and every week a box arrives with exact ingredients and recipe cards for their dinners.

**The problem:** most customers arrive not knowing what they want, and as our catalogue grows, sorting, filtering, and browsing every available recipe has become a chore. The very thing they came to us to avoid.

People choose YumYum for the convenience of getting good meals on the table without the mental load. Choosing those meals should feel just as effortless.

**What we want:** a better onboarding experience — one that makes customers feel understood and hands them a personalised recommendation, instead of a catalogue to wade through.



---

## Initial idea 

A single-page experience. Desktop web, laid out as a centered mobile-width column. One question per screen, a progress bar, a back button. Single-choice answers advance automatically; multi-selects have a Next button.

**Welcome screen** — big friendly headline, one line of what's about to happen, a single CTA. A hook, not a login page.

**Four questions only:**

1. **Who are you cooking for most nights?** — Just me / Me and one other /
  A family with kids
2. **How many dinners a week should we plan?** — 2 / 3 / 4 / 5
3. **Which best describes how you eat?** — I eat everything / Flexitarian /
  Pescatarian / Vegetarian / Vegan
4. **Any allergies or ingredients you avoid?** — multi-select: gluten, dairy,
  nuts, shellfish, soy, eggs — plus a "None of these" that clears the rest

**Results screen** — play the answers back ("here's what we heard"). 



---

## Content we already have

The content team tagged our current catalogue — 49 recipes with diet, allergens, protein, cook time, etc. — in `lib/recipes.ts`. You don't need it for v1, but treat it as the source of truth when we start using recipe data.



---

## Out of scope

No accounts, no checkout, no payments, no email capture, no real backend. Don't add extra questions or a recommendation engine yet — we'll grow from this skeleton once it works.
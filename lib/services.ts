/**
 * Six service areas — Surroundings Group.
 * One-word names. Source of truth for homepage grid + individual service pages.
 *
 * Data shape extended (2026-05-29) with rich detail-page fields:
 *   - intro            : richer positioning paragraph for the detail page
 *   - sampleDeliverables: concrete examples of what ships
 *   - bestForCopy      : a short paragraph on who this is best for
 *   - processSteps[]   : service-specific four-step process
 */

export interface ProcessStep {
  title: string;
  copy: string;
}

export interface Service {
  slug: string;
  /** One-word service name */
  name: string;
  /** Confident one-line positioning statement */
  tagline: string;
  /** Longer description for cards + landing pages */
  description: string;
  /** What's included — used on service detail pages */
  capabilities: string[];
  href: string;
  /** Rich positioning paragraph for the detail page */
  intro: string;
  /** Concrete examples of what we ship under this service */
  sampleDeliverables: string[];
  /** Short paragraph on the best-fit client for this service */
  bestForCopy: string;
  /** Service-specific four-step process (not generic) */
  processSteps: ProcessStep[];
}

export const services: Service[] = [
  {
    slug: "studio",
    name: "Studio",
    tagline: "Premium production for brands that demand it.",
    description:
      "In-house creative production built for premium markets — from cinematic brand films to listing videos, aerial coverage, and editorial photography. Every frame matches the standard of the brands we serve.",
    capabilities: [
      "Brand films & lifestyle video",
      "Listing & walkthrough videos",
      "Aerial & drone production",
      "Editorial & product photography",
      "Event coverage",
      "Post-production & color",
    ],
    href: "/services/studio",
    intro:
      "Studio is where the work gets made. We run a fully in-house production team built specifically for premium brands. Directors, cinematographers, photographers, drone operators, and post-production all working under one roof, on one schedule, to one standard. The work travels across our distribution network, so the films you commission for a launch run across more than just your channels.",
    sampleDeliverables: [
      "60–90 second cinematic brand film",
      "Lifestyle photo set for a seasonal campaign",
      "30-property listing video program for a brokerage",
      "Aerial campaign film for a coastal development",
      "Editorial-grade product shoot for a watch collection",
      "Multi-day on-property capture for a resort or hospitality opening",
    ],
    bestForCopy:
      "Studio is the right call when the work needs to look like the brands at the top of your category, not the agencies that pitch them. If a stock-library mood board can describe what you need, you don't need us. If the work needs to feel like a magazine cover or a film, this is where it gets made.",
    processSteps: [
      {
        title: "Pre-production",
        copy: "Concept, treatment, locations, talent, scheduling. We pre-plan to a level that lets the shoot run at the standard the work requires.",
      },
      {
        title: "Production",
        copy: "Our team on set. Director, cinematography, photo, drone, art direction. We don't sub-contract the shoot to a freelance network and stand back.",
      },
      {
        title: "Post-production",
        copy: "Edit, color, sound, finishing. The post pipeline is owned by the same team that shot it, so the work that arrives matches the work that was planned.",
      },
      {
        title: "Distribution",
        copy: "Hero assets, social cutdowns, paid variants, OOH cuts. The shoot ships as a campaign system, not a single film looking for a home.",
      },
    ],
  },
  {
    slug: "social",
    name: "Social",
    tagline: "Where premium brands live online.",
    description:
      "Full-service social presence management — strategy, content, community, and growth — executed by a team that understands how premium audiences engage, share, and buy.",
    capabilities: [
      "Multi-platform management",
      "Content calendar & production",
      "Community engagement",
      "Influencer & creator collaboration",
      "Editorial publishing across owned channels",
      "Monthly strategy & reporting",
    ],
    href: "/services/social",
    intro:
      "Social is the most-used room in a premium brand. We run it as a full discipline: strategy, daily publishing, community work, paid amplification, and reporting. The team that runs your social is the same team that publishes our editorial channels, which means a working knowledge of premium audiences and the kind of content that earns attention from them.",
    sampleDeliverables: [
      "Monthly content calendar across Instagram, TikTok, LinkedIn, and Pinterest",
      "Daily community management and DM response",
      "Quarterly influencer and creator partnerships",
      "Cross-platform content adaptation from a single capture",
      "Monthly performance reporting against the metrics that matter",
      "Editorial integration with the Surroundings Group channels",
    ],
    bestForCopy:
      "Social is the right call when the brand's online presence is a real channel, not a checkbox. We work with clients who treat their feeds as part of the product, who care about the standard of what gets published, and who want their account to set the bar in their category instead of meet it.",
    processSteps: [
      {
        title: "Audit & strategy",
        copy: "Where the brand stands today, where the category lives online, and what the path to leadership looks like. Specific to the audience and the platforms that matter most.",
      },
      {
        title: "Content system",
        copy: "Pillars, formats, voice, and the cadence that makes the calendar runnable. Built so the brand can show up consistently without consuming the operator's calendar.",
      },
      {
        title: "Daily operation",
        copy: "Publishing, community, DM response, listening, and creator partnerships. Run by the same senior team that planned it.",
      },
      {
        title: "Growth & report",
        copy: "Monthly reporting against the audience and outcomes we agreed on, plus the iteration that keeps the program improving past month three.",
      },
    ],
  },
  {
    slug: "digital",
    name: "Digital",
    tagline: "Websites worthy of the brands behind them.",
    description:
      "Strategy, design, build, and ongoing care for digital properties that convert as well as they look. Mobile-first, performance-obsessed, and tailored to the conventions of your category.",
    capabilities: [
      "Website strategy & UX",
      "Custom design & development",
      "Webflow, WordPress & custom builds",
      "Hosting, maintenance & security",
      "SEO & conversion optimization",
      "Analytics & dashboarding",
    ],
    href: "/services/digital",
    intro:
      "Digital is everything the brand does at a URL. Sites that load fast, look like the brand, and convert the right kind of traffic. We design and build for the premium end of every category we serve, which means we know how a luxury developer's site should feel different from a private aviation operator's, and both should feel different from a watchmaker's. Built right, hosted right, kept current.",
    sampleDeliverables: [
      "Full website redesign and build for a flagship property launch",
      "Listing or portfolio system for a brokerage or design firm",
      "Conversion-optimized landing pages for paid campaigns",
      "Migration from WordPress to a modern static or hybrid build",
      "Ongoing SEO program and quarterly content optimization",
      "Performance, accessibility, and security audits",
    ],
    bestForCopy:
      "Digital is the right call when the current site is the bottleneck. If buyers are landing and bouncing, if the design hasn't been touched in three years, if the brand has evolved and the URL hasn't caught up, this is the team. We treat the site as the most-used brand surface, because it is.",
    processSteps: [
      {
        title: "Strategy & sitemap",
        copy: "Who the site is for, what it needs to do, and the architecture that gets there. Built around the real conversion paths a premium buyer takes.",
      },
      {
        title: "Design",
        copy: "Brand-aligned, mobile-first, performance-conscious. The visual system extends the brand work, it doesn't reinterpret it.",
      },
      {
        title: "Build",
        copy: "Webflow, WordPress, or custom Next.js depending on what the client actually needs. We build to the standard the brand requires, not the easiest CMS to spin up.",
      },
      {
        title: "Care & optimize",
        copy: "Hosting, maintenance, security, SEO, and the conversion work that keeps the site improving past launch.",
      },
    ],
  },
  {
    slug: "growth",
    name: "Growth",
    tagline: "Integrated demand for premium markets.",
    description:
      "Paid advertising, public relations, email, and owned-media distribution working together as one acquisition engine. Built to reach the audiences that matter, and convert them.",
    capabilities: [
      "Paid media (Google, Meta, YouTube, LinkedIn)",
      "Public relations & press placement",
      "Email marketing & HubSpot automation",
      "Owned-media distribution",
      "Funnel & landing page optimization",
      "Lifecycle programs",
    ],
    href: "/services/growth",
    intro:
      "Growth is how the work reaches the buyer. We run paid, PR, email, and our owned-media network as one connected acquisition system, not five disconnected channels charged separately. The advantage at SG: when we ship a campaign, it doesn't only go through paid. It goes through editorial channels we run, with audiences we built, which means every dollar of paid is amplified by reach we didn't have to buy.",
    sampleDeliverables: [
      "Paid program across Google, Meta, and YouTube for a property launch",
      "PR campaign tied to a new-model release or grand opening",
      "Email and lifecycle program connected to HubSpot or Klaviyo",
      "Owned-media integration across the Surroundings Group editorial channels",
      "Landing page and funnel optimization tied to the paid spend",
      "Monthly reporting against acquisition cost and outcomes that matter",
    ],
    bestForCopy:
      "Growth is the right call when the brand is ready to scale demand and the current setup is a stack of disconnected vendors. We run it as one program with one accountable team, so the strategy in paid, PR, email, and owned media reinforces itself instead of competing for credit.",
    processSteps: [
      {
        title: "Audience & funnel",
        copy: "Who actually buys at this end of the market, what the path to purchase looks like, and where the current funnel breaks. Specific to the category, not generic best practices.",
      },
      {
        title: "Channel system",
        copy: "Paid, PR, email, and owned media designed as one connected engine. Each channel knows what the others are doing and the work compounds.",
      },
      {
        title: "Launch & operate",
        copy: "We run the program, optimize live, and adjust against what the data shows. Real ownership of the outcome, not a monthly report that lobs back to a client meeting.",
      },
      {
        title: "Compound",
        copy: "Premium growth is a quarter-over-quarter game. Audience compounds, owned media compounds, retention compounds. We build for that math, not the campaign-burst math.",
      },
    ],
  },
  {
    slug: "experiences",
    name: "Experiences",
    tagline: "Moments that become marketing.",
    description:
      "Strategy, production, and on-site activation for premium brand experiences — from boat shows to property launches to private client gatherings. We plan it, market it, capture it, and amplify it.",
    capabilities: [
      "Event strategy & production",
      "Pre-event marketing",
      "On-site capture & live publishing",
      "Trade show & exhibitor support",
      "Member and client gathering production",
      "Post-event content & recaps",
    ],
    href: "/services/experiences",
    intro:
      "Experiences are the brand work that happens off-screen. Openings, launches, boat shows, concours, member dinners, and the activations that turn a brand moment into a year of content. We treat events as both the marketing and the source material. The way we run them is as much about the content that ships after as the night itself.",
    sampleDeliverables: [
      "Grand-opening event for a property or restaurant",
      "Branded activation at a major industry show (boat, concours, design week)",
      "Multi-stop private client tour or trunk show",
      "Member dinner and gathering production",
      "On-site capture and same-week edit packages",
      "Post-event content programs that extend the brand moment",
    ],
    bestForCopy:
      "Experiences is the right call when the moment matters enough to do properly. If the brand is opening a flagship property, launching a new model, or building a category-defining client gathering, this is the team. We don't do bare-minimum activations. We do moments worth capturing.",
    processSteps: [
      {
        title: "Concept & brief",
        copy: "What the moment needs to do for the brand, who it's for, and what the experience has to feel like. Built around the audience, not the venue.",
      },
      {
        title: "Production",
        copy: "Logistics, vendors, talent, build, run-of-show. We handle the experience itself, not just the marketing around it.",
      },
      {
        title: "Live capture",
        copy: "Our studio team on-site capturing as the event runs, so the brand has hero assets from the moment it ends. No waiting on a third-party recap reel.",
      },
      {
        title: "Amplify",
        copy: "The event ships as months of content across paid, social, owned media, and PR. The night was the source, the content is the compounding return.",
      },
    ],
  },
  {
    slug: "intelligence",
    name: "Intelligence",
    tagline: "Tech-company leverage for premium brands.",
    description:
      "Custom AI and workflow automation engineered for marketing operations, sales pipelines, and client deliverables. Built by an agency that ships its own software — not one that just talks about AI.",
    capabilities: [
      "Marketing & sales automation",
      "Custom AI agents & workflows",
      "CRM integration & lead routing",
      "Chatbots & conversational systems",
      "Internal tools & dashboards",
      "Data pipelines & reporting infrastructure",
    ],
    href: "/services/intelligence",
    intro:
      "Intelligence is the systems work that makes everything else move faster. Custom AI agents for content briefing and operations, workflow automation for marketing and sales, integration work that ties the tools a brand already uses into one running pipeline. We build for our own studio, then extend the same capability to clients. It's the rare agency offering where the operator is also the customer.",
    sampleDeliverables: [
      "Custom AI agent for brand-aligned content briefing",
      "Lead routing and qualification workflow across HubSpot, Salesforce, or custom CRM",
      "Marketing operations automation across email, paid, and reporting tools",
      "Conversational chatbot trained on the brand's product, voice, and FAQ library",
      "Internal dashboard surfacing campaign and sales metrics from disparate sources",
      "Data pipeline and reporting infrastructure for ongoing program work",
    ],
    bestForCopy:
      "Intelligence is the right call when the marketing operation has outgrown spreadsheets and the existing tech stack is held together with manual handoffs. If the same data is being copy-pasted across three tools, if leads are falling through a routing crack, if the team is briefing content in Slack and losing context, this is what we build.",
    processSteps: [
      {
        title: "Map & audit",
        copy: "Every tool, every data source, every manual handoff. We map the actual operation as it runs today, not the diagram on the org chart.",
      },
      {
        title: "Design",
        copy: "What the future-state workflow looks like, what gets automated, what stays human, and which AI components actually move the needle.",
      },
      {
        title: "Build",
        copy: "Custom integrations, agents, and tools. We build with the same standard our studio applies to creative: shipped, documented, and accountable.",
      },
      {
        title: "Operate",
        copy: "Once the system is live, we run it alongside the brand's team. Monitoring, iteration, and the ongoing work that keeps an automation system actually working.",
      },
    ],
  },
];

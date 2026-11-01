export type CaseStudyProject = {
  slug: string;
  code: string;
  title: string;
  category: string;
  summary: string;
  cover: string;
  screenshot: string;
  liveUrl: string;
  facts: [string, string][];
  overviewHeadline: string;
  overviewBody: string;
  statement: string;
  problemHeadline: string;
  problemBody: string;
  problems: { title: string; body: string }[];
  approachHeadline: string;
  approachBody: string;
  approachSteps: string[];
  solutionHeadline: string;
  solutionBody: string;
  features: { title: string; body: string }[];
  outcomeHeadline: string;
  outcomeBody: [string, string];
};

export const caseStudies: CaseStudyProject[] = [
  {
    slug: "credit-guard",
    code: "PRJ—01",
    title: "Credit Guard",
    category: "AI credit intelligence",
    summary:
      "An explainable credit-risk platform that turns machine-learning predictions into decisions people can inspect.",
    cover: "/images/projects/covers/Credit-Guard.jpeg",
    screenshot: "/images/projects/creditGuard.png",
    liveUrl: "https://credit.qurne.com",
    facts: [
      ["Type", "Decision-support platform"],
      ["Role", "Full-stack & machine learning"],
      ["Focus", "Credit risk · explainability · UX"],
      ["Status", "Live product"],
    ],
    overviewHeadline: "A risk score is only useful when someone can understand why it exists.",
    overviewBody:
      "Credit Guard combines credit-risk modeling with a clear web experience. Instead of presenting a prediction as a black box, it exposes the contributing signals so the result can support a more informed review.",
    statement:
      "Credit Guard translates model output into a transparent decision-support experience built for inspection, not blind acceptance.",
    problemHeadline: "The hardest part was not predicting risk. It was making the prediction accountable.",
    problemBody:
      "Financial models can produce confident outputs while remaining difficult to interpret. That creates friction for anyone who needs to review, explain, or challenge the result.",
    problems: [
      {
        title: "Black-box output",
        body: "A probability without reasoning gives reviewers little context for understanding what pushed an application toward risk.",
      },
      {
        title: "Model selection",
        body: "Multiple candidate models, thresholds, and validation strategies had to be compared without optimizing for one misleading metric.",
      },
      {
        title: "Technical distance",
        body: "Feature importance and model confidence needed to become approachable information instead of remaining machine-learning terminology.",
      },
    ],
    approachHeadline: "Treat explainability as part of the product, not an appendix to the model.",
    approachBody:
      "The work connected model evaluation, threshold selection, SHAP explanations, and interface hierarchy into one flow. Every technical output had to answer a practical user question.",
    approachSteps: [
      "Compare candidate models",
      "Validate with stratified folds",
      "Tune threshold and parameters",
      "Translate SHAP signals into UI",
    ],
    solutionHeadline: "Prediction, explanation, and review in one continuous flow.",
    solutionBody:
      "Users can provide an applicant profile, receive a risk analysis, and inspect which factors contributed to the result. The interface keeps the model visible without overwhelming the decision-maker.",
    features: [
      { title: "Risk prediction", body: "A focused input flow produces a structured probability of payment default." },
      { title: "SHAP explanations", body: "Contributing features are surfaced so the reasoning behind a result can be examined." },
      { title: "Model comparison", body: "Candidate models are evaluated through a repeatable validation and tuning process." },
      { title: "Decision-oriented UI", body: "Technical signals are translated into a hierarchy that supports faster review." },
      { title: "Transparent language", body: "The experience distinguishes prediction from certainty and avoids presenting the model as a final authority." },
      { title: "End-to-end delivery", body: "Model behavior, API integration, and the frontend were shaped as one product system." },
    ],
    outcomeHeadline: "A machine-learning project that explains its reasoning before asking to be trusted.",
    outcomeBody: [
      "Credit Guard demonstrates how model evaluation and product design can reinforce each other. Accuracy matters, but the ability to inspect the result is part of the system's usefulness.",
      "The final platform turns a technical prediction pipeline into a clearer conversation about risk, evidence, and human judgment.",
    ],
  },
  {
    slug: "holy-bin",
    code: "PRJ—03",
    title: "HolyBin",
    category: "Connected waste system",
    summary:
      "An IoT-assisted waste workflow for material detection, verified collection, and realtime operational tracking.",
    cover: "/images/projects/covers/HolyBin.jpeg",
    screenshot: "/images/projects/holybin.png",
    liveUrl: "https://holybin.qurne.com",
    facts: [
      ["Type", "IoT & operational platform"],
      ["Role", "Software engineering team"],
      ["Focus", "Detection · validation · tracking"],
      ["Status", "Working prototype"],
    ],
    overviewHeadline: "Smart waste collection needs more than a sensor. It needs a traceable workflow.",
    overviewBody:
      "HolyBin connects material recognition with the people responsible for collection. The system distinguishes plastic from non-plastic waste, then records collection activity through a web-based operational flow.",
    statement:
      "HolyBin connects physical waste detection with verified pickup activity so the operation can be observed from disposal to collection.",
    problemHeadline: "Detection alone could not solve the operational gap after waste entered the bin.",
    problemBody:
      "A smart bin can classify material, but the process still becomes invisible when there is no reliable way to verify collectors, record pickups, and monitor activity over time.",
    problems: [
      {
        title: "Material ambiguity",
        body: "The physical system needed to make a useful distinction between plastic and non-plastic material at the point of disposal.",
      },
      {
        title: "Unverified pickup",
        body: "Collection activity required a simple identity mechanism so each pickup could be associated with the responsible person.",
      },
      {
        title: "Missing history",
        body: "Without a shared operational record, administrators could not easily monitor recent activity or investigate what happened earlier.",
      },
    ],
    approachHeadline: "Design the physical event and the digital record as one connected system.",
    approachBody:
      "The team treated detection, collector validation, and administration as a single lifecycle. Sensor events had to become readable operational state inside the web application.",
    approachSteps: [
      "Define the disposal lifecycle",
      "Connect sensor classification",
      "Issue unique pickup codes",
      "Expose realtime admin history",
    ],
    solutionHeadline: "A connected loop from material detection to confirmed collection.",
    solutionBody:
      "HolyBin pairs the IoT prototype with two human-facing experiences: a lightweight validation flow for collectors and an administrative dashboard for live monitoring and historical review.",
    features: [
      { title: "Material detection", body: "Sensors support automatic classification between plastic and non-plastic waste." },
      { title: "Unique pickup code", body: "Collectors validate an assignment through a code-based attendance and pickup flow." },
      { title: "Realtime dashboard", body: "Administrators can monitor collection activity as operational state changes." },
      { title: "Collection history", body: "Completed activity is retained so the process remains traceable after pickup." },
      { title: "Role-based access", body: "Collector and administrator experiences expose only the actions each role needs." },
      { title: "IoT-to-web bridge", body: "Physical signals and web interactions share one coherent operational model." },
    ],
    outcomeHeadline: "A software-and-hardware prototype that makes waste collection easier to verify and follow.",
    outcomeBody: [
      "HolyBin became a practical exercise in coordinating sensor behavior, realtime data, interface state, and human responsibilities.",
      "The result shows that a connected product becomes useful when the physical event and the operational record tell the same story.",
    ],
  },
  {
    slug: "tox21",
    code: "PRJ—04",
    title: "Tox21",
    category: "Predictive toxicology",
    summary:
      "A molecular-toxicity exploration tool built around graph neural networks, SMILES input, and twelve prediction endpoints.",
    cover: "/images/projects/covers/Tox21.jpeg",
    screenshot: "/images/projects/tox21.png",
    liveUrl: "https://tox21.qurne.com",
    facts: [
      ["Type", "Machine-learning study"],
      ["Role", "ML & product engineering"],
      ["Focus", "Molecules · GNN · visualization"],
      ["Status", "Experimental product"],
    ],
    overviewHeadline: "Molecular toxicity is complex. Exploring a prediction should not be.",
    overviewBody:
      "Tox21 provides an approachable interface for investigating in-silico toxicity predictions. Users can enter SMILES notation, work with a molecule library, or submit a batch for analysis across twelve endpoints.",
    statement:
      "Tox21 turns graph-neural-network output into an exploratory interface for comparing molecules, endpoints, and toxicity signals.",
    problemHeadline: "The model speaks in graphs and endpoints. The user needs an understandable molecular result.",
    problemBody:
      "Toxicity prediction involves specialized representations, imbalanced labels, multiple endpoints, and uncertainty. A useful interface has to preserve those constraints without becoming inaccessible.",
    problems: [
      {
        title: "Graph representation",
        body: "Molecular structure encoded through SMILES must be transformed into graph data that a GCN or GAT model can process.",
      },
      {
        title: "Multiple endpoints",
        body: "One molecule may produce different signals across twelve toxicity targets, making a single binary label insufficient." ,
      },
      {
        title: "Scientific context",
        body: "Predictions need clear limits: the result is an in-silico aid, not a substitute for laboratory validation." ,
      },
    ],
    approachHeadline: "Build an exploration layer around the model instead of exposing a bare prediction endpoint.",
    approachBody:
      "The workflow was shaped around how someone investigates a molecule: provide or select a structure, run prediction, compare endpoint signals, and retain enough context to interpret the result responsibly.",
    approachSteps: [
      "Parse SMILES structures",
      "Build molecular graph features",
      "Predict twelve endpoints",
      "Present uncertainty and context",
    ],
    solutionHeadline: "One interface for single molecules, batch analysis, and endpoint comparison.",
    solutionBody:
      "The product joins a DeepChem prediction pipeline with a restrained Next.js interface. It supports direct SMILES input, categorized molecule discovery, comparison, and batch CSV workflows.",
    features: [
      { title: "SMILES input", body: "Users can submit a molecular representation directly for toxicity analysis." },
      { title: "Twelve endpoints", body: "The result preserves the multi-target nature of the Tox21 dataset." },
      { title: "Molecule library", body: "Example compounds can be filtered by categories such as drugs, hormones, solvents, and pesticides." },
      { title: "Batch CSV", body: "Multiple compounds can be prepared for a broader analysis workflow." },
      { title: "Molecule comparison", body: "Results can be evaluated side by side instead of in isolated screens." },
      { title: "Responsible framing", body: "The interface clearly positions output as an in-silico prediction requiring further validation." },
    ],
    outcomeHeadline: "A specialized ML pipeline turned into a product people can explore without hiding its limits.",
    outcomeBody: [
      "Tox21 brought graph-based modeling, chemical representations, API behavior, and product interface decisions into one focused experiment.",
      "The outcome is not a laboratory verdict. It is a clearer way to inspect predicted toxicity signals and understand where deeper investigation should begin.",
    ],
  },
  {
    slug: "technoscape",
    code: "PRJ—05",
    title: "Technoscape",
    category: "Competition platform",
    summary:
      "A high-traffic event platform for seminars, workshops, and Hackathon 9.0, shaped around reliability and a clear participant journey.",
    cover: "/images/projects/covers/technoscape.png",
    screenshot: "/images/projects/technoscape.png",
    liveUrl: "https://technoscape.id",
    facts: [
      ["Type", "Event & registration platform"],
      ["Role", "Project management & architecture"],
      ["Focus", "Reliability · access · delivery"],
      ["Status", "Released platform"],
    ],
    overviewHeadline: "An event platform has to remain calm when the audience arrives all at once.",
    overviewBody:
      "Technoscape supports the participant journey across seminars, workshops, and Hackathon 9.0. The work balanced visual identity with registration flows, authenticated access, backend protection, and coordinated delivery across teams.",
    statement:
      "Technoscape turns a multi-program event into one resilient digital journey from discovery and registration to participant access.",
    problemHeadline: "The experience had to feel immediate while the architecture prepared for concentrated traffic.",
    problemBody:
      "Event launches create uneven load, strict timelines, and many dependencies between design, frontend, backend, and operations. A failure at one boundary affects the entire participant journey.",
    problems: [
      {
        title: "Traffic bursts",
        body: "Registration and announcement moments can send many users into the same flow within a short window." ,
      },
      {
        title: "Cross-team delivery",
        body: "Frontend, backend, visual direction, event operations, and stakeholder decisions had to remain synchronized." ,
      },
      {
        title: "Protected access",
        body: "Authentication and sensitive operations required defensive boundaries without slowing the participant experience." ,
      },
    ],
    approachHeadline: "Treat the participant journey and the delivery process as two sides of the same system.",
    approachBody:
      "Architecture decisions were made alongside scope, timeline, and team coordination. The goal was to reduce ambiguity early and protect the paths that mattered most during peak moments.",
    approachSteps: [
      "Map critical participant flows",
      "Align frontend and backend contracts",
      "Add rate-limiting boundaries",
      "Coordinate staged delivery",
    ],
    solutionHeadline: "A unified event experience backed by clearer technical boundaries.",
    solutionBody:
      "The platform brings program discovery, registration, identity, and participant access into one visual system while architecture and rate limiting protect high-value backend operations.",
    features: [
      { title: "Program discovery", body: "Seminar, workshop, and hackathon information share one coherent navigation model." },
      { title: "Registration journey", body: "Critical participant actions are kept direct and easy to understand." },
      { title: "Authenticated access", body: "Participant identity and protected workflows are handled through explicit access boundaries." },
      { title: "Rate limiting", body: "Sensitive and high-volume operations receive additional protection against abusive traffic." },
      { title: "Responsive interface", body: "The event identity remains recognizable across desktop and mobile experiences." },
      { title: "Delivery coordination", body: "Product management connected scope, architecture, ownership, and release timing across the team." },
    ],
    outcomeHeadline: "A public event platform built to carry both a strong identity and real operational pressure.",
    outcomeBody: [
      "Technoscape became an exercise in technical leadership as much as implementation: aligning people, interfaces, backend contracts, and risk around one launch.",
      "The finished platform gives participants a clear path through the event while the underlying system is prepared for the moments when attention concentrates.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

export type ProjectLink = {
  code: string;
  title: string;
  category: string;
  cover: string;
  href: string;
};

const hiveLink: ProjectLink = {
  code: "PRJ—02",
  title: "Hive",
  category: "Collaborative workspace",
  cover: "/images/projects/covers/Hive.jpeg",
  href: "/work/hive",
};

const projectSequence: ProjectLink[] = [
  ...caseStudies.map(({ code, title, category, cover, slug }) => ({
    code,
    title,
    category,
    cover,
    href: `/work/${slug}`,
  })),
  hiveLink,
].sort((a, b) => a.code.localeCompare(b.code));

export function getNextProject(slug: string) {
  const index = projectSequence.findIndex((project) => project.href === `/work/${slug}`);
  return projectSequence[(index + 1) % projectSequence.length];
}

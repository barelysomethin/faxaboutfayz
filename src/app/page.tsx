"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./page.module.css";

// SVG Icons
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12h-14" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className={styles.itemLinkSvg} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const PLACEHOLDERS = [
  "eg. i have a [company name], how fayz can help me as a [role]?",
  "eg. what is fayz's experience with RAG and LLM systems?",
  "eg. tell me about fayz's open source contributions on neutralinojs.",
  "eg. how can fayz optimize database cost or slow APIs?",
];

const generateMockResponse = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes("backend") || q.includes("company") || q.includes("startup") || q.includes("help") || q.includes("hire") || q.includes("developer")) {
    return `🤖 **AI Assistant**: Fayz can help your organization as a **Backend Engineer** by developing highly optimized, production-ready systems. He specializes in **Node.js (TypeScript/JavaScript)**, **Python**, and microservices. He has a track record of building resilient pipelines (like **VectorFlow**, which handles multi-stage chunking and upserts to Pinecone with retry/backoff queue systems) and integrating efficient performance layers (like **Semantic Caching with Redis**, cutting API latency by >95% and database cost by 40%). He is ready to bring efficiency and scale to your backend codebase.`;
  }

  if (q.includes("rag") || q.includes("llm") || q.includes("ai") || q.includes("vector") || q.includes("pinecone")) {
    return `🤖 **AI Assistant**: Fayz has strong experience in building **AI-native apps**. His project **VectorFlow** is an Enterprise RAG & Observability Pipeline built with **LangChain.js** and **Pinecone**. He has solved major RAG challenges including: designing recursive text-splitting chunking strategies with custom metadata extraction, building resilient ingestion queues that handle API rate-limits, and implementing high-speed **Semantic Caching** using Redis vector search to save LLM API costs.`;
  }

  if (q.includes("project") || q.includes("jobllama") || q.includes("hist-mist") || q.includes("vectorflow")) {
    return `🤖 **AI Assistant**: Fayz has built several notable projects: 
1. **VectorFlow**: An Enterprise RAG Pipeline using TypeScript, LangChain.js, Pinecone, and Redis.
2. **Jobllama**: A curated job board for new grads and interns, built with React, Node.js, and automated scraping of private APIs.
3. **Hist-Mist**: A social discovery site for historical mystery readers, featuring real-time chatrooms via Socket.io.
Select the **Projects** tab below to see full details and bullet points for each!`;
  }

  if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("freelance")) {
    return `🤖 **AI Assistant**: Fayz's experience includes working as a **Freelance Web Developer**, where he architected and deployed full-stack marketplace applications, and contributing to significant **Open Source projects** like **Neutralinojs** (improving frontend UX) and **Dyalog APL** (enhancing web-client capabilities). Select the **Experience** tab below to explore his full background.`;
  }

  // Default response
  return `🤖 **AI Assistant**: Thanks for asking about Fayz! Currently, this search bar is a simulated frontend component. Soon, Fayz will connect it to a full **Retrieval-Augmented Generation (RAG)** backend trained on his personal documentation. For now, you can explore the tabs below (About, Projects, Experience, and Writings) to learn more about his background in Node.js, React, AI engineering, and systems optimization!`;
};

// Types
type TabType = "about" | "projects" | "experience" | "writings";

interface Project {
  title: string;
  link?: string;
  sub: string;
  bulletPoints: string[];
}

interface Experience {
  title: string;
  location: string;
  faviconDomain?: string;
  faviconFallbackText?: string;
  bulletPoints: string[];
}

interface Essay {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

const TABS: TabType[] = ["about", "projects", "experience", "writings"];

const SKILLS = [
  "Python",
  "TypeScript",
  "Node.js",
  "React",
  "Angular",
  "AWS",
  "Docker",
  "Kubernetes"
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [expandedEssayId, setExpandedEssayId] = useState<string | null>(null);

  // AI Search Bar States
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [currentPlaceholderIdx, setCurrentPlaceholderIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");

  const [age, setAge] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Sync scroll of the input bar to the right while typing the suggestion
  useEffect(() => {
    if (!isFocused && !searchQuery && inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [placeholderText, isFocused, searchQuery]);

  // Live Age Counter Effect
  useEffect(() => {
    const birthTime = new Date("2004-12-20T00:00:00").getTime();
    const msPerYear = 31556926000; // 365.2422 days

    const updateAge = () => {
      setAge((Date.now() - birthTime) / msPerYear);
    };

    updateAge();
    const interval = setInterval(updateAge, 50);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for placeholder suggestions
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    const currentFullText = PLACEHOLDERS[currentPlaceholderIdx];

    const handleType = () => {
      setPlaceholderText((prev) => {
        if (!isDeleting) {
          if (prev.length < currentFullText.length) {
            return currentFullText.substring(0, prev.length + 1);
          } else {
            timer = setTimeout(() => setIsDeleting(true), 3000);
            return prev;
          }
        } else {
          if (prev.length > 0) {
            return currentFullText.substring(0, prev.length - 1);
          } else {
            setIsDeleting(false);
            setCurrentPlaceholderIdx((prevIdx) => (prevIdx + 1) % PLACEHOLDERS.length);
            return "";
          }
        }
      });
    };

    const typingSpeed = isDeleting ? 15 : 35;
    if (!timer) {
      timer = setTimeout(handleType, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [placeholderText, currentPlaceholderIdx, isDeleting]);

  // Simulated AI response typewriter stream effect
  useEffect(() => {
    if (!aiResponse) {
      setDisplayedResponse("");
      return;
    }

    setDisplayedResponse("");
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < aiResponse.length) {
        setDisplayedResponse(aiResponse.substring(0, currentIdx + 4));
        currentIdx += 4;
      } else {
        setDisplayedResponse(aiResponse);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [aiResponse]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isLoading) return;

    setIsLoading(true);
    setAiResponse("");
    setDisplayedResponse("");

    // Simulate RAG database query delay
    setTimeout(() => {
      const response = generateMockResponse(searchQuery);
      setAiResponse(response);
      setIsLoading(false);
    }, 1200);
  };


  // Keyboard navigation
  const handleTabChange = useCallback((direction: "next" | "prev") => {
    setActiveTab((prev) => {
      const index = TABS.indexOf(prev);
      if (direction === "next") {
        return index < TABS.length - 1 ? TABS[index + 1] : TABS[0];
      } else {
        return index > 0 ? TABS[index - 1] : TABS[TABS.length - 1];
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleTabChange("next");
      } else if (e.key === "ArrowLeft") {
        handleTabChange("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleTabChange]);

  // Swipe navigation for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      // Exclude interactions inside inputs, textareas, links, buttons, or the search section
      if (target && (
        target.closest("input") || 
        target.closest("textarea") || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(`.${styles.searchSection}`)
      )) {
        return;
      }
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      
      // Horizontal swipe must be dominant and exceed minimum distance threshold
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
        if (diffX < 0) {
          handleTabChange("next");
        } else {
          handleTabChange("prev");
        }
      }
      
      // Reset variables
      touchStartX = 0;
      touchStartY = 0;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTabChange]);

  // Data Sourced from fayzdoesthings.vercel.app
  const projects: Project[] = [
    {
      title: "VectorFlow",
      sub: "Enterprise RAG & Observability Pipeline",
      bulletPoints: [
        "Developed a production-ready Retrieval-Augmented Generation pipeline using TypeScript and LangChain.js for automated knowledge retrieval.",
        "Engineered a multi-stage ingestion worker that handles document chunking, metadata extraction, and upserting to Pinecone with retry logic.",
        "Implemented a Semantic Cache using Redis to reduce LLM API costs by serving cached responses for similar user queries."
      ]
    },
    {
      title: "Jobllama",
      link: "https://job-llama.vercel.app/",
      sub: "a curated job board for newgrads and interns (used by 100s of job hunters)",
      bulletPoints: [
        "Built using React.js and Node.js. CI/CD using Vercel and cronjobs using Vercel cron.",
        "Scrapes job listings from sites by reverse engineering their API calls."
      ]
    },
    {
      title: "Hist-Mist",
      link: "https://historical-mysteries.vercel.app/",
      sub: "A social site for history readers.",
      bulletPoints: [
        "Created a discovery platform for historical mysteries using React.js and Node.js.",
        "Implemented real-time community interaction via Socket.io for chatrooms."
      ]
    }
  ];

  const experiences: Experience[] = [
    {
      title: "Freelance Web Developer",
      location: "India | Remote",
      faviconFallbackText: "FW",
      bulletPoints: [
        "Designed and deployed a full-stack marketplace platform built with scalability in mind.",
        "Architected the system to support thousands of concurrent users with high availability.",
        "Managed the end-to-end lifecycle: design, development, cloud deployment, and maintenance.",
        "Tech Stack included Node.JS (TypeScript), React.js, Git and Vercel CI/CD."
      ]
    },
    {
      title: "Open Source Contributions",
      location: "Remote",
      faviconFallbackText: "OS",
      bulletPoints: [
        "Neutralinojs: Improved frontend UX by refactoring UI components and fixing responsive design.",
        "Dyalog APL: Contributing to the ewc-client project, enhancing web-client capabilities."
      ]
    }
  ];

  const essays: Essay[] = [
    {
      id: "rag",
      title: "Scaling Retrieval-Augmented Generation (RAG) for the Enterprise",
      date: "Feb 2026",
      category: "AI Engineering",
      excerpt: "Building high-performance RAG pipelines requires going beyond basic vector search. Exploring chunking strategies, metadata ingestion, and hybrid search.",
      content: `Enterprise Retrieval-Augmented Generation (RAG) demands more than just loading a file and querying an embedding database. When designing **VectorFlow**, my core focus was creating a resilient ingestion pipeline that could ingest, chunk, and index thousands of documents at scale.

First, **chunking strategy is everything**. A naive character-split loses semantic context. We implemented recursive text splitting with a 500-character window and 50-character overlap, augmented by custom metadata injection (document hierarchy, headers, and section tags). This metadata is crucial for downstream filtering.

Second, **write resilience**. Databases like Pinecone can fail or rate-limit during bulk updates. We engineered a multi-stage ingestion worker in TypeScript that batches uploads, implements exponential backoff retry logic, and maintains state via a transactional queue.

Finally, **hybrid search**. Pure semantic search struggles with exact keywords, codes, or SKU numbers. Combining dense vector search with sparse keyword search (BM25) and re-ranking the results using a cross-encoder model yielded a 35% improvement in retrieval accuracy.`
    },
    {
      id: "cache",
      title: "Reducing LLM Costs with Semantic Caching",
      date: "Jan 2026",
      category: "Systems & Optimization",
      excerpt: "Serving cached responses for semantically equivalent queries using Redis and embeddings. Reducing latency to <100ms and LLM API costs by up to 40%.",
      content: `In production AI apps, LLM API calls are the largest bottleneck—both in terms of execution latency (often 2-5 seconds) and cost. To optimize **VectorFlow**, I implemented a **Semantic Cache** layer in Redis.

Unlike traditional key-value caches that look for exact string matches, a semantic cache checks the *meaning* of the input query. When a user sends a query, we generate its vector representation using a fast, local embedding model. We then perform a cosine similarity search against previously cached query vectors in Redis (using RedisVL or RediSearch).

If the similarity score exceeds a threshold (e.g., \`0.92\`), we serve the cached answer immediately. This cuts response times from 3000ms down to **under 80ms** and bypasses the LLM call entirely.

To ensure data freshness, we set a Time-To-Live (TTL) on cache entries and implemented an active invalidation engine that evicts cached responses if the underlying knowledge base changes.`
    },
    {
      id: "scrape",
      title: "Reverse Engineering Private APIs for Scraping",
      date: "Nov 2025",
      category: "Data Engineering",
      excerpt: "How I built Jobllama's core ingestion engine by bypassing frontend blockers and scraping job listings directly from backend network calls.",
      content: `When building **Jobllama**, a curated job board for new grads and interns, the main challenge was gathering high-quality, up-to-date postings without relying on messy HTML scraping, which breaks constantly when websites redesign.

The solution? **Reverse engineering internal API calls**. By inspecting browser network traffic while navigating job portals, we can locate the exact JSON endpoints the client app uses to load data. 

These private APIs are cleaner, structured, and return pure JSON. However, scraping them directly requires replicating the exact headers, user agents, and authorization tokens. We built a scraper that automatically fetches session cookies, handles CSRF tokens, and mimics genuine browser traffic.

We automated this ingestion pipeline using **Vercel Cron Jobs**. Every 12 hours, the scraper runs, structures the job listings, checks for duplicates, and upserts them to the database. This approach reduced our maintenance overhead to virtually zero.`
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <div>
            <div className={styles.titleWithCounter}>
              <h1 className={`${styles.titleName} pixel-font`}>F a y z</h1>
              {age > 0 && (
                <span className={styles.ageCounter}>
                  i am {age.toFixed(15)} yrs old.
                </span>
              )}
            </div>
            <p className={styles.titleSubtitle}>cs student &amp; software engineer</p>
          </div>
          <div className={styles.avatar}>
            <img src="/profile.jpg" alt="Fayz" className={styles.avatarImg} />
          </div>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchLabel}>
            <span className={styles.aiBadgeGlow} />
            ask ai about fayz
          </div>
          <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={isFocused ? searchQuery : (searchQuery || placeholderText)}
              onChange={(e) => {
                if (isFocused) {
                  setSearchQuery(e.target.value);
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`${styles.searchInput} ${(!isFocused && !searchQuery) ? styles.searchInputSuggestion : ""}`}
            />
            <span className={styles.shortcutBadge}>↵</span>
          </form>

          {(isLoading || aiResponse) && (
            <div className={styles.aiResponseArea}>
              <div className={styles.aiResponseHeader}>
                <div className={styles.aiResponseTitle}>
                  <span>✦</span> AI Response
                </div>
                {isLoading && <span>Querying knowledge base...</span>}
              </div>
              <div className={styles.aiResponseContent}>
                {isLoading ? (
                  <div className={styles.typingIndicator}>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                  </div>
                ) : (
                  <div>
                    {displayedResponse.split("\n").map((line, idx) => {
                      return (
                        <p key={idx} style={{ marginBottom: "0.5rem" }}>
                          {line.split(/(\*\*[^*]+\*\*)/g).map((part, partIdx) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.socialList}>
          <a
            href="https://github.com/barelysomethin"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/fayz-719383394"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="mailto:barelyfayz@gmail.com"
            className={styles.socialLink}
            aria-label="Email"
          >
            <MailIcon />
          </a>
        </div>
      </header>

      {/* Interactive Tabs */}
      <nav className={styles.navTabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} pixel-font ${activeTab === tab ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <span className={styles.navHint}>
          <ArrowLeftIcon /> <ArrowRightIcon /> navigate
        </span>
      </nav>

      {/* Tab Content */}
      <main>
        {activeTab === "about" && (
          <div className={`${styles.tabContent} ${styles.aboutPromptList}`}>
            <div className={styles.aboutPromptItem}>
              <span className={styles.promptSymbol}>&gt;</span>
              <p className={styles.promptContent}>Hi, I'm Fayz.</p>
            </div>
            <div className={styles.aboutPromptItem}>
              <span className={styles.promptSymbol}>&gt;</span>
              <p className={styles.promptContent}>A cs new grad and fullstack engineer.</p>
            </div>
            <div className={styles.aboutPromptItem}>
              <span className={styles.promptSymbol}>&gt;</span>
              <p className={styles.promptContent}>making humanity dumber by reducing friction.</p>
            </div>
            <div className={styles.aboutPromptItem}>
              <span className={styles.promptSymbol}>&gt;</span>
              <p className={styles.promptContent}>writing production AI apps end to end.</p>
            </div>
            <div className={styles.aboutPromptItem}>
              <span className={styles.promptSymbol}>&gt;</span>
              <p className={styles.promptContent}>
                currently using{' '}
                {SKILLS.map((skill, index) => (
                  <span key={skill}>
                    <span className={styles.highlightText}>{skill}</span>
                    {index < SKILLS.length - 1 ? ", " : ""}
                  </span>
                ))}
                .
              </p>
            </div>
            <div className={styles.aboutPromptItem}>
              <span className={styles.promptSymbol}>&gt;</span>
              <p className={styles.promptContent}>learning design, growth and AI engineering.</p>
            </div>
            <div className={styles.aboutPromptItem}>
              <span className={styles.promptSymbol}>&gt;</span>
              <p className={styles.promptContent}>reading philosophy, history, and sci-fi in my free time.</p>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className={`${styles.tabContent} ${styles.listContainer}`}>
            {projects.map((proj, idx) => (
              <div key={idx} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <div>
                    {proj.link ? (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className={styles.itemLink}>
                        <h3 className={styles.itemTitle}>{proj.title}</h3>
                        <ExternalLinkIcon />
                      </a>
                    ) : (
                      <h3 className={styles.itemTitle}>{proj.title}</h3>
                    )}
                    <span className={styles.itemSub}>{proj.sub}</span>
                  </div>
                </div>
                <ul className={styles.itemDescList}>
                  {proj.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className={styles.itemDescBullet}>
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "experience" && (
          <div className={`${styles.tabContent} ${styles.listContainer}`}>
            {experiences.map((exp, idx) => (
              <div key={idx} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <div className={styles.itemTitleArea}>
                    <div className={styles.itemFavicon}>
                      <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: "bold" }}>
                        {exp.faviconFallbackText}
                      </span>
                    </div>
                    <div>
                      <h3 className={styles.itemTitle}>{exp.title}</h3>
                      <span className={styles.itemSub}>{exp.location}</span>
                    </div>
                  </div>
                </div>
                <ul className={styles.itemDescList}>
                  {exp.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className={styles.itemDescBullet}>
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "writings" && (
          <div className={`${styles.tabContent} ${styles.listContainer}`}>
            {essays.map((essay) => (
              <article
                key={essay.id}
                className={styles.essayCard}
                onClick={() => setExpandedEssayId(expandedEssayId === essay.id ? null : essay.id)}
              >
                <div className={styles.essayHeader}>
                  <h3 className={styles.essayTitle}>{essay.title}</h3>
                </div>
                <div className={styles.essayMeta}>
                  <span>{essay.date}</span>
                  <span>•</span>
                  <span>{essay.category}</span>
                </div>
                <p className={styles.essayExcerpt}>{essay.excerpt}</p>

                <div className={styles.essayExpandIndicator}>
                  {expandedEssayId === essay.id ? "Close Essay ▲" : "Read Essay ▼"}
                </div>

                {expandedEssayId === essay.id && (
                  <div
                    className={styles.essayExpandedContent}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                  >
                    {essay.content.split("\n\n").map((para, pIdx) => {
                      if (para.startsWith(">")) {
                        return <blockquote key={pIdx}>{para.replace(">", "").trim()}</blockquote>;
                      }

                      // Highlight inline code
                      const parts = para.split(/(`[^`]+`)/g);
                      return (
                        <p key={pIdx}>
                          {parts.map((part, partIdx) => {
                            if (part.startsWith("`") && part.endsWith("`")) {
                              return <code key={partIdx}>{part.slice(1, -1)}</code>;
                            }
                            // Highlight bold
                            const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
                            return boldParts.map((bp, bpIdx) => {
                              if (bp.startsWith("**") && bp.endsWith("**")) {
                                return <strong key={bpIdx} style={{ color: "var(--text-primary)" }}>{bp.slice(2, -2)}</strong>;
                              }
                              return bp;
                            });
                          })}
                        </p>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <span>&copy; {new Date().getFullYear()} Fayz</span>
      </footer>
    </div>
  );
}

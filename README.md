# IOPIA --- Learn Smarter. Understand Deeper. Improve Continuously.

**An AI-powered adaptive learning platform that turns learning gaps into
the next learning opportunity.**

IOPIA is designed to combine AI-generated lessons, interactive visual
explanations, contextual tutoring, and concept-level assessment. Its
central idea is simple:

> **Your mistakes become the blueprint for your next lesson.**

## The Problem

Traditional digital learning often gives learners the same videos,
notes, and assessments regardless of their prior knowledge or individual
difficulties.

-   Complex concepts can be difficult to understand through text alone.
-   Learning paths are often generic rather than personalized.
-   Learners need explanations that respond to their specific doubts.
-   Quiz mistakes do not always lead to targeted practice.

IOPIA aims to connect learning content, assessment, and remediation in
one continuous cycle.

## How IOPIA Works

**Explore → Understand → Assess → Adapt → Improve**

1.  **Choose a topic:** A learner enters a subject or learning goal.
2.  **Research:** The TinyFish integration is intended to discover
    relevant web sources and retrieve selected content.
3.  **Generate:** An AI model turns retrieved material into structured
    explanations and examples.
4.  **Explore:** Learners engage with visual and interactive lesson
    content.
5.  **Assess:** Concept-tagged quizzes evaluate understanding.
6.  **Adapt:** Incorrect answers can guide targeted explanations and
    follow-up practice.
7.  **Track:** Concept-level results can help learners see their
    progress.

## Key Features

### Adaptive learning loop

A wrong answer can reveal a concept that needs a different explanation,
another example, or more practice. IOPIA aims to use that signal to
guide the next learning step.

### Interactive explanations

The platform is designed to support diagrams, animations, equations, and
interactive browser-rendered content where appropriate.

### Contextual AI tutoring

Learners should be able to ask questions about the current material and
receive explanations tied to the topic they are studying.

### Research-informed content

The planned TinyFish integration gathers relevant external information
before lesson generation. Retrieved information still needs validation;
search alone does not guarantee accuracy.

### Concept-level assessment

Questions can be associated with the concepts they test so that results
can guide targeted remediation.

## TinyFish Integration

TinyFish is intended to serve as IOPIA's **web research and
information-retrieval layer**. The proposed IOPIA design assigns three
functional roles:

  -----------------------------------------------------------------------
  Role                                Responsibility
  ----------------------------------- -----------------------------------
  **Research Agent**                  Discovers relevant learning
                                      resources and retrieves content
                                      from selected webpages.

  **Verification Agent**              Supports checks for source
                                      credibility, conflicting
                                      information, and consistency
                                      between claims and sources.

  **Monitoring Agent**                Supports identifying updated
                                      information and changes in sources
                                      used for learning content.
  -----------------------------------------------------------------------

These are proposed responsibilities in IOPIA, not a claim that TinyFish
itself provides three separate built-in agents.

### Intended research pipeline

``` text
Learner topic
    ↓
TinyFish Search
    ↓
Discover candidate sources
    ↓
Select sources and retrieve content with TinyFish Fetch
    ↓
Validate content and retain source metadata
    ↓
AI lesson generation
    ↓
Interactive learning material
```

Source links can be retained for traceability. Verification remains
important because retrieval by itself does not guarantee factual
accuracy.

## Technical Architecture

IOPIA is planned as a modular application with separate responsibilities
for the interface, AI orchestration, research, assessment, and data
storage.

  -----------------------------------------------------------------------
  Layer                   Purpose                 Proposed technologies
  ----------------------- ----------------------- -----------------------
  Frontend                Lessons, quizzes, and   React, Next.js,
                          learner interface       TypeScript, Tailwind
                                                  CSS

  API layer               Secure application      Next.js server routes /
                          requests and service    API endpoints
                          communication           

  AI orchestration        Lesson generation,      LLM API, structured
                          tutoring, adaptive      prompts, Zod
                          explanations            

  Research                Search and retrieval of TinyFish Search and
                          selected sources        Fetch

  Interactive rendering   Visual content and      HTML, CSS, SVG, KaTeX
                          mathematical notation   

  Assessment              Quiz scoring and        Rules-based scoring and
                          concept mapping         concept tags

  Data                    Progress, lesson         PostgreSQL
                          metadata, assessment    
                          history                 

  Deployment              Application hosting      Netlify
  -----------------------------------------------------------------------

**Architecture principles** - Keep research, generation, assessment, and
rendering modular. - Validate model outputs before displaying them. -
Keep API keys and privileged operations on the server. - Preserve source
URLs and useful metadata. - Render validated content through known
components; do not execute arbitrary generated code. - Start with one
complete learning loop before expanding the product.

## Target Audience

-   **School students (Classes 6--12):** Clear explanations, exam
    preparation, and self-paced learning.
-   **Undergraduate students:** Support for complex topics, coursework,
    and assignments.
-   **Professionals and job seekers:** Industry-relevant skills and
    upskilling.
-   **Lifelong learners:** Self-paced exploration of personal interests.
-   **Educators and trainers:** Potential support for creating
    explanations and resources for diverse learners.

### Prerequisites

-   Node.js LTS
-   npm, pnpm, or the package manager used by the repository
-   Credentials for any external services enabled in the project

### Installation

1.  Clone the repository:

    ``` bash
    git clone https://github.com/adhyanchaudhary/Iopia
    cd iopia
    ```

2.  Install dependencies if this is a Node.js project:

    ``` bash
    npm install
    ```

3.  Create a local environment file:

    ``` bash
    cp .env.example .env.local
    ```

    If `.env.example` does not exist, create `.env.local` using the
    actual variables required by the code.

4.  Add the required credentials locally. Do not commit secrets.

5.  If the project uses Next.js and defines the usual development
    script, run:

    ``` bash
    npm run dev
    ```

6.  Open the local URL printed by the development server

## Configuration

The following names are examples for planning and must be aligned with
the implemented clients:

  ---------------------------------------------------------------------------------
  Variable                          Purpose                 Required when
  --------------------------------- ----------------------- -----------------------
  `TINYFISH_API_KEY`                Authenticates TinyFish  TinyFish integration is
                                    requests                enabled

  `LLM_API_KEY`                     Authenticates the       AI generation or
                                    selected language-model tutoring is enabled
                                    provider                

  `NEXT_PUBLIC_SUPABASE_URL`        Supabase project URL    Supabase is used

  `NEXT_PUBLIC_SUPABASE_ANON_KEY`   Browser-safe Supabase   Supabase client
                                    client key              integration is enabled

  `SUPABASE_SERVICE_ROLE_KEY`       Privileged server-side  A server workflow
                                    database access         specifically requires
                                                            it
  ---------------------------------------------------------------------------------

### Security

-   Never commit `.env.local`, API keys, tokens, or database
    credentials.
-   Keep privileged keys on the server and out of browser bundles.
-   Use the minimum permissions required.
-   Validate external and model-generated data before using it.
-   Check `.gitignore` before pushing.

## Development Roadmap

  -----------------------------------------------------------------------
  Phase                   Focus                   Intended result
  ----------------------- ----------------------- -----------------------
  1 --- Research          Search, retrieve        Research pipeline for
                          selected content,       one topic
                          retain source links     

  2 --- Generate          Create a structured     Consistent lesson
                          lesson from retrieved   format
                          information             

  3 --- Teach             Render accessible,      Usable learning
                          interactive material    experience

  4 --- Assess            Generate concept-tagged Concept-level feedback
                          questions and evaluate  
                          responses               

  5 --- Adapt             Identify weak concepts  Complete adaptive loop
                          and generate targeted   
                          follow-up content       

  6 --- Evaluate          Test relevance,         Evidence about system
                          quality, alignment, and quality
                          reliability             
  -----------------------------------------------------------------------

The first milestone should be one complete end-to-end learning loop,
rather than many disconnected features.

## Evaluation

IOPIA should be evaluated with measurable checks rather than assumptions
about learning outcomes:

-   **Source relevance:** Do retrieved sources address the learner's
    topic?
-   **Content quality:** Are explanations clear and supported by
    suitable evidence?
-   **Assessment alignment:** Do quiz questions test the concepts
    taught?
-   **Adaptation quality:** Do follow-up explanations address identified
    misconceptions?
-   **Learning improvement:** Do learners improve on follow-up questions
    about previously weak concepts?
-   **Usability:** Can learners navigate the experience without
    unnecessary friction?

## Future Scope and Impact

### Planned capabilities

-   Multilingual explanations and localized learning.
-   More advanced personalization of difficulty, pace, and teaching
    style.
-   Interactive simulations and richer visual lessons.
-   Smarter tutoring with alternative explanations.
-   Source freshness workflows and content monitoring.
-   Learning analytics for concept mastery and recurring misconceptions.
-   Accessibility improvements for diverse learning needs.

### Intended impact

-   Help learners identify and work through specific knowledge gaps.
-   Make difficult concepts easier to explore visually.
-   Give educators potential support for creating alternative
    explanations.
-   Support self-paced academic, professional, and personal learning.
-   Connect mistakes to meaningful next steps.

These are intended capabilities and outcomes. Their actual impact should
be evaluated through user testing and learning measures.
.

## Contributing

Suggestions and contributions can help improve IOPIA.

1.  Review the current project status and open issues.
2.  Create a branch for a focused change.
3.  Keep changes modular and document relevant configuration.
4.  Test changes before opening a pull request.
5.  Never include credentials, private user data, or secrets in commits.


## Vision

IOPIA aims to make learning more responsive: understand what the learner
needs, explain it in a useful way, evaluate understanding, and use the
result to decide what comes next.

**IOPIA --- Learn smarter. Understand deeper. Keep improving.**

*Better learning begins when the next lesson responds to what the
learner actually needs.*

# Project Architecture

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client Browser"
        UI[User Interface]
        GA[Google Analytics]
        Router[Next.js Router]
    end

    subgraph "Next.js Application"
        subgraph "Pages Layer"
            IndexPage[pages/index.js]
            AppPage[pages/_app.js]
            APIPage[pages/api/hello.js]
        end

        subgraph "Components Layer"
            SearchBox[TrackedSearchBox]
            Stats[TrackedStats]
            RefinementList[TrackedRefinementList]
            Hit[Hit Component]
            Tracker[EcommerceTracker]
        end

        subgraph "Library Layer"
            Utils[lib/utils.js]
            GTag[lib/gtag.js]
        end

        subgraph "Styles"
            GlobalCSS[styles/globals.scss]
            BootstrapCSS[styles/bootstrap.scss]
        end
    end

    subgraph "External Services"
        TypesenseCloud[Typesense Cloud Cluster]
        GAService[Google Analytics 4]
        Vercel[Vercel Hosting]
    end

    subgraph "Data Layer"
        ProductData[scripts/data/ecommerce.json]
        IndexScript[scripts/populateTypesenseIndex.js]
    end

    UI --> IndexPage
    IndexPage --> SearchBox
    IndexPage --> Stats
    IndexPage --> RefinementList
    IndexPage --> Hit
    IndexPage --> Tracker
    
    SearchBox --> GTag
    Stats --> GTag
    RefinementList --> GTag
    Hit --> GTag
    Tracker --> GTag
    
    GTag --> GAService
    
    IndexPage --> Utils
    Utils --> TypesenseCloud
    
    IndexScript --> ProductData
    IndexScript --> TypesenseCloud
    
    AppPage --> Router
    AppPage --> GAService
    
    Vercel --> Next.js
```

## Component Architecture

```mermaid
graph TD
    subgraph "React Component Hierarchy"
        App[_app.js - Root App]
        Home[index.js - Home Page]
        
        subgraph "Search Components"
            InstantSearch[InstantSearch Provider]
            SearchBox[TrackedSearchBox]
            Stats[TrackedStats]
            Hits[Hits Container]
            Hit[Individual Hit]
        end
        
        subgraph "Filter Components"
            HierarchicalMenu[Category Menu]
            RefinementList[TrackedRefinementList]
            ToggleRefinement[Free Shipping Toggle]
            RangeInput[Price Range]
            ClearRefinements[Clear Filters]
        end
        
        subgraph "Navigation Components"
            SortBy[Sort Options]
            HitsPerPage[Results Per Page]
            Pagination[Page Navigation]
        end
        
        subgraph "Tracking Components"
            EcommerceTracker[Analytics Tracker]
            GTagLib[Google Analytics Library]
        end
    end

    App --> Home
    Home --> InstantSearch
    InstantSearch --> SearchBox
    InstantSearch --> Stats
    InstantSearch --> Hits
    InstantSearch --> HierarchicalMenu
    InstantSearch --> RefinementList
    InstantSearch --> ToggleRefinement
    InstantSearch --> RangeInput
    InstantSearch --> ClearRefinements
    InstantSearch --> SortBy
    InstantSearch --> HitsPerPage
    InstantSearch --> Pagination
    InstantSearch --> EcommerceTracker
    
    Hits --> Hit
    
    SearchBox --> GTagLib
    Stats --> GTagLib
    RefinementList --> GTagLib
    Hit --> GTagLib
    EcommerceTracker --> GTagLib
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant NextJS
    participant Typesense
    participant Analytics

    User->>Browser: Load Page
    Browser->>NextJS: Request /
    NextJS->>Typesense: getServerState()
    Typesense-->>NextJS: Initial Search Results
    NextJS-->>Browser: SSR HTML + Data
    Browser-->>User: Rendered Page

    User->>Browser: Search Query
    Browser->>NextJS: Search Input
    NextJS->>Typesense: Search API Call
    Typesense-->>NextJS: Search Results
    NextJS-->>Browser: Updated Results
    Browser->>Analytics: Track Search Event
    Browser-->>User: Display Results

    User->>Browser: Apply Filter
    Browser->>NextJS: Filter Change
    NextJS->>Typesense: Filtered Search
    Typesense-->>NextJS: Filtered Results
    NextJS-->>Browser: Updated Results
    Browser->>Analytics: Track Filter Event
    Browser-->>User: Display Filtered Results

    User->>Browser: Click Product
    Browser->>Analytics: Track Product View
    Browser-->>User: Product Interaction
```

## File Structure Architecture

```mermaid
graph LR
    subgraph "Project Root"
        subgraph "Configuration"
            PackageJSON[package.json]
            NextConfig[next.config.js]
            EnvFile[.env]
            ESLint[.eslintrc]
        end

        subgraph "Source Code"
            subgraph "Pages"
                IndexJS[pages/index.js]
                AppJS[pages/_app.js]
                ApiHello[pages/api/hello.js]
            end

            subgraph "Components"
                HitComp[components/Hit/]
                TrackedSearch[components/TrackedSearchBox.js]
                TrackedStats[components/TrackedStats.js]
                TrackedRefine[components/TrackedRefinementList.js]
                EcommTracker[components/EcommerceTracker.js]
            end

            subgraph "Libraries"
                UtilsLib[lib/utils.js]
                GTagLib[lib/gtag.js]
            end

            subgraph "Styles"
                GlobalStyles[styles/globals.scss]
                BootstrapStyles[styles/bootstrap.scss]
            end

            subgraph "Scripts"
                DataJSON[scripts/data/ecommerce.json]
                PopulateScript[scripts/populateTypesenseIndex.js]
            end

            subgraph "Public Assets"
                Images[public/images/]
                Favicon[public/favicon.png]
            end
        end
    end
```

## Technology Stack Architecture

```mermaid
graph TB
    subgraph "Frontend Stack"
        React[React 18]
        NextJS[Next.js 14]
        InstantSearch[React InstantSearch]
        Bootstrap[Bootstrap 5]
        SCSS[Sass/SCSS]
    end

    subgraph "Search Stack"
        TypesenseAdapter[Typesense InstantSearch Adapter]
        TypesenseCloud[Typesense Cloud]
        SearchAPI[Search API]
    end

    subgraph "Analytics Stack"
        GA4[Google Analytics 4]
        GTag[gtag Library]
        CustomEvents[Custom E-commerce Events]
    end

    subgraph "Deployment Stack"
        VercelHost[Vercel Hosting]
        CDN[Global CDN]
        SSR[Server-Side Rendering]
    end

    subgraph "Development Stack"
        NodeJS[Node.js]
        NPM[NPM/Yarn]
        ESLint[ESLint]
        Prettier[Prettier]
    end

    React --> NextJS
    NextJS --> InstantSearch
    InstantSearch --> TypesenseAdapter
    TypesenseAdapter --> TypesenseCloud
    
    NextJS --> GA4
    GA4 --> GTag
    GTag --> CustomEvents
    
    NextJS --> VercelHost
    VercelHost --> CDN
    VercelHost --> SSR
    
    NextJS --> Bootstrap
    Bootstrap --> SCSS
```

## Search & Analytics Flow

```mermaid
flowchart TD
    UserAction[User Action] --> SearchQuery{Search Query?}
    UserAction --> FilterAction{Filter Action?}
    UserAction --> ProductClick{Product Click?}
    UserAction --> SortAction{Sort Action?}

    SearchQuery -->|Yes| TrackedSearchBox
    FilterAction -->|Yes| TrackedRefinementList
    ProductClick -->|Yes| HitComponent
    SortAction -->|Yes| SortByComponent

    TrackedSearchBox --> TypesenseSearch[Typesense Search API]
    TrackedRefinementList --> TypesenseFilter[Typesense Filter API]
    HitComponent --> ProductView[Product View Event]
    SortByComponent --> SortEvent[Sort Event]

    TypesenseSearch --> SearchResults[Search Results]
    TypesenseFilter --> FilteredResults[Filtered Results]

    SearchResults --> TrackedStats
    FilteredResults --> TrackedStats
    TrackedStats --> ResultsDisplay[Display Results]

    TrackedSearchBox --> GASearchEvent[GA Search Event]
    TrackedRefinementList --> GAFilterEvent[GA Filter Event]
    ProductView --> GAProductEvent[GA Product View Event]
    SortEvent --> GASortEvent[GA Sort Event]

    GASearchEvent --> GoogleAnalytics[Google Analytics 4]
    GAFilterEvent --> GoogleAnalytics
    GAProductEvent --> GoogleAnalytics
    GASortEvent --> GoogleAnalytics

    EcommerceTracker --> StateMonitoring[Monitor Search State]
    StateMonitoring --> AdvancedEvents[Advanced Analytics Events]
    AdvancedEvents --> GoogleAnalytics
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        LocalDev[Local Development]
        LocalTypesense[Local Typesense Server]
        DevEnv[.env Development]
    end

    subgraph "Production Environment"
        VercelProd[Vercel Production]
        TypesenseProd[Typesense Cloud Production]
        ProdEnv[Production Environment Variables]
        CDNProd[Global CDN]
    end

    subgraph "CI/CD Pipeline"
        GitRepo[Git Repository]
        VercelDeploy[Vercel Auto-Deploy]
        BuildProcess[Next.js Build]
        StaticGen[Static Generation]
    end

    subgraph "Monitoring & Analytics"
        GADashboard[Google Analytics Dashboard]
        VercelAnalytics[Vercel Analytics]
        TypesenseMetrics[Typesense Metrics]
    end

    LocalDev --> LocalTypesense
    LocalDev --> DevEnv

    GitRepo --> VercelDeploy
    VercelDeploy --> BuildProcess
    BuildProcess --> StaticGen
    StaticGen --> VercelProd

    VercelProd --> TypesenseProd
    VercelProd --> CDNProd
    VercelProd --> ProdEnv

    VercelProd --> GADashboard
    VercelProd --> VercelAnalytics
    TypesenseProd --> TypesenseMetrics
```
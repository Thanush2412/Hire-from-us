import FaqAccordion from "./_components/FaqAccordion";
import ContactForm from "./_components/ContactForm";
import MobileComparison from "./_components/MobileComparison";
import { FadeUp, StaggerGrid, StaggerItem, SlideLeft, SlideRight, ScalePop, CountingNumber, AnimatedStep, IconBox } from "./_components/Animate";
import {
  Rocket,
  Target,
  Lightbulb,
  Wrench,
  BarChart3,
  RefreshCw,
  Coins,
  Trophy,
  TrendingUp,
  AlertTriangle,
  Phone,
  Mail,
  HelpCircle,
  CheckCircle2,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  Zap,
  Star,
  Shield,
  Database,
  Code2,
  MessageSquare,
  ArrowRight,
  Award,
  FileText,
  Calendar,
  Layers,
} from "lucide-react";

/* ─── reusable tiny helpers (server-only, no state) ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-4">{children}</p>;
}

function GradientDivider() {
  return (
    <div className="my-4 md:my-5">
      <hr className="section-divider" />
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 group">
      <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-[#D528A2] to-[#F4A863] flex items-center justify-center group-hover:scale-110 transition-transform">
        <CheckCircle2 size={14} className="text-white" />
      </span>
      <span className="text-[#EAEAEA] text-base md:text-lg leading-relaxed">{children}</span>
    </li>
  );
}

/* ─── page ─── */
export default function HireFromUsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#3D3777" }}>
      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#3D3777]/90">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/faceprepcampus-logo.svg" 
              alt="FACE Prep Campus Logo" 
              className="h-9 w-auto"
            />
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm text-[#DADADA] font-medium">
            <a href="#solution" className="hover:text-[#F4A863] transition-all hover:scale-105">Solution</a>
            <a href="#talent-pool" className="hover:text-[#F4A863] transition-all hover:scale-105">Talent Pool</a>
            <a href="#how-it-works" className="hover:text-[#F4A863] transition-all hover:scale-105">Process</a>
            <a href="#contact" className="hover:text-[#F4A863] transition-all hover:scale-105">Contact</a>
          </nav>
          <a href="#contact" className="btn-gradient text-sm px-6 py-2.5 font-semibold">
            Get Started
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="relative pt-8 pb-10 md:pt-10 md:pb-14 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-[#D528A2] rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#F4A863] rounded-full opacity-10 blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Rocket size={14} className="text-[#F4A863]" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Hire From Us</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Hire Pre-Trained,<br />
                <span className="gradient-text">Job-Ready</span> Tech Talent<br />
                <span className="text-2xl md:text-3xl lg:text-4xl text-white/80">From Day 1</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-base md:text-lg text-[#DADADA]/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                Skip months of training and uncertainty. Access industry-ready candidates
                trained inside campuses, benchmarked on real hiring standards.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a href="#contact" className="btn-gradient text-sm px-6 py-3 inline-flex items-center justify-center gap-2 font-semibold">
                  <span>Request Candidate Profiles</span>
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="https://calendar.app.google/ub97dcaJ8MAbnSMz5" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-outline text-sm px-6 py-3 inline-flex items-center justify-center gap-2 font-semibold"
                >
                  <span>Schedule a Call</span>
                  <Calendar size={16} />
                </a>
              </div>
            </FadeUp>

            {/* Stats Grid */}
            <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: Zap,          motion: "flash"  as const, metric: "60%",  label: "Faster Onboarding" },
                { icon: TrendingUp,   motion: "rise"   as const, metric: "80%",  label: "PPO Conversion" },
                { icon: CheckCircle2, motion: "expand" as const, metric: "Day 1",label: "Productive" },
                { icon: Shield,       motion: "drop"   as const, metric: "100%", label: "Verified Skills" },
              ].map(({ icon: Icon, motion: m, metric, label }) => (
                <StaggerItem key={label} className="fp-card p-5 text-center">
                  <IconBox motion={m} className="flex justify-center mb-2">
                    <Icon size={20} className="text-[#F4A863]" />
                  </IconBox>
                  <div className="text-2xl font-black gradient-text mb-1">
                    <CountingNumber value={metric} />
                  </div>
                  <div className="text-xs text-[#DADADA]/70 font-medium">{label}</div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            THE PROBLEM
        ══════════════════════════════════════════ */}
        <section className="py-4 md:py-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeUp className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Target size={14} className="text-[#F4A863]" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">The Problem</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                Hiring Freshers Shouldn't<br />Feel Like a <span className="gradient-text">Gamble</span>
              </h2>
              <p className="text-base text-[#DADADA]/80 max-w-2xl mx-auto">
                Every company wants to hire fresh talent. But the reality?
              </p>
            </FadeUp>

            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[
                { icon: AlertTriangle, motion: "slideRight" as const, text: "Freshers often lack real-world skills",             color: "#F4A863" },
                { icon: Clock,         motion: "spin"       as const, text: "Teams spend months on training before productivity", color: "#D528A2" },
                { icon: Target,        motion: "expand"     as const, text: "Hiring outcomes are unpredictable",                  color: "#F4A863" },
                { icon: TrendingUp,    motion: "rise"       as const, text: "Attrition risk is high",                            color: "#D528A2" },
              ].map(({ icon: Icon, motion: m, text, color }) => (
                <StaggerItem key={text} className="fp-card p-6 text-center group">
                  <IconBox motion={m} className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={28} style={{ color }} />
                  </IconBox>
                  <p className="text-[#DADADA] text-sm leading-relaxed">{text}</p>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <FadeUp className="text-center">
              <div className="inline-block fp-card px-6 py-4 sm:px-8 sm:py-5">
                <p className="text-white font-bold text-base md:text-lg">
                  You don't just need candidates.{" "}
                  <span className="gradient-text">You need job-ready performers from Day 1.</span>
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            OUR SOLUTION
        ══════════════════════════════════════════ */}
        <section id="solution" className="py-4 md:py-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
            <div className="absolute top-20 left-0 w-72 h-72 bg-[#D528A2] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#F4A863] rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <SlideLeft>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
                  <Lightbulb size={14} className="text-[#F4A863]" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">Our Solution</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  A Ready-to-Hire<br />
                  <span className="gradient-text">Talent Pipeline</span><br />
                  Built Inside Campuses
                </h2>
                <p className="text-base text-[#DADADA]/80 leading-relaxed mb-5">
                  At FACE Prep Campus, we don't prepare students for placements at the end.
                  We build them for your hiring requirements from the beginning.
                </p>
                <p className="text-sm text-white/60 leading-relaxed mb-6 font-medium">
                  Our model integrates directly into college campuses to:
                </p>
                <ul className="space-y-4 mb-8">
                  <CheckItem>Train students on real industry tech stacks</CheckItem>
                  <CheckItem>Continuously assess performance</CheckItem>
                  <CheckItem>Benchmark them against hiring standards</CheckItem>
                  <CheckItem>Build a curated, job-ready talent pool</CheckItem>
                </ul>
                <a href="#contact" className="btn-gradient inline-flex items-center gap-2 text-sm">
                  <span>Explore Talent Pool</span>
                  <ArrowRight size={16} />
                </a>
              </SlideLeft>

              <SlideRight className="relative flex justify-center items-center mt-10 lg:mt-0">
                {/* Background glow behind the image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-[#D528A2] to-[#F4A863] opacity-20 rounded-full blur-3xl"></div>
                
                {/* Developer girl image */}
                <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl max-w-md w-full animate-float">
                  <img 
                    src="/developer_girl.png" 
                    alt="Professional Developer" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </SlideRight>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            WHAT MAKES CANDIDATES DIFFERENT
        ══════════════════════════════════════════ */}
        <section className="py-4 md:py-6">
          <FadeUp className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
              <Wrench size={14} className="text-[#F4A863]" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">What Makes Our Candidates Different</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              Not Freshers.{" "}
              <span className="gradient-text">Pre-Engineered Talent.</span>
            </h2>
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: Code2,
                motion: "slideLeft" as const,
                title: "Technical Skills",
                desc: "Candidates are trained in in-demand technologies like Java, Python, Full Stack Development, and Data Structures & Algorithms.",
              },
              {
                icon: Target,
                motion: "expand" as const,
                title: "Problem Solving Ability",
                desc: "Evaluated through real-world coding challenges and practical assessments — not just academic exams.",
              },
              {
                icon: MessageSquare,
                motion: "slideRight" as const,
                title: "Communication & Workplace Readiness",
                desc: "Every candidate is interview-ready, with strong communication and professional skills.",
              },
              {
                icon: BarChart3,
                motion: "rise" as const,
                title: "Verified Performance Data",
                desc: "Each profile comes with assessment scores, project work, and performance insights — so you hire with confidence.",
              },
            ].map(({ icon: Icon, motion: m, title, desc }) => (
              <StaggerItem key={title} className="fp-card p-6 group">
                <div className="flex gap-5">
                  <IconBox motion={m} className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D528A2]/20 to-[#F4A863]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={24} className="text-[#F4A863]" />
                    </div>
                  </IconBox>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                    <p className="text-[#DADADA]/80 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            TALENT POOL
        ══════════════════════════════════════════ */}
        <section id="talent-pool" className="py-4 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SlideLeft>
              <SectionLabel>
                <BarChart3 className="inline-block mr-2 -mt-1" size={18} />
                Explore Our Talent Pool
              </SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Hire Based on Data, Not Guesswork
              </h2>
              <p className="text-[#DADADA] text-lg leading-relaxed mb-8">
                Access a curated pool of candidates filtered by your exact hiring needs.
              </p>
              <h3 className="text-white font-semibold text-xl mb-5">Filter by:</h3>
              <ul className="space-y-4 mb-10">
                <CheckItem>Role (Software Developer, Analyst, etc.)</CheckItem>
                <CheckItem>Skills (Java, Python, React, etc.)</CheckItem>
                <CheckItem>College</CheckItem>
                <CheckItem>Graduation Year</CheckItem>
              </ul>
              <a href="#contact" className="btn-gradient inline-flex items-center gap-3 text-lg px-8 py-4 font-semibold">
                <span>Request Sample Candidate Profiles</span>
                <ArrowRight size={20} />
              </a>
            </SlideLeft>
            <SlideRight className="fp-card p-6 sm:p-8">
              <h3 className="text-white font-bold mb-6 text-xl sm:text-2xl">
                Each Candidate Profile Includes:
              </h3>
              <div className="space-y-5">
                {[
                  { icon: Trophy,   motion: "drop"      as const, label: "Verified Skill Scores" },
                  { icon: Layers,   motion: "flip"       as const, label: "Project Portfolio" },
                  { icon: Target,   motion: "expand"     as const, label: "Interview Readiness Rating" },
                  { icon: FileText, motion: "slideLeft"  as const, label: "Resume + Performance Insights" },
                ].map(({ icon: Icon, motion: m, label }, idx) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <IconBox motion={m} standalone={true} delay={idx * 0.12} className="flex-shrink-0">
                      <Icon size={28} className="text-[#F4A863]" />
                    </IconBox>
                    <span className="text-white font-medium text-base sm:text-lg">{label}</span>
                  </div>
                ))}
              </div>
            </SlideRight>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════ */}
        <section id="how-it-works" className="py-4 md:py-6">
          <FadeUp className="text-center mb-10">
            <SectionLabel>
              <RefreshCw className="inline-block mr-2 -mt-1" size={18} />
              How Hiring From Us Works
            </SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Simple. Fast. Predictable.
            </h2>
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Share Your Requirement",
                desc: "Tell us the roles, skills, and number of candidates you need.",
              },
              {
                step: "02",
                title: "Get Curated Profiles",
                desc: "Receive a shortlist of pre-assessed, job-ready candidates.",
              },
              {
                step: "03",
                title: "Interview & Evaluate",
                desc: "Conduct interviews or assessments as per your process.",
              },
              {
                step: "04",
                title: "Hire & Onboard",
                desc: "Select candidates and onboard with minimal training required.",
              },
            ].map(({ step, title, desc }, i) => (
              <AnimatedStep
                key={step}
                step={step}
                title={title}
                desc={desc}
                index={i}
              />
            ))}
          </StaggerGrid>
          <div className="mt-8 flex justify-center px-4">
            <div 
              className="fp-card px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 max-w-full"
              style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center" }}
            >
              <Zap size={18} className="text-[#F4A863]" style={{ flexShrink: 0 }} />
              <span 
                className="text-white font-bold text-xs xs:text-sm sm:text-base md:text-lg"
                style={{ whiteSpace: "nowrap" }}
              >
                Reduce your time-to-hire by up to{" "}
                <span className="gradient-text text-sm xs:text-base sm:text-xl md:text-2xl font-black">
                  <CountingNumber value="70%" />
                </span>
              </span>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            HIRING MODELS
        ══════════════════════════════════════════ */}
        <section className="py-4 md:py-6">
          <FadeUp className="text-center mb-14">
            <SectionLabel>
              <Coins className="inline-block mr-2 -mt-1" size={18} />
              Flexible Hiring Models
            </SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Hire the Way That Works for You
            </h2>
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Briefcase, motion: "slideLeft"  as const, title: "Full-Time Hiring (FTE)",      desc: "Direct placement of job-ready candidates into your team." },
              { icon: RefreshCw, motion: "spin"        as const, title: "Internship → PPO",             desc: "Internship to Pre-Placement Offers — evaluate before you commit." },
              { icon: FileText,  motion: "slideLeft"  as const, title: "Apprenticeship Hiring",        desc: "Aligned with the National Apprenticeship Training Scheme." },
              { icon: Users,     motion: "expand"     as const, title: "Bulk Hiring",                  desc: "Scale your team fast — whether you need 2 or 200 candidates." },
            ].map(({ icon: Icon, motion: m, title, desc }) => (
              <StaggerItem key={title} className="fp-card p-6 sm:p-8 text-center hover:border-white/20 transition-all">
                <IconBox motion={m} className="flex justify-center mb-5">
                  <Icon size={44} className="text-[#F4A863]" />
                </IconBox>
                <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                <p className="text-[#DADADA] text-base leading-relaxed">{desc}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <p className="text-center mt-10 text-[#DADADA] text-base sm:text-lg">
            Whether you&apos;re hiring{" "}
            <span className="text-white font-semibold text-xl">2 or 200</span> — we&apos;ve got you covered.
          </p>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            SUCCESS STORIES
        ══════════════════════════════════════════ */}
        <section className="py-4 md:py-6">
          <div className="text-center mb-14">
            <SectionLabel>
              <Trophy className="inline-block mr-2 -mt-1" size={18} />
              Success Stories
            </SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Companies Are Already Hiring Better with FACE Prep
            </h2>
          </div>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { metric: "60%", label: "Faster Onboarding",                    icon: Zap,       motion: "flash" as const },
              { metric: "80%", label: "Internship-to-Full-Time Conversion",    icon: TrendingUp, motion: "rise"  as const },
              { metric: "↓",   label: "Significant Reduction in Training Costs",icon: Coins,     motion: "flip"  as const },
            ].map(({ metric, label, icon: Icon, motion: m }) => (
              <StaggerItem key={label} className="fp-card p-6 sm:p-10 text-center hover:border-white/20 transition-all">
                <IconBox motion={m} className="flex justify-center mb-5">
                  <Icon size={40} className="text-[#F4A863]" />
                </IconBox>
                <div className="text-6xl font-black gradient-text mb-4">
                  <CountingNumber value={metric} />
                </div>
                <p className="text-[#DADADA] font-medium text-lg">{label}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            COMPARISON TABLE
        ══════════════════════════════════════════ */}
        <section className="py-4 md:py-6">
          <div className="text-center mb-14">
            <SectionLabel>
              <TrendingUp className="inline-block mr-2 -mt-1" size={18} />
              Why Companies Choose Us
            </SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Traditional Hiring vs{" "}
              <span className="gradient-text">FACE Prep Hiring</span>
            </h2>
          </div>
          {/* Desktop view: Table */}
          <div className="hidden md:block fp-card overflow-hidden">
            <div className="grid grid-cols-3 text-base font-bold">
              <div className="p-5 text-[#DADADA]/60 border-b border-white/10">Aspect</div>
              <div className="p-5 text-[#DADADA]/60 border-b border-l border-white/10">Traditional Hiring</div>
              <div className="p-5 text-white border-b border-l border-white/10 bg-white/5">
                FACE Prep Hiring
              </div>
            </div>
            {[
              {
                aspect: "Approach",
                bad: "Hire → Train → Hope for performance",
                good: "Train → Assess → Hire",
              },
              {
                aspect: "Readiness",
                bad: "High onboarding time",
                good: "Ready from Day 1",
              },
              {
                aspect: "Visibility",
                bad: "Limited visibility into candidate capability",
                good: "Data-backed candidate evaluation",
              },
              {
                aspect: "Outcomes",
                bad: "Higher hiring risk",
                good: "Predictable performance outcomes",
              },
            ].map(({ aspect, bad, good }, i) => (
              <div
                key={aspect}
                className={`grid grid-cols-3 text-base ${i < 3 ? "border-b border-white/10" : ""}`}
              >
                <div className="p-5 text-white/70 font-semibold">{aspect}</div>
                <div className="p-5 compare-row-bad border-l border-white/10 text-[#DADADA]/80">{bad}</div>
                <div className="p-5 compare-row-good border-l border-white/10 bg-white/5 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#D528A2] flex-shrink-0" /> 
                  <span className="text-white">{good}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile view: Sticky Scroll-driven Comparison reveal */}
          <MobileComparison />
          <p className="text-center mt-10 text-white font-semibold text-xl">
            We don&apos;t just help you hire.{" "}
            <span className="gradient-text text-2xl">We help you hire right.</span>
          </p>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            LIMITED ACCESS URGENCY
        ══════════════════════════════════════════ */}
        <section className="py-4 md:py-6">
          <FadeUp>
          <div
            className="rounded-2xl p-6 sm:p-10 md:p-14 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(213,40,162,0.15) 0%, rgba(244,168,99,0.1) 100%)",
              border: "1px solid rgba(213,40,162,0.3)",
            }}
          >
            <ScalePop className="flex justify-center mb-6">
              <AlertTriangle size={56} className="text-[#F4A863]" />
            </ScalePop>
            <SectionLabel>Limited Access</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-6 mb-6 leading-tight">
              Top Talent Gets Hired Early
            </h2>
            <p className="text-[#DADADA] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Our best candidates are often hired before graduation. Get early access
              to secure top performers before they&apos;re gone.
            </p>
            <a href="#contact" className="btn-gradient text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 inline-flex items-center gap-3 font-semibold">
              <span>Get Early Access Now</span>
              <ArrowRight size={20} />
            </a>
          </div>
          </FadeUp>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            CONTACT / FORM
        ══════════════════════════════════════════ */}
        <section id="contact" className="py-2 md:py-4">
          <div className="text-center mb-12">
            <SectionLabel>
              <Phone className="inline-block mr-2 -mt-1" size={16} />
              Get Started
            </SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Hiring Job-Ready Talent Today
            </h2>
            <p className="text-[#DADADA] text-lg max-w-xl mx-auto">
              Get access to pre-assessed candidates tailored to your hiring needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3 fp-card p-6 sm:p-8">
              <h3 className="text-white font-bold text-xl mb-6">
                Request Candidate Profiles
              </h3>
              <ContactForm />
            </div>

            {/* Direct contact */}
            <div className="lg:col-span-2 space-y-6">
              <div className="fp-card p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D528A2] to-[#F4A863] flex items-center justify-center text-white font-bold text-lg">
                    AJ
                  </div>
                  <div>
                    <p className="text-white font-bold">Abhishek Joseph</p>
                    <p className="text-[#F4A863] text-sm">AVP – Enterprise Relations</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <a
                    href="tel:+918868012396"
                    className="flex items-center gap-3 text-[#DADADA] hover:text-[#F4A863] transition-colors"
                  >
                    <Phone size={16} className="flex-shrink-0" />
                    <span>+91 88680 12396</span>
                  </a>
                  <a
                    href="mailto:abhishek@faceprep.in"
                    className="flex items-center gap-3 text-[#DADADA] hover:text-[#F4A863] transition-colors"
                  >
                    <Mail size={16} className="flex-shrink-0" />
                    <span>abhishek@faceprep.in</span>
                  </a>
                </div>
                <p className="mt-4 text-xs text-white/40 leading-relaxed">
                  Get faster responses, custom hiring solutions, and priority access to top candidates.
                </p>
              </div>

              <div className="fp-card p-5 sm:p-6">
                <h4 className="text-white font-bold mb-4">Also Available:</h4>
                <div className="space-y-3">
                  <a href="#contact" className="btn-gradient w-full text-sm py-2.5 flex items-center justify-center gap-2">
                    <span>Request Candidate Profiles</span>
                    <ArrowRight size={14} />
                  </a>
                  <a 
                    href="https://calendar.app.google/ub97dcaJ8MAbnSMz5" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-outline w-full text-sm py-2.5 flex items-center justify-center gap-2"
                  >
                    <span>Book a Hiring Consultation</span>
                    <Calendar size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* ══════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════ */}
        <section className="py-4 md:py-6">
          <div className="text-center mb-14">
            <SectionLabel>
              <HelpCircle className="inline-block mr-2 -mt-1" size={18} />
              FAQs
            </SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <FaqAccordion />
          </div>
        </section>

        <GradientDivider />

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6">
        <FadeUp className="max-w-6xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Stop hiring potential.{" "}
            <span className="gradient-text">Start hiring performance.</span>
          </p>
          <p className="text-[#DADADA]/50 text-base mt-6">
            © {new Date().getFullYear()} FACE Prep Campus. All rights reserved.
          </p>
        </FadeUp>
      </footer>
    </div>
  );
}

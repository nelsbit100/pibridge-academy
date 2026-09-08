import { useAcademy } from "../AcademyContext";
import { PROGRAMMES, INSTRUCTORS } from "../data";
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Star, Clock, ChevronRight } from "lucide-react";

type StatItem = { label: string; value: string; icon: typeof Users };
type Testimonial = { name: string; role: string; quote: string; avatar: string };

const STATS: StatItem[] = [
  { label: "Active Learners", value: "742+", icon: Users },
  { label: "Courses Available", value: "12", icon: BookOpen },
  { label: "Completion Rate", value: "87%", icon: TrendingUp },
  { label: "Employment Outcomes", value: "68%", icon: Award },
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Adjoa Poku", role: "SOC Analyst at Vodafone Ghana", quote: "PiBridge Academy gave me the practical skills and the portfolio to land my dream job in cybersecurity. The Professional Passport sealed the deal.", avatar: "adjoa" },
  { name: "Kwesi Appiah", role: "Junior Developer at Hubtel", quote: "I came in knowing a little HTML. Six months later, I am building production apps. The instructors actually care about your growth.", avatar: "kwesi" },
  { name: "Abena Osei", role: "Cloud Engineer at MTN", quote: "The hands-on labs are what set PiBridge apart. I was not just watching videos, I was configuring real infrastructure.", avatar: "abena" },
];

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const Icon = stat.icon;
  return (
    <div className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="flex flex-col items-center p-8 bg-white rounded-2xl border border-black/[0.04] hover:border-[#3D52A0]/20 hover:shadow-glass-lg transition-all duration-500">
        <div className="w-14 h-14 rounded-2xl bg-[#3D52A0]/[0.06] flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-[#3D52A0]" />
        </div>
        <span className="text-4xl font-extrabold text-[#003135] tracking-tight">{stat.value}</span>
        <span className="text-sm text-[#7A8A95] mt-2 font-medium">{stat.label}</span>
      </div>
    </div>
  );
}

function ProgrammeCard({
  programme,
  onClick,
}: {
  programme: (typeof PROGRAMMES)[0];
  onClick: () => void;
}) {
  return (
    <div className="reveal-scale">
      <div
        onClick={onClick}
        className="relative bg-white border border-black/[0.04] rounded-2xl p-8 cursor-pointer group overflow-hidden transition-all duration-500 hover:border-[#3D52A0]/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1"
      >
        <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">{programme.icon}</div>
        <h3 className="text-display-sm mb-3">{programme.title}</h3>
        <p className="text-[#7A8A95] text-sm mb-6 line-clamp-2 leading-relaxed">{programme.description}</p>

        <div className="flex items-center gap-4 text-xs text-[#9AAAB5] mb-6">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {programme.durationWeeks} weeks
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {programme.courses.length} courses
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#3D52A0] fill-[#3D52A0]" />
            {programme.rating}
          </span>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
          <span className="text-2xl font-extrabold text-[#003135] tracking-tight">
            GH&#x20B5; {programme.priceGHS.toLocaleString()}
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold text-[#3D52A0] group-hover:gap-3 transition-all duration-300">
            Explore <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}

function InstructorCard({ instructor }: { instructor: (typeof INSTRUCTORS)[0] }) {
  return (
    <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-black/[0.04] group hover:border-[#3D52A0]/20 hover:shadow-glass-lg transition-all duration-500">
      <div className="relative">
        <img src={instructor.avatar} alt={instructor.name} className="w-16 h-16 rounded-2xl bg-[#F0F8FF] ring-2 ring-[#3D52A0]/10 group-hover:ring-[#3D52A0]/30 transition-all duration-500" />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#3D52A0] rounded-full flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">★</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[#003135] text-sm tracking-tight">{instructor.name}</h4>
        <p className="text-xs text-[#3D52A0] font-semibold mt-0.5">{instructor.title}</p>
        <p className="text-xs text-[#9AAAB5] mt-1">{instructor.studentCount} students &middot; {instructor.rating}&#9733;</p>
      </div>
    </div>
  );
}

export function AcademyLanding() {
  const { navigateToProgramme, setView } = useAcademy();

  return (
    <div className="min-h-screen bg-aliceblue">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-32 lg:py-44 px-6">
        {/* Background */}
        <div className="absolute inset-0 bg-mesh-vibrant" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#3D52A0]/[0.06] border border-[#3D52A0]/15 rounded-full text-[#3D52A0] text-xs font-semibold mb-8 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D52A0] animate-glow-pulse" /> Learn. Prove. Prosper.
            </span>
          </div>

          <h1 className="reveal text-display-xl lg:text-[5.5rem] mb-8" style={{ transitionDelay: "100ms" }}>
            Don&apos;t just learn
            <br />
            technology.
            <br />
            <span className="text-gradient">Prove you can use it.</span>
          </h1>

          <p className="reveal text-lg text-[#7A8A95] max-w-2xl mx-auto mb-12 leading-relaxed" style={{ transitionDelay: "200ms" }}>
            PiBridge Academy builds job-ready tech professionals through hands-on training,
            real projects, verified credentials, and direct employer connections.
          </p>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4" style={{ transitionDelay: "300ms" }}>
            <button onClick={() => setView("programmes")} className="btn-primary">
              Browse Programmes <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => setView("learner-dashboard")} className="btn-secondary">
              I already have an account
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-6"><div className="divider-teal" /></div>

      {/* ── Featured Programmes ── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="reveal inline-flex items-center gap-2 px-4 py-1.5 bg-[#3D52A0]/[0.06] border border-[#3D52A0]/15 rounded-full text-[#3D52A0] text-xs font-semibold mb-6 uppercase tracking-widest">
              Professional Paths
            </span>
            <h2 className="reveal text-display-lg" style={{ transitionDelay: "100ms" }}>
              Choose your path.
            </h2>
            <p className="reveal text-[#7A8A95] max-w-xl mx-auto mt-4 text-lg" style={{ transitionDelay: "200ms" }}>
              Structured programmes that take you from foundation to job-ready, with projects, assessments, and a Professional Passport to prove it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMMES.filter((p) => p.featured).map((programme) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
                onClick={() => navigateToProgramme(programme.id)}
              />
            ))}
          </div>

          <div className="reveal text-center mt-12">
            <button
              onClick={() => setView("programmes")}
              className="text-[#3D52A0] hover:text-[#2C3D80] font-semibold text-sm flex items-center gap-1 mx-auto transition-colors"
            >
              View all programmes <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── PiBridge Ecosystem ── */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="reveal inline-flex items-center gap-2 px-4 py-1.5 bg-[#3D52A0]/[0.06] border border-[#3D52A0]/15 rounded-full text-[#3D52A0] text-xs font-semibold mb-6 uppercase tracking-widest">
              The Ecosystem
            </span>
            <h2 className="reveal text-display-lg" style={{ transitionDelay: "100ms" }}>
              One mission.<br />Three platforms.
            </h2>
            <p className="reveal text-[#7A8A95] max-w-xl mx-auto mt-4 text-lg" style={{ transitionDelay: "200ms" }}>
              Learn a skill, build a business, protect it with cybersecurity. Your economic independence starts here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="reveal" style={{ transitionDelay: "0ms" }}>
              <div onClick={() => setView("businessos")} className="p-8 bg-aliceblue rounded-2xl border border-black/[0.04] cursor-pointer hover:border-emerald-400/30 hover:shadow-glass-lg group transition-all duration-500 hover:-translate-y-1">
                <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110">💼</div>
                <h3 className="text-display-sm mb-3">PiBridge BusinessOS</h3>
                <p className="text-[#7A8A95] text-sm mb-6 leading-relaxed">Run your business, not your spreadsheets. All-in-one dashboard for Ghanaian businesses.</p>
                <span className="flex items-center gap-2 text-sm font-semibold text-emerald-500 group-hover:gap-3 transition-all duration-300">
                  Explore BusinessOS <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: "100ms" }}>
              <div className="p-8 bg-[#3D52A0]/[0.04] rounded-2xl border border-[#3D52A0]/15 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#3D52A0]/[0.02]" />
                <div className="relative z-10">
                  <div className="text-5xl mb-6">🎓</div>
                  <h3 className="text-display-sm mb-3">PiBridge Academy</h3>
                  <p className="text-[#7A8A95] text-sm mb-6 leading-relaxed">Learn, prove, prosper. Tech skills training that leads to real employment.</p>
                  <span className="flex items-center gap-2 text-sm font-semibold text-[#3D52A0]">
                    You're here <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: "200ms" }}>
              <div onClick={() => setView("secure")} className="p-8 bg-aliceblue rounded-2xl border border-black/[0.04] cursor-pointer hover:border-rose-400/30 hover:shadow-glass-lg group transition-all duration-500 hover:-translate-y-1">
                <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110">🔒</div>
                <h3 className="text-display-sm mb-3">PiBridge Secure</h3>
                <p className="text-[#7A8A95] text-sm mb-6 leading-relaxed">Enterprise cybersecurity for small businesses. Protect what you build.</p>
                <span className="flex items-center gap-2 text-sm font-semibold text-rose-500 group-hover:gap-3 transition-all duration-300">
                  Explore Secure <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Career Discovery & Employer Portal */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="reveal" style={{ transitionDelay: "0ms" }}>
              <div onClick={() => setView("career-discovery")} className="p-8 bg-aliceblue rounded-2xl border border-black/[0.04] cursor-pointer hover:border-violet-400/30 hover:shadow-glass-lg group transition-all duration-500 hover:-translate-y-1">
                <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110">🧭</div>
                <h3 className="text-display-sm mb-3">Career Discovery Assessment</h3>
                <p className="text-[#7A8A95] text-sm mb-6 leading-relaxed">Not sure which path to take? Take our 6-question assessment and get personalised programme recommendations.</p>
                <span className="flex items-center gap-2 text-sm font-semibold text-violet-500 group-hover:gap-3 transition-all duration-300">
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: "100ms" }}>
              <div onClick={() => setView("employer-portal")} className="p-8 bg-aliceblue rounded-2xl border border-black/[0.04] cursor-pointer hover:border-[#3D52A0]/30 hover:shadow-glass-lg group transition-all duration-500 hover:-translate-y-1">
                <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-110">🏢</div>
                <h3 className="text-display-sm mb-3">Employer Portal</h3>
                <p className="text-[#7A8A95] text-sm mb-6 leading-relaxed">Hire verified tech talent. Browse competency-scored graduates with real project portfolios.</p>
                <span className="flex items-center gap-2 text-sm font-semibold text-[#3D52A0] group-hover:gap-3 transition-all duration-300">
                  Find Talent <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="reveal inline-flex items-center gap-2 px-4 py-1.5 bg-[#3D52A0]/[0.06] border border-[#3D52A0]/15 rounded-full text-[#3D52A0] text-xs font-semibold mb-6 uppercase tracking-widest">
              The Process
            </span>
            <h2 className="reveal text-display-lg" style={{ transitionDelay: "100ms" }}>
              How PiBridge works.
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "1", title: "Discover", desc: "Take a career assessment to find the right path for your goals." },
              { step: "2", title: "Learn", desc: "Follow structured courses with video, readings, and hands-on labs." },
              { step: "3", title: "Build", desc: "Complete real-world projects that become your portfolio." },
              { step: "4", title: "Prove", desc: "Pass assessments and earn verified credentials." },
              { step: "5", title: "Launch", desc: "Connect with employers and start your career." },
            ].map((item, i) => (
              <div key={item.step} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-[#003135] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#0FA4AF] transition-colors duration-500">
                  <span className="text-white font-extrabold text-lg">{item.step}</span>
                </div>
                <h3 className="font-bold text-[#003135] text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[#7A8A95] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instructors ── */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="reveal text-display-lg">
              Learn from the best.
            </h2>
            <p className="reveal text-[#7A8A95] mb-12 max-w-xl mx-auto text-lg" style={{ transitionDelay: "100ms" }}>
              Our instructors are practicing professionals who have built real systems, not just read about them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSTRUCTORS.map((inst, i) => (
              <div key={inst.id} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <InstructorCard instructor={inst} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="reveal inline-flex items-center gap-2 px-4 py-1.5 bg-[#3D52A0]/[0.06] border border-[#3D52A0]/15 rounded-full text-[#3D52A0] text-xs font-semibold mb-6 uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="reveal text-display-lg" style={{ transitionDelay: "100ms" }}>
              What our learners say.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="p-8 bg-white rounded-2xl border border-black/[0.04] hover:shadow-glass-lg transition-all duration-500 h-full flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3D52A0]/30 to-transparent rounded-t-2xl" />
                  <div className="flex items-center gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <Star key={j} className="w-4 h-4 text-[#3D52A0] fill-[#3D52A0]" />
                    ))}
                  </div>
                  <p className="text-[#3A5060] text-sm mb-6 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-black/[0.04]">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}`}
                      alt={t.name}
                      className="w-10 h-10 rounded-xl bg-[#F0F8FF]"
                    />
                    <div>
                      <p className="font-bold text-[#003135] text-sm">{t.name}</p>
                      <p className="text-xs text-[#9AAAB5]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003135] via-[#024950] to-[#003135]" />
        <div className="absolute inset-0 bg-grid opacity-10" style={{ backgroundImage: "linear-gradient(rgba(73,197,182,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(73,197,182,0.1) 1px, transparent 1px)" }} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="reveal text-display-lg lg:text-display-xl text-white mb-6">
            Ready to start?
          </h2>
          <p className="reveal text-[#9AAAB5] mb-12 max-w-xl mx-auto leading-relaxed text-lg" style={{ transitionDelay: "100ms" }}>
            Join hundreds of learners building real skills, real portfolios, and real careers.
          </p>
          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <button
              onClick={() => setView("programmes")}
              className="btn-glow px-10 py-5 text-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

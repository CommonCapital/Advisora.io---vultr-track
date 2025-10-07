 "use client";
import React from 'react';
import { 
  TrendingUp, 
  Shield, 
  Target, 
  Zap, 
  Briefcase, 
  Database, 
  Compass, 
  CheckCircle,
  Users,
  Search,
  Globe,
  Brain,
  MessageSquare,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// --- Utility Components ---

interface SectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children, className }) => (
  <section className="py-20 lg:py-32 space-y-6" >
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tighter">
        {title}
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mb-12">{subtitle}</p>
      {children}
    </div>
  </section>
);

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => (
  <div className={`p-8 rounded-2xl border ${color === 'blue' ? 'border-blue-700/50 bg-blue-900/20' : 'border-purple-700/50 bg-purple-900/20'} backdrop-blur-sm transition duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
    <Icon className={`w-8 h-8 ${color === 'blue' ? 'text-blue-400' : 'text-purple-400'} mb-4`} />
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-white">{description}</p>
  </div>
);

// --- Main Application Component ---

const App: React.FC = () => {
  // Using simple divs for image placeholders since external image imports like 'next/image' aren't supported in this environment.
  const founderPlaceholder = (name: string, title: string, color: string) => (
    <div className={`w-32 h-32 ${color} rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white/20 shadow-xl`}>
      <Users className="w-12 h-12 text-white/80" />
    </div>
  );
const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter">
      {/* Dynamic Background Grid and Lights */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1000x1000/0d131f/0d131f?text=')] bg-repeat opacity-5" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)' }}></div>
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        
        {/* Navigation Bar */}
        <header className="sticky top-0 backdrop-blur-sm bg-gray-900/80 border-b border-gray-800 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
            <div className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Advisora.io
            </div>
            <nav className="space-x-8 hidden md:flex text-gray-400">
              <a href="#diligence" className="hover:text-white transition">Diligence Agents</a>
              <a href="#features" className="hover:text-white transition">Platform Edge</a>
              <a href="#founders" className="hover:text-white transition">Team</a>
              <a href="#" className="py-2 px-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">
               <Button onClick={() => router.push('/auth/sign-in')} >
                Start
               </Button>
              </a>
            </nav>
          </div>
        </header>

        {/* --- 1. HERO SECTION: VC FOCUS --- */}
        <section className="text-center pt-32 pb-24 lg:pt-48 lg:pb-36">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-6 inline-flex items-center gap-3 bg-blue-900/40 border border-blue-700/50 rounded-full px-5 py-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-white/90">The AI Edge for Next-Gen Venture Capital</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
              Institutionalize <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Proprietary Diligence.</span> Accelerate Decisive Action.
            </h1>
            <div className='mt-50'/>
            <p className="text-xl lg:text-2xl text-blue-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Advisora transforms your firm's tacit knowledge, deal memos, and market research into a deployable AI brain, giving your fund an asymmetric edge in every investment cycle.
            </p>

            <div className="space-x-4">
              <a href="#" className="inline-flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-500 text-white transition duration-300 shadow-xl shadow-blue-900/50">
                Start AI Diligence Pilot <Zap className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </section>

        {/* --- 2. PROBLEM SECTION: VC PAIN POINTS --- */}
        <Section 
        className="space-y-7"
          title="The Diligence Deficit." 
          subtitle="The limitations of human-scale due diligence and portfolio support are holding back capital deployment efficiency."
        >
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Database} 
              title="Analysis Paralysis" 
              description="Manually sifting 500+ pages of data room documents, leading to slower decisions and missed investment windows."
              color="blue"
            />
            <FeatureCard 
              icon={Shield} 
              title="Tacit Knowledge Leakage" 
              description="Losing critical, accumulated deal patterns and strategic frameworks when partners or analysts transition out."
              color="purple"
            />
            <FeatureCard 
              icon={Briefcase} 
              title="Unscalable Portfolio Ops" 
              description="Inability to deliver customized, high-touch support to dozens of portfolio companies simultaneously."
              color="blue"
            />
          </div>
           <FeatureCard 
              icon={Lightbulb} 
              title="Unproper sorting" 
              color="purple"
              description="Unproper sorting is why 95% of startups fail.
            

Too often, investors get caught in the noise—fancy decks, charismatic founders, and hype-driven markets. But beneath the surface, many startups are deeply flawed: weak fundamentals, poor execution, or lack of scalability.

This inefficiency is costly. Every misstep wastes capital, time, and opportunity.

👉 That’s where Advisora comes in.
We give VCs and funds an AI-powered partner that coldly and objectively evaluates startups, cutting through the noise. Our platform automates:
	•	Screening pitches and flagging risks.
	•	Generating structured data reports.
	•	Providing clear, evidence-based insights.

No emotion. No bias. Just clarity.

The result: smarter investment decisions, less wasted capital, and a higher probability of finding the next unicorn.

📈 Advisora isn’t just another tool—it’s how investors reclaim the 95% and focus only on the startups that truly matter."
             
            />
        </Section>

        {/* --- 3. SOLUTION SECTION: PLATFORM EDGE --- */}
        <div id="features" className="bg-gray-800 border-t border-b border-gray-700/50">
          <Section 
            title="Advisora: Your Institutional AI." 
            subtitle="Train a bespoke AI agent that understands your investment thesis, risk tolerance, and operational playbooks."
          >
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Search} 
                title="Automated Data Room Analysis" 
                description="Ingest massive data rooms. Ask granular, complex questions and receive cited, auditable answers based *only* on the documents provided."
                color="purple"
              />
              <FeatureCard 
                icon={Target} 
                title="Thematic Market Mapping" 
                description="Use your firm's investment mandates to instantly map and score potential targets in new, emerging markets with real-time data integration."
                color="blue"
              />
              <FeatureCard 
                icon={MessageSquare} 
                title="Portfolio Agent Deployment" 
                description="Instantly deploy 'Go-to-Market' or 'Hiring Strategy' agents, trained on your best playbooks, directly to portfolio leadership."
                color="purple"
              />
            </div>
          </Section>
        </div>


        {/* --- 4. STATUS & ROADMAP --- */}
        <Section 
          title="Traction & Roadmap" 
          subtitle="We build as we learn. Our execution velocity is driven by deep technical expertise and a founder-led product culture."
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400 flex items-center">
                Current Status <CheckCircle className="w-5 h-5 ml-2" />
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>MVP ready with React + Next.js</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Postgres via Neon and OpenAI API integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span>In-house LLM trained on specific financial/consulting data in development</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Beta testing underway in three key international markets (AZ, KZ, UK)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-400 flex items-center">
                Future Edge <Globe className="w-5 h-5 ml-2" />
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Dedicated, fine-tuned LLM optimized for financial and strategic reasoning.</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>Integration with live financial data APIs for real-time market scoring.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span>Enterprise authentication and API infrastructure for large fund adoption.</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* --- 5. FOUNDERS SECTION --- */}
        <div id="founders" className="bg-gray-950 border-t border-gray-800">
          <Section 
            title="The Team Building the Edge." 
            subtitle="Execution-focused founders with deep AI/ML capabilities and an intellectual hunger to disrupt."
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-800/50 rounded-2xl p-8 text-center border-t-4 border-blue-500 shadow-lg">
                {founderPlaceholder("Nursan Omarov", "CEO & FOUNDER", "bg-blue-600")}
                <h3 className="text-2xl font-bold mb-2 text-white">Nursan Omarov</h3>
                <p className="text-blue-400 font-semibold mb-4">CEO & FOUNDER (AI/ML & Vision)</p>
                <p className="text-gray-300 leading-relaxed text-left">
                  Nursan Omarov is a 17-year-old AI/ML developer and visionary entrepreneur from Kazakhstan. He has single-handedly built complex MVPs and ML models using Next.js, TypeScript, PostgreSQL, PyTorch, and LLMs. He is currently developing Kazakhstan’s first domestic Large Language Model (LLM) tailored for the consulting domain, aiming to position Advisora as a global disruptor.
                  <br /><br />
                  <em className="text-blue-300">“I don’t believe in waiting years to start; I build as I learn. Theory without execution is wasted potential.”</em>
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-2xl p-8 text-center border-t-4 border-purple-500 shadow-lg">
                {founderPlaceholder("Alimzhan Tokushev", "CPO & CO-FOUNDER", "bg-purple-600")}
                <h3 className="text-2xl font-bold mb-2 text-white">Alimzhan Tokushev</h3>
                <p className="text-purple-400 font-semibold mb-4">CPO & CO-FOUNDER (Product & Architecture)</p>
                <p className="text-gray-300 leading-relaxed text-left">
                  Alimzhan Tokushev, 19, is the Chief Product Officer and Co-Founder. With a deep understanding of user experience and system architecture, he bridges the gap between cutting-edge ML/AI development and real-world business utility. He leads product vision and LLM roadmap strategies, ensuring Advisora remains intuitive while technically superior.
                  <br /><br />
                  <em className="text-purple-300">“We don’t just build products—we build systems that learn, adapt, and scale with our clients.”</em>
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* --- FOOTER --- */}
        <footer className="text-center py-10 border-t border-gray-800">
          <p className="text-gray-500 text-sm">Advisora.io | Institutional Intelligence for Venture Capital | &copy; 2025</p>
        </footer>

      </div>

      <style jsx global>{`
        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 40px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default App;

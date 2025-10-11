'use client';
import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, FileText, Database, Shield, Server, Lock, Zap, X, Menu } from "lucide-react";

import "./App.css";
import { useState } from "react";
import Link from "next/link";

const queryClient = new QueryClient();

const Page =  () =>  {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
   <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          {/* Navigation */}
          <nav className="flex top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4L4 10L16 16L28 10L16 4Z" className="fill-primary"/>
                    <path d="M4 16L16 22L28 16" className="stroke-primary" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 22L16 28L28 22" className="stroke-primary" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-lg sm:text-xl font-semibold text-charcoal">Advisora</span>
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                  <a href="#platform" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Platform</a>
                  <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Features</a>
                  <a href="#security" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Security</a>
                  <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Pricing</a>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="secondary" size="lg" className="hidden sm:flex bg-blue-700 to-blue-800">
                    Request Demo
                  </Button>
                  <Button variant="secondary" size="sm" className="sm:hidden bg-blue-700 to-blue-800">
                    Demo
                  </Button>
                  <button 
                    className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
              
              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
                  <Link href="/platform" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 hover:bg-primary/5 px-2 rounded">Platform</Link>
                  <Link href="/features" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 hover:bg-primary/5 px-2 rounded">Features</Link>
                  <Link href="/security" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 hover:bg-primary/5 px-2 rounded">Security</Link>
                  <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 hover:bg-primary/5 px-2 rounded">Pricing</Link>
                </div>
              )}
            </div>
          </nav>

          <main>
            {/* Hero Section */}
            <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
              <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div className="space-y-6 sm:space-y-8">
                    <div className="inline-block animate-fade-in">
                      <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                        AI OS for Venture Capital
                      </span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-charcoal-dark animate-fade-in">
                      Screen deals faster
                      <br />
                      Decide with confidence
                    </h1>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-in">
                      Automate scheduling and call capture, get structured due-diligence reports, and train your own private AI agent on your fund's proprietary data. Evaluate pitches against your DNA, not hype.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in">
                      <Button variant="secondary" size="lg" className="group w-full sm:w-auto hover:scale-105 transition-transform">
                        Request Demo
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
                        Watch Overview
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 animate-fade-in">
                      <div className="text-center sm:text-left">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-700">90+%</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Processing accuracy</div>
                      </div>
                      <div className="text-center sm:text-left border-l border-border pl-4 sm:pl-0 sm:border-l-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-700">+18hrs</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Saved per week</div>
                      </div>
                      <div className="text-center sm:text-left border-l border-border pl-4 sm:pl-0 sm:border-l-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-700">24%</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Higher response rate</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative mt-8 lg:mt-0 animate-fade-in">
                    <div className="absolute inset-0 bg-gradient-blue blur-3xl opacity-20 rounded-full"></div>
                    <img 
                      src={'/Pitch-review.png'} 
                      alt="Advisora AI Dashboard showing deal evaluation and analytics"
                      className="relative rounded-2xl shadow-2xl border border-border hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Value Proposition */}
            <section className="py-12 sm:py-24 px-4 sm:px-6 bg-secondary/30">
              <div className="container mx-auto">
                <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
                  <div className="inline-block animate-fade-in">
                    <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                      Foundation
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 animate-fade-in">Why we exist</h2>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 animate-fade-in">
                    We built Advisora for VCs who are done wasting time on shallow signals and hype-driven deals. Deal screening has been stuck in spreadsheets and manual work for too long. We exist to help you cut evaluation time and improve decision consistency.
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
                  <Card className="p-6 sm:p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 bg-card group cursor-pointer">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 rounded-lg bg-blue-700 to-blue-800 group-hover:scale-110 transition-transform">
                        <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Custom AI Agents</h3>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                            Proprietary
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          Train private agents on your fund's memos, past deals, partner notes and thesis. Evaluate new pitches against your DNA, surface red flags, and rank by fit—not hype.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 sm:p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 bg-card group cursor-pointer">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 rounded-lg bg-blue-700 to-blue-800 group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Automated Due Diligence</h3>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                            Auto-generated
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          Automatically transcribe and summarize pitches, generate structured reports, and ingest data rooms. Convert qualitative conversations into repeatable signals.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 sm:p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 bg-card group cursor-pointer">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 rounded-lg bg-blue-700 to-blue-800 group-hover:scale-110 transition-transform">
                        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Deal Intelligence</h3>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                            Centralized
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          Centralize all deal data, meeting notes, and evaluations. Track deal flow, identify patterns, and make data-driven decisions with complete context.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 sm:p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 bg-card group cursor-pointer">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 rounded-lg bg-gradient-blue group-hover:scale-110 transition-transform">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Enterprise Privacy</h3>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                            Secure
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          Your data stays private. Enterprise privacy controls with on-prem and offline options available. Built for funds that respect confidentiality.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section className="py-12 sm:py-24 px-4 sm:px-6">
              <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                  <div className="space-y-6 sm:space-y-8">
                    <div className="inline-block animate-fade-in">
                      <Badge variant="outline" className="text-xs sm:text-sm font-medium border-primary text-primary px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-primary/10 transition-colors">
                        Technology & Privacy
                      </Badge>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 leading-tight animate-fade-in">
                      Built for security, designed for scale
                    </h2>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed animate-fade-in">
                      Powered by state-of-the-art LLMs and vector embeddings, Advisora converts unstructured conversations into structured, actionable intelligence. Your confidential data never leaves your control.
                    </p>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors group cursor-pointer">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-200">
                          <Server className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-1">On-Premise & Offline Options</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">Deploy on your infrastructure or run completely offline for maximum control</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors group cursor-pointer">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-200">
                          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Enterprise-Grade Security</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">End-to-end encryption, SOC 2 compliance, and granular access controls</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors group cursor-pointer">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-200">
                          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Advanced AI Pipeline</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">Custom fine-tuned models trained on your specific investment criteria</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-2xl p-6 sm:p-8 text-white space-y-4 sm:space-y-6 hover:shadow-2xl transition-shadow mt-8 lg:mt-0">
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm text-white/60">Data Room Connectors</div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {['Dropbox', 'Box', 'Google Drive', 'OneDrive', 'S3'].map((tool) => (
                          <span key={tool} className="px-2 sm:px-3 py-1 bg-white/10 rounded-md text-xs sm:text-sm hover:bg-white/20 transition-colors cursor-pointer">{tool}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm text-white/60">CRM Integrations</div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {['Affinity', 'Salesforce', 'HubSpot', 'Airtable'].map((tool) => (
                          <span key={tool} className="px-2 sm:px-3 py-1 bg-white/10 rounded-md text-xs sm:text-sm hover:bg-white/20 transition-colors cursor-pointer">{tool}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs sm:text-sm text-white/60">AI Models</div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {['GPT-4', 'Claude', 'Custom LLMs', 'Vector DB'].map((tool) => (
                          <span key={tool} className="px-2 sm:px-3 py-1 bg-white/10 rounded-md text-xs sm:text-sm hover:bg-white/20 transition-colors cursor-pointer">{tool}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t border-white/10">
                      <div className="text-xs sm:text-sm text-white/80">
                        Seamlessly connects with your existing workflow. No disruption, pure enhancement.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-24 px-4 sm:px-6">
              <div className="container mx-auto">
                <div className="bg-blue-700 to-blue-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
                  
                  <div className="relative z-10 space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                      Ready to transform your deal screening?
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
                      Join forward-thinking VCs who are cutting evaluation time and improving decision consistency with Advisora's AI OS.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="bg-white hover:bg-white/90 hover:scale-105 text-primary border-white group transition-transform w-full sm:w-auto"
                      >
                        Request Demo
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="lg"
                        className="text-white hover:bg-white/10 hover:scale-105 border border-white/20 transition-transform w-full sm:w-auto"
                      >
                        Schedule Call
                      </Button>
                    </div>
                    
                   
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-border">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                <div className="space-y-3 sm:space-y-4 col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-7 sm:h-7">
                      <path d="M16 4L4 10L16 16L28 10L16 4Z" className="fill-primary"/>
                      <path d="M4 16L16 22L28 16" className="stroke-primary" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M4 22L16 28L28 22" className="stroke-primary" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-base sm:text-lg font-semibold text-charcoal">Advisora</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    AI OS for Venture Capital
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Platform</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Features</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Integrations</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Security</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Pricing</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Company</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">About</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Blog</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Careers</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Contact</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Resources</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Documentation</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">API Reference</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Support</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors hover:underline">Status</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  © 2025 Advisora. All rights reserved.
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground justify-center">
                  <a href="#" className="hover:text-primary transition-colors hover:underline">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors hover:underline">Terms of Service</a>
                  <a href="#" className="hover:text-primary transition-colors hover:underline">Cookie Policy</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Page;
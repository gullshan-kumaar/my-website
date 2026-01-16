import React, { useState } from 'react';
import { generateCreativeBrief } from '../services/geminiService';
import { BriefResult } from '../types';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface IdeationLabProps {
  className?: string;
}

const IdeationLab: React.FC<IdeationLabProps> = ({ className = "bg-surface" }) => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [vibe, setVibe] = useState('Modern & Minimalist');
  const [result, setResult] = useState<BriefResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !industry) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await generateCreativeBrief(businessName, industry, vibe);
      setResult(data);
    } catch (err) {
      setError('Something went wrong. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`py-24 relative overflow-hidden font-light ${className}`}>
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Context */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-5 py-2 mb-8 shadow-sm">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold tracking-wide uppercase text-primary">AI Powered</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-gray-900 leading-tight">
              Test Our Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-700">Brain</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
              Curious how we think? Use our <strong>Ideation Lab</strong>. 
              Enter your business details, and our AI model (simulating our creative directors) will generate an instant mini-brief for you.
            </p>
            
            <form onSubmit={handleGenerate} className="space-y-6 bg-white p-10 rounded-2xl border border-gray-100 shadow-xl">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 text-lg text-gray-900 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all font-light"
                  placeholder="e.g. Acme Co."
                />
              </div>
              
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Industry</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 text-lg text-gray-900 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all font-light"
                  placeholder="e.g. Organic Skincare"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Desired Vibe</label>
                <select
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 text-lg text-gray-900 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none font-light"
                >
                  <option value="Modern & Minimalist">Modern & Minimalist</option>
                  <option value="Bold & Disruptive">Bold & Disruptive</option>
                  <option value="Elegant & Luxury">Elegant & Luxury</option>
                  <option value="Playful & Fun">Playful & Fun</option>
                  <option value="Corporate & Professional">Corporate & Professional</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white hover:bg-primary hover:text-white font-medium py-5 text-lg rounded-lg transition-all transform active:scale-95 flex items-center justify-center shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-3 h-6 w-6" /> Generating Concept...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-6 w-6" /> Generate Brief
                  </>
                )}
              </button>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
          </div>

          {/* Right Column: Result Display */}
          <div className="relative">
            {result ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-10 md:p-12 shadow-2xl animate-fade-in ring-1 ring-black/5">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                  <h3 className="text-3xl font-medium text-gray-900">Your Concept</h3>
                  <button onClick={() => setResult(null)} className="text-sm text-gray-400 hover:text-primary flex items-center transition-colors">
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                  </button>
                </div>

                <div className="space-y-10">
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-primary font-bold mb-3">Recommended Slogan</h4>
                    <p className="text-4xl font-light italic text-black leading-tight">"{result.slogan}"</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h4 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-3">Visual Direction</h4>
                      <p className="text-gray-700 text-base font-light leading-relaxed">{result.visualDirection}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h4 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-3">Strategic Angle</h4>
                      <p className="text-gray-700 text-base font-light leading-relaxed">{result.strategy}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-base mb-4 font-light">Like this direction? Let's make it real.</p>
                    <a href="#contact" className="inline-block text-black border-b border-primary pb-0.5 hover:text-primary transition-colors font-medium text-lg">
                      Book a consultation &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-white p-16 text-center shadow-sm">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 shadow-sm border border-gray-100">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-3">Waiting for input...</h3>
                <p className="text-gray-500 font-light text-lg max-w-sm">
                  Fill out the form on the left to see our AI generate a custom brand concept for you in seconds.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeationLab;
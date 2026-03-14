const { useState, useEffect, useRef } = React;

// --- Icons ---
const IconArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const IconBot = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16.01"/><line x1="16" x2="16" y1="16" y2="16.01"/></svg>;
const IconServer = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>;
const IconCommand = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>;
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const IconMessage = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const IconStar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconTwitter = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const IconLinkedIn = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;

// --- Galaxy Background Component ---
const GalaxyBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Create stars/particles
    for (let i = 0; i < 400; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        density: (Math.random() * 30) + 1,
        color: `rgba(${150 + Math.random()*105}, ${100 + Math.random()*155}, 255, ${Math.random()})`
      });
    }

    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a subtle nebula glow
      const gp = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/1.5);
      gp.addColorStop(0, 'rgba(30, 10, 60, 0.4)');
      gp.addColorStop(1, 'rgba(10, 10, 15, 0.8)');
      ctx.fillStyle = gp;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // Parallax/Interactive movement
        p.y -= 0.2; // slow drift up
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        // Mouse interaction
        if (mouse.x) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            p.x -= dx / p.density;
            p.y -= dy / p.density;
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};


// --- Components ---

const Button = ({ children, primary = true, onClick }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer";
  const primaryClasses = "bg-gradient-glow text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] border border-transparent";
  const secondaryClasses = "bg-brand-card/50 backdrop-blur text-gray-200 border border-brand-accent/30 hover:bg-brand-accent/20";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}>
      {children}
    </button>
  );
};

// --- Booking Modal ---
const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate some dummy dates covering the next week
  const dates = Array.from({length: 5}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split('T')[0];
  });

  const slots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const handleBooking = (e) => {
    e.preventDefault();
    setStep(3); // Success step
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-brand-card border border-brand-accent/30 rounded-3xl w-full max-w-xl p-8 relative z-10 shadow-2xl animate-fade-in">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white"><IconX /></button>
        
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-2">Book a 30-Min Consultation</h2>
            <p className="text-gray-400 mb-8">Select a date and time to discuss your vision.</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Date</label>
              <div className="flex flex-wrap gap-2">
                {dates.map(d => (
                  <button 
                    key={d} 
                    onClick={() => setSelectedDate(d)}
                    className={`px-4 py-2 rounded-xl text-sm border ${selectedDate === d ? 'bg-brand-accent text-white border-brand-accent' : 'border-white/10 hover:border-brand-accent/50 text-gray-300'}`}
                  >
                    {new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'})}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-400 mb-2">Select Time (30 min slots)</label>
                <div className="grid grid-cols-3 gap-2 mb-8">
                  {slots.map(t => (
                    <button 
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`px-4 py-2 rounded-xl text-sm border ${selectedTime === t ? 'bg-brand-accent text-white border-brand-accent' : 'border-white/10 hover:border-brand-accent/50 text-gray-300'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={() => setStep(2)} primary={true}>Continue</Button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleBooking} className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Your Details</h2>
            <p className="text-gray-400 mb-6">Booking for {selectedDate} at {selectedTime}</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="jane@example.com" />
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(1)} primary={false}>Back</Button>
              <Button primary={true}>Confirm Booking <IconArrowRight/></Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-gray-400 mb-8">We've sent a calendar invite to your email for {selectedDate} at {selectedTime}. We look forward to meeting you.</p>
            <Button onClick={onClose} primary={false}>Close Window</Button>
          </div>
        )}
      </div>
    </div>
  );
};


const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am the Flowlyweb AI assistant. Looking to scale your agency operations?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Simulate API call to LLM Endpoint
    // TODO: Replace with fetch('https://api.openai.com/...
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "That's a great question! Our intelligent infrastructure automatically handles that via our AI proxy layer. Would you like to book a consultation to see a live demo?" 
      }]);
    }, 1500);
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="animate-fade-in origin-bottom-right mb-4 w-80 h-96 bg-brand-card/95 backdrop-blur-xl border border-brand-accent/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-brand-accent to-brand-glow p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2 font-semibold">
              <IconBot />
              Flowly AI
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/20 p-1 rounded-full bg-transparent transition-colors"><IconX /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-accent/30 self-end rounded-br-sm text-white' : 'bg-black/50 border border-white/5 text-gray-200 self-start rounded-bl-sm'}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[80%] p-3 rounded-xl text-sm bg-black/50 border border-white/5 text-gray-400 self-start rounded-bl-sm flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200"></div>
              </div>
            )}
          </div>
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..." 
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 text-sm focus:outline-none focus:border-brand-accent text-white transition-colors" 
            />
            <button type="submit" className="bg-brand-accent hover:bg-brand-glow p-2 rounded-lg text-white transition-colors">
              <IconArrowRight />
            </button>
          </form>
        </div>
      )}
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-brand-accent hover:bg-brand-glow text-white p-4 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-transform hover:scale-110 flex items-center justify-center animate-fade-in"
        >
          <IconMessage />
        </button>
      )}
    </div>
  );
};

const Navbar = ({ onBookClick }) => (
  <nav className="flex items-center justify-between py-6 px-8 max-w-7xl mx-auto border-b border-white/5 relative z-10 w-full animate-fade-in opacity-0" style={{animationFillMode: 'forwards'}}>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-glow flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] text-xl">F</div>
      <span className="text-2xl font-bold tracking-tight text-white">Flowlyweb</span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
      <a href="#hero" className="hover:text-brand-accent transition-colors">Home</a>
      <a href="#features" className="hover:text-brand-accent transition-colors">Features</a>
      <a href="#testimonials" className="hover:text-brand-accent transition-colors">Testimonials</a>
      <a href="#team" className="hover:text-brand-accent transition-colors">Our Team</a>
    </div>
    <div className="hidden md:block">
      <Button onClick={onBookClick}>Book Free Consultation</Button>
    </div>
  </nav>
);

const Hero = ({ onBookClick }) => (
  <section id="hero" className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-8 z-10">
    <div className="flex flex-col items-center gap-6 animate-fade-in max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium shadow-[0_0_20px_rgba(139,92,246,0.15)]">
        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
        Next-Generation AI Web Design
      </div>
      <h1 className="text-5xl md:text-8xl font-extrabold leading-tight tracking-tight">
        Websites That <br/>
        <span className="text-gradient">Drive Results.</span>
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
        We build stunning, intelligent websites hosted and continually optimized by AI. Stand out from the crowd and convert more visitors into loyal customers.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button onClick={onBookClick}>
          Book a Free Consultation <IconArrowRight />
        </Button>
        <Button primary={false} onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})}>
          Explore Features
        </Button>
      </div>
    </div>
  </section>
);

const Features = () => {
  const cards = [
    {
      icon: <IconBot />,
      title: "AI Chat Integration",
      desc: "Every website includes a custom-trained AI assistant to help your visitors instantly 24/7."
    },
    {
      icon: <IconServer />,
      title: "Fully Hosted & Managed",
      desc: "We host your site on our enterprise cloud. No complex servers or cPanels to configure ever again."
    },
    {
      icon: <IconCode />,
      title: "Monthly Maintenance",
      desc: "Say goodbye to broken plugins. We update, secure, and monitor your code automatically every month."
    },
    {
      icon: <IconCommand />,
      title: "Custom Integrations",
      desc: "Connect your CRM, email marketing, or inventory directly into your blazing fast frontend."
    }
  ];

  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Value Beyond the Build</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">We don't just hand over a file. You get a fully managed technological engine designed to generate revenue.</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="group p-8 rounded-3xl bg-brand-card/60 backdrop-blur-md border border-white/5 hover:border-brand-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.2)]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-glow/10 flex items-center justify-center text-brand-glow mb-6 group-hover:scale-110 transition-transform duration-500 border border-brand-accent/20">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Founder, Luxe Cosmetics",
      text: "Flowlyweb completely revolutionized our online presence. Our engagement went up 400% within the first month, and the AI chat captures leads for us while we sleep. Worth every penny.",
      metrics: "+400% Engagement"
    },
    {
      name: "Marcus Thorne",
      role: "CEO, Thorne Real Estate",
      text: "We used to lose clients because our old site was slow and confusing. Since Flowlyweb took over our hosting and design, our client bookings have literally tripled. It's like magic.",
      metrics: "3x Client Bookings"
    },
    {
      name: "Elena Rodriguez",
      role: "Owner, Cloud9 Boutique",
      text: "The monthly maintenance is a lifesaver. I don't know anything about code, and with Flowlyweb, I don't have to. The website is beautiful and always runs perfectly.",
      metrics: "0 Downtime"
    }
  ];

  return (
    <section id="testimonials" className="py-24 border-y border-white/5 bg-black/40 relative z-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Proof is in the <span className="text-gradient">Performance</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Real numbers from businesses that scaled with our infrastructure.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-brand-card border border-white/10 relative">
              <div className="flex gap-1 mb-6">
                <IconStar /><IconStar /><IconStar /><IconStar /><IconStar />
              </div>
              <p className="text-gray-300 italic mb-8 leading-relaxed">"{rev.text}"</p>
              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="font-bold text-white">{rev.name}</p>
                <p className="text-sm text-brand-accent mt-1">{rev.role}</p>
                <div className="inline-block mt-4 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/20">
                  {rev.metrics}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-24 max-w-7xl mx-auto px-8 relative z-10">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered by <br/><span className="text-gradient">Experts</span></h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            We aren't just template editors. Flowlyweb is operated by a team of graduated engineering students and brilliant interns who understand the deep architecture of the web.
          </p>
          <p className="text-gray-400 leading-relaxed">
            By combining rigorous software engineering practices with cutting-edge AI utility, we write custom, performant code that scales beautifully instead of dragging your business down.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="border-l-2 border-brand-accent pl-4">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-500">Custom Code</div>
            </div>
            <div className="border-l-2 border-brand-glow pl-4">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-500">Monitoring System</div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-glow rounded-3xl blur-3xl opacity-20"></div>
          <div className="relative bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-glow"></div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-brand-accent/20 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xl font-bold">AL</div>
                <div>
                  <h4 className="font-bold text-lg">Alex L.</h4>
                  <p className="text-brand-accent text-sm">Lead Software Engineer (B.S. CS)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-brand-accent/20 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">MR</div>
                <div>
                  <h4 className="font-bold text-lg">Maria R.</h4>
                  <p className="text-brand-accent text-sm">Front-end Architect</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-brand-accent/20 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-xl font-bold">JD</div>
                <div>
                  <h4 className="font-bold text-lg">James D.</h4>
                  <p className="text-brand-accent text-sm">AI Integration Intern</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = ({ onBookClick }) => (
  <section className="py-24 px-8 max-w-5xl mx-auto w-full relative z-10">
    <div className="relative rounded-3xl overflow-hidden px-8 py-20 text-center shadow-[0_0_50px_rgba(236,72,153,0.15)] bg-brand-card/50 backdrop-blur-md border border-white/10">
      <div className="absolute inset-0 bg-gradient-glow opacity-10"></div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">Ready to see the future<br/>of your business?</h2>
        <p className="text-gray-300 mb-10 max-w-xl text-lg">Let's discuss your vision over a quick phone call and discover how Flowlyweb can transform your digital presence.</p>
        <Button onClick={onBookClick}>Book a Free Consultation <IconArrowRight /></Button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/5 bg-black/50 py-12 relative z-10 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-glow flex items-center justify-center font-bold text-white shadow-sm">F</div>
        <span className="text-xl font-bold text-white">Flowlyweb</span>
      </div>
      <div className="flex gap-6 text-sm text-gray-500">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
      <div className="flex gap-4 text-gray-500">
        <a href="#" className="hover:text-brand-accent transition-colors"><IconTwitter /></a>
        <a href="#" className="hover:text-brand-accent transition-colors"><IconLinkedIn /></a>
      </div>
      <p className="text-sm text-gray-600">© 2026 Flowlyweb Agency. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <GalaxyBackground />
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <Hero onBookClick={() => setIsBookingOpen(true)} />
      <Features />
      <Testimonials />
      <Team />
      <CTA onBookClick={() => setIsBookingOpen(true)} />
      <Footer />
      <AIChatBox />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

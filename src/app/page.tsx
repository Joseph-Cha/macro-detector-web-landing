"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Eye,
  Ban,
  Settings,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  Gauge,
  Layers,
  ChevronDown,
  Terminal,
  Smartphone,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect, useMemo } from "react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Floating particles component - client-only to avoid hydration mismatch
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  // Generate stable random values on client only
  const particles = useMemo(() => {
    if (typeof window === "undefined") return [];
    return [...Array(20)].map((_, i) => ({
      id: i,
      background:
        i % 3 === 0
          ? "#00f0ff"
          : i % 3 === 1
            ? "#ff00e5"
            : "#00ff88",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: particle.background,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

// Detection Mode Card
function ModeCard({
  mode,
  title,
  description,
  icon: Icon,
  color,
  features,
}: {
  mode: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: string[];
}) {
  const colorStyles: Record<
    string,
    { glow: string; border: string; bg: string; text: string }
  > = {
    cyan: {
      glow: "box-glow-cyan",
      border: "border-[#00f0ff]/30",
      bg: "bg-[#00f0ff]/10",
      text: "text-[#00f0ff]",
    },
    magenta: {
      glow: "box-glow-magenta",
      border: "border-[#ff00e5]/30",
      bg: "bg-[#ff00e5]/10",
      text: "text-[#ff00e5]",
    },
    green: {
      glow: "box-glow-green",
      border: "border-[#00ff88]/30",
      bg: "bg-[#00ff88]/10",
      text: "text-[#00ff88]",
    },
  };

  const styles = colorStyles[color];

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative p-6 rounded-xl backdrop-blur-sm ${styles.border} border bg-[#0a0a14]/60 ${styles.glow} transition-all duration-300 group`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" />

      <div className={`inline-flex p-3 rounded-lg ${styles.bg} mb-4`}>
        <Icon className={`w-6 h-6 ${styles.text}`} />
      </div>

      <Badge
        variant="outline"
        className={`${styles.text} ${styles.border} mb-3 font-mono text-xs`}
      >
        {mode}
      </Badge>

      <h3 className="text-xl font-semibold mb-2 font-display">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        {description}
      </p>

      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2 className={`w-4 h-4 ${styles.text}`} />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// Stat Card
function StatCard({
  value,
  label,
  icon: Icon,
  suffix = "",
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  suffix?: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="relative p-6 rounded-xl border border-[#00f0ff]/20 bg-[#0a0a14]/40 backdrop-blur-sm text-center group hover:border-[#00f0ff]/40 transition-colors"
    >
      <Icon className="w-8 h-8 mx-auto mb-3 text-[#00f0ff] opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="text-4xl font-bold font-display glow-cyan mb-1">
        {value}
        <span className="text-xl">{suffix}</span>
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

// Architecture Node
function ArchNode({
  label,
  sublabel,
  color,
}: {
  label: string;
  sublabel?: string;
  color: string;
}) {
  const colors: Record<string, string> = {
    cyan: "border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff]",
    magenta: "border-[#ff00e5]/50 bg-[#ff00e5]/10 text-[#ff00e5]",
    green: "border-[#00ff88]/50 bg-[#00ff88]/10 text-[#00ff88]",
  };

  return (
    <div
      className={`px-4 py-2 rounded-lg border ${colors[color]} font-mono text-sm`}
    >
      <div className="font-semibold">{label}</div>
      {sublabel && (
        <div className="text-xs opacity-70 mt-0.5">{sublabel}</div>
      )}
    </div>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen noise-overlay">
      {/* Background Effects */}
      <div className="fixed inset-0 cyber-grid opacity-40" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)",
          y: backgroundY,
        }}
      />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(255, 0, 229, 0.08) 0%, transparent 40%)",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#050508]/80 border-b border-[#00f0ff]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-[#00f0ff]" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Shield className="w-8 h-8 text-[#00f0ff]" />
              </div>
            </div>
            <span className="font-display text-lg font-bold tracking-wider">
              JC <span className="text-[#00f0ff]">Security Store</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a
              href="#features"
              className="text-muted-foreground hover:text-[#00f0ff] transition-colors"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="text-muted-foreground hover:text-[#00f0ff] transition-colors"
            >
              Architecture
            </a>
            <a
              href="#integration"
              className="text-muted-foreground hover:text-[#00f0ff] transition-colors"
            >
              Integration
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <FloatingParticles />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            <span className="block">Real-time</span>
            <span className="gradient-text glitch-text">Macro Detection</span>
            <span className="block text-3xl md:text-4xl mt-2 font-normal text-muted-foreground">
              for Mobile Games
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A security solution that analyzes Android MotionEvent data in real-time
            to detect macros, auto-clickers, and automation tools while protecting
            game integrity.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://u3d.as/3DvJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#00f0ff] text-black hover:bg-[#00f0ff]/90 font-semibold px-8 cyber-button group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#00ff88]" />
              Android API 21+
            </div>
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-[#00f0ff]" />
              Unity 2021.3+
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#ff00e5]" />
              Obfuscated
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-[#00f0ff]/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <StatCard
              value="99"
              suffix="%+"
              label="Detection Rate"
              icon={Target}
            />
            <StatCard
              value="<1"
              suffix="ms"
              label="Frame Overhead"
              icon={Gauge}
            />
            <StatCard
              value="<1"
              suffix="%"
              label="False Positives"
              icon={Shield}
            />
            <StatCard value="10" suffix="min" label="Integration" icon={Clock} />
          </motion.div>
        </div>
      </section>

      {/* Features/Modes Section */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-4 border-[#ff00e5]/30 text-[#ff00e5] font-mono"
              >
                Detection Modes
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              Three <span className="text-[#00f0ff]">Response Modes</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Flexible response strategies to balance game security and user
              experience for any situation.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            <ModeCard
              mode="detect"
              title="Passive Monitoring"
              description="Only detects and fires events. Ideal for analysis and monitoring purposes."
              icon={Eye}
              color="cyan"
              features={[
                "Real-time event logging",
                "Server-side analytics",
                "User behavior pattern collection",
              ]}
            />
            <ModeCard
              mode="block"
              title="Active Protection"
              description="Displays a warning and safely terminates the app when macros are detected. Recommended for production."
              icon={Ban}
              color="magenta"
              features={[
                "Custom warning UI",
                "Configurable delay (0-10s)",
                "Safe app termination",
              ]}
            />
            <ModeCard
              mode="none"
              title="Development Mode"
              description="Disables all detection features. Use this for development and testing environments."
              icon={Settings}
              color="green"
              features={[
                "Complete detection bypass",
                "Development optimized",
                "Easy debugging",
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section
        id="architecture"
        className="relative py-24 px-6 bg-gradient-to-b from-transparent via-[#0a0a14]/50 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-4 border-[#00ff88]/30 text-[#00ff88] font-mono"
              >
                System Architecture
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              Modular <span className="text-[#ff00e5]">Architecture</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Clear separation of concerns and extensible design for easy
              maintenance and customization.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative p-8 rounded-2xl border border-[#00f0ff]/20 bg-[#0a0a14]/60 backdrop-blur-sm"
          >
            {/* Architecture Diagram */}
            <div className="flex flex-col items-center gap-4">
              {/* Unity Layer */}
              <div className="w-full p-6 rounded-xl border border-[#00f0ff]/30 bg-[#00f0ff]/5">
                <div className="text-center mb-4 font-display text-[#00f0ff] font-semibold">
                  Unity Application Layer
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <ArchNode
                    label="MacroDetector"
                    sublabel="Main Class"
                    color="cyan"
                  />
                  <ArchNode
                    label="MotionEventDetector"
                    sublabel="MonoBehaviour"
                    color="cyan"
                  />
                  <ArchNode
                    label="SecurityWarningDisplay"
                    sublabel="Warning UI"
                    color="cyan"
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-[#ff00e5]">
                <div className="w-px h-8 bg-gradient-to-b from-[#00f0ff] to-[#ff00e5]" />
              </div>

              {/* Bridge Layer */}
              <div className="w-full max-w-md p-6 rounded-xl border border-[#ff00e5]/30 bg-[#ff00e5]/5">
                <div className="text-center font-display text-[#ff00e5] font-semibold mb-4">
                  Bridge Layer
                </div>
                <div className="flex justify-center">
                  <ArchNode
                    label="UnityWindowCallback"
                    sublabel="AndroidJavaProxy"
                    color="magenta"
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-[#00ff88]">
                <div className="w-px h-8 bg-gradient-to-b from-[#ff00e5] to-[#00ff88]" />
              </div>

              {/* Android Layer */}
              <div className="w-full max-w-sm p-6 rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/5">
                <div className="text-center font-display text-[#00ff88] font-semibold mb-4">
                  Android Native Layer
                </div>
                <div className="flex justify-center">
                  <ArchNode
                    label="Window.Callback"
                    sublabel="dispatchTouchEvent"
                    color="green"
                  />
                </div>
              </div>
            </div>

            {/* Module Cards */}
            <div className="grid md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#00f0ff]/10">
              {[
                {
                  name: "MacroDetector.Base",
                  size: "4 KB",
                  desc: "Common type definitions",
                },
                {
                  name: "MacroDetector.Settings",
                  size: "4.6 KB",
                  desc: "Configuration management",
                },
                {
                  name: "MacroDetector.SDK",
                  size: "31.2 KB",
                  desc: "Core detection logic",
                },
                {
                  name: "MacroDetector.Editor",
                  size: "~10 KB",
                  desc: "Editor extensions",
                },
              ].map((module) => (
                <div
                  key={module.name}
                  className="p-4 rounded-lg border border-[#00f0ff]/10 bg-[#050508]/50 hover:border-[#00f0ff]/30 transition-colors"
                >
                  <div className="font-mono text-sm text-[#00f0ff] mb-1">
                    {module.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {module.desc}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 opacity-60">
                    {module.size}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Section */}
      <section id="integration" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-4 border-[#00f0ff]/30 text-[#00f0ff] font-mono"
              >
                Quick Start
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              Integrate in <span className="text-[#00ff88]">30 Minutes</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Add security features to your game quickly with a simple API and
              automatic configuration.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Code Example */}
            <div className="code-block p-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
                <span className="font-mono text-sm text-muted-foreground">
                  GameManager.cs
                </span>
              </div>
              <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-[#ff00e5]">using</span>{" "}
                  <span className="text-[#00ff88]">MacroDetector.SDK</span>;
                  {"\n"}
                  <span className="text-[#ff00e5]">using</span>{" "}
                  <span className="text-[#00ff88]">UnityEngine</span>;{"\n"}
                  {"\n"}
                  <span className="text-[#ff00e5]">public class</span>{" "}
                  <span className="text-[#00f0ff]">GameManager</span> :{" "}
                  <span className="text-[#00ff88]">MonoBehaviour</span>
                  {"\n"}
                  {"{"} {"\n"}
                  {"    "}
                  <span className="text-[#ff00e5]">private</span> MacroDetector
                  detector;{"\n"}
                  {"\n"}
                  {"    "}
                  <span className="text-[#ff00e5]">void</span>{" "}
                  <span className="text-[#00f0ff]">Start</span>(){"\n"}
                  {"    "}
                  {"{"} {"\n"}
                  {"        "}
                  <span className="text-muted-foreground">
                    // Initialize detector
                  </span>
                  {"\n"}
                  {"        "}detector ={" "}
                  <span className="text-[#ff00e5]">new</span>{" "}
                  <span className="text-[#00f0ff]">MacroDetector</span>();{"\n"}
                  {"\n"}
                  {"        "}
                  <span className="text-muted-foreground">
                    // Subscribe to detection events
                  </span>
                  {"\n"}
                  {"        "}detector.
                  <span className="text-[#00f0ff]">MacroDetected</span> +=
                  OnMacroDetected;{"\n"}
                  {"\n"}
                  {"        "}
                  <span className="text-muted-foreground">
                    // Start monitoring
                  </span>
                  {"\n"}
                  {"        "}detector.
                  <span className="text-[#00f0ff]">Start</span>();{"\n"}
                  {"    "}
                  {"}"} {"\n"}
                  {"\n"}
                  {"    "}
                  <span className="text-[#ff00e5]">void</span>{" "}
                  <span className="text-[#00f0ff]">OnMacroDetected</span>(
                  <span className="text-[#00ff88]">object</span> sender,{"\n"}
                  {"        "}
                  <span className="text-[#00ff88]">
                    MacroDetectedEventArgs
                  </span>{" "}
                  e){"\n"}
                  {"    "}
                  {"{"} {"\n"}
                  {"        "}Debug.
                  <span className="text-[#00f0ff]">Log</span>(
                  <span className="text-[#ff6b00]">
                    $&quot;Macro detected! Action: {"{"}e.Action{"}"}&quot;
                  </span>
                  );{"\n"}
                  {"        "}
                  <span className="text-muted-foreground">
                    // Send to server, apply sanctions, etc.
                  </span>
                  {"\n"}
                  {"    "}
                  {"}"} {"\n"}
                  {"}"}
                </code>
              </pre>
            </div>

            {/* Integration Steps */}
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Copy DLL Files",
                  desc: "Copy MacroDetector DLL files to your Plugins folder",
                },
                {
                  step: "02",
                  title: "Create Settings Asset",
                  desc: "Run Tools > MacroDetector > Create Settings Asset menu",
                },
                {
                  step: "03",
                  title: "Configure Response Mode",
                  desc: "Select detect/block/none mode in the Inspector",
                },
                {
                  step: "04",
                  title: "Integrate Code",
                  desc: "Initialize MacroDetector in your game start script",
                },
                {
                  step: "05",
                  title: "Build & Test",
                  desc: "Test detection features on an Android device",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl border border-[#00f0ff]/10 bg-[#0a0a14]/40 hover:border-[#00f0ff]/30 transition-colors group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#00f0ff]/20 to-[#ff00e5]/20 flex items-center justify-center font-display text-[#00f0ff] font-bold group-hover:from-[#00f0ff]/30 group-hover:to-[#ff00e5]/30 transition-colors">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent via-[#0a0a14]/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-4 border-[#ff3366]/30 text-[#ff3366] font-mono"
              >
                Security
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              Enterprise-Grade <span className="text-[#ff3366]">Security</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Lock,
                title: "Code Obfuscation",
                desc: "DLL obfuscation via Obfuscar",
              },
              {
                icon: Cpu,
                title: "String Protection",
                desc: "Critical string encryption",
              },
              {
                icon: Layers,
                title: "Memory Protection",
                desc: "Safe AndroidJavaProxy cleanup",
              },
              {
                icon: Shield,
                title: "Anti-Reversing",
                desc: "Core detection logic protection",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="p-6 rounded-xl border border-[#ff3366]/20 bg-[#0a0a14]/40 backdrop-blur-sm text-center hover:border-[#ff3366]/40 transition-colors group"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-[#ff3366] opacity-70 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleIn}
              className="inline-block p-8 rounded-2xl gradient-border mb-8"
            >
              <Shield className="w-16 h-16 text-[#00f0ff] mx-auto animate-pulse-glow" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-display font-bold mb-6"
            >
              <span className="gradient-text">Strengthen</span> Your Game Security
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg max-w-xl mx-auto mb-10"
            >
              Protect your game from macros and automation tools with MacroDetector
              and create a fair play environment.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://u3d.as/3DvJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#00f0ff] to-[#ff00e5] text-black hover:opacity-90 font-semibold px-10 cyber-button"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-[#00f0ff]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#00f0ff]" />
              <span className="font-display text-sm font-bold tracking-wider">
                JC <span className="text-[#00f0ff]">Security Store</span>
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Macro Detection SDK for Unity Android Games
            </div>

            <span className="text-sm text-muted-foreground">
              © 2025 JC Security Store
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

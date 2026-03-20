"use client";
import { useState, useEffect } from "react";

const SEGMENTS = ["Moving & Storage", "Restoration", "Self-Storage", "Industrial / Fulfillment"];

const PRODUCTS = {
    "Moving & Storage": [
      { id: "mattress_bags", name: "Mattress Bags (Queen)", unit: "per bag", uline: 3.85, fair: 2.10, category: "Protection" },
      { id: "stretch_wrap", name: "Stretch Wrap (18\" x 1500')", unit: "per roll", uline: 14.50, fair: 8.75, category: "Wrap" },
      { id: "tape", name: "Packing Tape (2\" x 110yd)", unit: "per roll", uline: 2.10, fair: 1.10, category: "Tape" },
      { id: "dish_pack", name: "Dish Pack Boxes (18x18x28)", unit: "per box", uline: 5.95, fair: 3.40, category: "Boxes" },
      { id: "wardrobe_box", name: "Wardrobe Boxes (24x21x46)", unit: "per box", uline: 12.50, fair: 7.20, category: "Boxes" },
      { id: "bubble_wrap", name: "Bubble Wrap (12\" x 100')", unit: "per roll", uline: 18.75, fair: 10.50, category: "Protection" },
        ],
    "Restoration": [
      { id: "poly_sheeting", name: "Poly Sheeting (10mil 20x100)", unit: "per roll", uline: 89.00, fair: 52.00, category: "Containment" },
      { id: "stretch_wrap", name: "Stretch Wrap (18\" x 1500')", unit: "per roll", uline: 14.50, fair: 8.75, category: "Wrap" },
      { id: "tape", name: "Packing Tape (2\" x 110yd)", unit: "per roll", uline: 2.10, fair: 1.10, category: "Tape" },
      { id: "mattress_bags", name: "Mattress Bags (Queen)", unit: "per bag", uline: 3.85, fair: 2.10, category: "Protection" },
      { id: "corrugated_rolls", name: "Corrugated Rolls (48\"x25')", unit: "per roll", uline: 32.50, fair: 19.00, category: "Cushioning" },
      { id: "moving_blankets", name: "Moving Blankets (80\"x72\")", unit: "per dozen", uline: 82.00, fair: 54.00, category: "Protection" },
        ],
    "Self-Storage": [
      { id: "mattress_bags", name: "Mattress Bags (Queen)", unit: "per bag", uline: 3.85, fair: 2.10, category: "Protection" },
      { id: "stretch_wrap", name: "Stretch Wrap (18\" x 1500')", unit: "per roll", uline: 14.50, fair: 8.75, category: "Wrap" },
      { id: "tape", name: "Packing Tape (2\" x 110yd)", unit: "per roll", uline: 2.10, fair: 1.10, category: "Tape" },
      { id: "small_box", name: "Small Moving Box (16x12x12)", unit: "per box", uline: 1.85, fair: 0.98, category: "Boxes" },
      { id: "medium_box", name: "Medium Moving Box (18x18x16)", unit: "per box", uline: 2.45, fair: 1.35, category: "Boxes" },
      { id: "large_box", name: "Large Moving Box (18x18x24)", unit: "per box", uline: 3.10, fair: 1.72, category: "Boxes" },
        ],
    "Industrial / Fulfillment": [
      { id: "stretch_wrap", name: "Stretch Wrap (18\" x 1500')", unit: "per roll", uline: 14.50, fair: 8.75, category: "Wrap" },
      { id: "tape", name: "Packing Tape (2\" x 110yd)", unit: "per roll", uline: 2.10, fair: 1.10, category: "Tape" },
      { id: "poly_bags", name: "Poly Bags (12x15 2mil)", unit: "per 1,000", uline: 28.50, fair: 16.00, category: "Bags" },
      { id: "corrugated_rolls", name: "Corrugated Rolls (48\"x25')", unit: "per roll", uline: 32.50, fair: 19.00, category: "Cushioning" },
      { id: "foam_wrap", name: "Foam Wrap (12\"x250')", unit: "per roll", uline: 24.75, fair: 14.50, category: "Cushioning" },
      { id: "pallet_wrap", name: "Machine Stretch Film (20\" x 5000')", unit: "per roll", uline: 19.50, fair: 11.25, category: "Wrap" },
        ],
};

const fmt = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtDec = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export default function Calculator() {
    const [segment, setSegment] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [frequency, setFrequency] = useState("monthly");
    const [step, setStep] = useState("segment");
    const [showLead, setShowLead] = useState(false);
    const [lead, setLead] = useState({ name: "", company: "", email: "" });
    const [submitted, setSubmitted] = useState(false);
    const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
        setTimeout(() => setAnimIn(true), 50);
  }, [step]);

  const products = segment ? PRODUCTS[segment] : [];
    const totalUline = products.reduce((sum, p) => sum + (quantities[p.id] || 0) * p.uline, 0);
    const totalFair = products.reduce((sum, p) => sum + (quantities[p.id] || 0) * p.fair, 0);
    const savings = totalUline - totalFair;
    const multiplier = frequency === "monthly" ? 12 : 1;
    const annualSavings = savings * multiplier;
    const savingsPct = totalUline > 0 ? Math.round((savings / totalUline) * 100) : 0;

  const handleSegment = (s) => {
        setSegment(s);
        setQuantities({});
        setAnimIn(false);
        setTimeout(() => setStep("calculator"), 100);
  };

  const hasQty = Object.values(quantities).some(v => v > 0);

  return (
        <div style={{
                minHeight: "100vh",
                background: "#0a0a0a",
                fontFamily: "'DM Mono', 'Courier New', monospace",
                color: "#f0ece4",
                padding: "0",
                overflowX: "hidden",
        }}>
                <div style={{
                  borderBottom: "1px solid #222",
                  padding: "18px 32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#0a0a0a",
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                      <div style={{
                      width: 32, height: 32,
                      background: "#c8f060",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, fontSize: 14, color: "#0a0a0a",
                      letterSpacing: "-0.5px",
        }}>CL</div>div>
                                      <span style={{ fontSize: 13, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase" }}>
                                                    CanopyLink
                                      </span>span>
                          </div>div>
                          <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.08em" }}>
                                      BETA · EAST OF THE MISSISSIPPI
                          </div>div>
                </div>div>

                <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 24px 80px" }}>
                  {step === "segment" && (
                    <div style={{ opacity: animIn ? 1 : 0, transform: animIn ? "none" : "translateY(16px)", transition: "all 0.4s ease" }}>
                                  <div style={{ marginBottom: 48 }}>
                                                  <div style={{
                                      display: "inline-block",
                                      background: "#c8f060",
                                      color: "#0a0a0a",
                                      fontSize: 10,
                                      fontWeight: 700,
                                      letterSpacing: "0.2em",
                                      textTransform: "uppercase",
                                      padding: "4px 10px",
                                      marginBottom: 20,
                    }}>Free Tool</div>div>
                                                  <h1 style={{
                                      fontSize: "clamp(32px, 6vw, 58px)",
                                      fontFamily: "'DM Serif Display', Georgia, serif",
                                      fontWeight: 400,
                                      lineHeight: 1.05,
                                      margin: "0 0 20px",
                                      color: "#f0ece4",
                    }}>
                                                                    You're probably<br />
                                                                    <span style={{ color: "#c8f060" }}>overpaying.</span>span><br />
                                                                    Let's find out by how much.
                                                  </h1>h1>
                                                  <p style={{ fontSize: 15, color: "#888", lineHeight: 1.65, maxWidth: 480, margin: 0 }}>
                                                                    Compare what you're paying Uline to fair market pricing for secondary packaging — by segment, by SKU, by real volume.
                                                  </p>p>
                                  </div>div>

                                  <div style={{ marginBottom: 12, fontSize: 11, letterSpacing: "0.14em", color: "#555", textTransform: "uppercase" }}>
                                                  Select your business type
                                  </div>div>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    {SEGMENTS.map(s => (
                                      <button key={s} onClick={() => handleSegment(s)} style={{
                                                          background: "#111",
                                                          border: "1px solid #2a2a2a",
                                                          color: "#f0ece4",
                                                          padding: "20px 20px",
                                                          textAlign: "left",
                                                          cursor: "pointer",
                                                          fontSize: 14,
                                                          fontFamily: "inherit",
                                                          letterSpacing: "0.02em",
                                                          transition: "all 0.15s ease",
                                                          borderRadius: 2,
                                      }}
                                                          onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8f060"; e.currentTarget.style.background = "#141414"; }}
                                                          onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.background = "#111"; }}
                                                        >
                                                        <div style={{ marginBottom: 6, fontSize: 18 }}>
                                                          {s === "Moving & Storage" ? "📦" : s === "Restoration" ? "🔧" : s === "Self-Storage" ? "🏢" : "🏭"}
                                                        </div>div>
                                        {s}
                                      </button>button>
                                    ))}
                                  </div>div>
                    
                                <div style={{
                                    marginTop: 48,
                                    padding: "20px",
                                    border: "1px solid #1e1e1e",
                                    background: "#111",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 20,
                    }}>
                                  {[
                                      ["60+", "years in secondary packaging"],
                                      ["4", "DCs east of the Mississippi"],
                                      ["$0", "to find out what you should pay"],
                                    ].map(([num, label]) => (
                                                      <div key={num} style={{ textAlign: "center" }}>
                                                                        <div style={{ fontSize: 22, fontFamily: "'DM Serif Display', Georgia, serif", color: "#c8f060", marginBottom: 4 }}>{num}</div>div>
                                                                        <div style={{ fontSize: 11, color: "#666", lineHeight: 1.4 }}>{label}</div>div>
                                                      </div>div>
                                                    ))}
                                </div>div>
                    </div>div>
                        )}
                
                  {step === "calculator" && (
                    <div style={{ opacity: animIn ? 1 : 0, transform: animIn ? "none" : "translateY(16px)", transition: "all 0.4s ease" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                                              <button onClick={() => { setAnimIn(false); setTimeout(() => setStep("segment"), 100); }}
                                                                style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13, fontFamily: "inherit", padding: 0 }}>
                                                              ← Back
                                              </button>button>
                                              <div style={{ width: 1, height: 16, background: "#2a2a2a" }} />
                                              <span style={{ fontSize: 13, color: "#c8f060", letterSpacing: "0.06em" }}>{segment}</span>span>
                                </div>div>
                    
                                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: 28, margin: "0 0 8px", color: "#f0ece4" }}>
                                              Enter your typical order quantities
                                </h2>h2>
                                <p style={{ color: "#666", fontSize: 13, margin: "0 0 28px" }}>
                                              Use your most recent order as a reference.
                                </p>p>
                    
                                <div style={{ display: "flex", gap: 0, marginBottom: 28, width: "fit-content", border: "1px solid #2a2a2a" }}>
                                  {["monthly", "annually"].map(f => (
                                      <button key={f} onClick={() => setFrequency(f)} style={{
                                                          padding: "8px 20px",
                                                          background: frequency === f ? "#c8f060" : "transparent",
                                                          color: frequency === f ? "#0a0a0a" : "#666",
                                                          border: "none",
                                                          cursor: "pointer",
                                                          fontSize: 12,
                                                          fontFamily: "inherit",
                                                          fontWeight: frequency === f ? 700 : 400,
                                                          letterSpacing: "0.06em",
                                                          textTransform: "uppercase",
                                                          transition: "all 0.15s",
                                      }}>
                                        {f}
                                      </button>button>
                                    ))}
                                </div>div>
                    
                                <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 32 }}>
                                              <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 90px", gap: 12, padding: "8px 16px", fontSize: 10, color: "#444", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                                                              <span>Product</span>span>
                                                              <span style={{ textAlign: "right" }}>Uline</span>span>
                                                              <span style={{ textAlign: "right" }}>Fair Market</span>span>
                                                              <span style={{ textAlign: "right" }}>Qty</span>span>
                                              </div>div>
                                  {products.map(p => {
                                      const qty = quantities[p.id] || 0;
                                      return (
                                                          <div key={p.id} style={{
                                                                                display: "grid",
                                                                                gridTemplateColumns: "1fr 90px 90px 90px",
                                                                                gap: 12,
                                                                                padding: "14px 16px",
                                                                                background: qty > 0 ? "#111" : "#0d0d0d",
                                                                                border: `1px solid ${qty > 0 ? "#2a2a2a" : "#161616"}`,
                                                                                alignItems: "center",
                                                                                transition: "all 0.15s",
                                                          }}>
                                                                              <div>
                                                                                                    <div style={{ fontSize: 13, color: "#e0dcd4", marginBottom: 2 }}>{p.name}</div>div>
                                                                                                    <div style={{ fontSize: 10, color: "#444" }}>{p.unit} · {p.category}</div>div>
                                                                              </div>div>
                                                                              <div style={{ textAlign: "right", fontSize: 13, color: "#e55" }}>{fmtDec(p.uline)}</div>div>
                                                                              <div style={{ textAlign: "right", fontSize: 13, color: "#c8f060" }}>{fmtDec(p.fair)}</div>div>
                                                                              <div style={{ textAlign: "right" }}>
                                                                                                    <input
                                                                                                                              type="number"
                                                                                                                              min={0}
                                                                                                                              value={quantities[p.id] || ""}
                                                                                                                              onChange={e => setQuantities(q => ({ ...q, [p.id]: Math.max(0, parseInt(e.target.value) || 0) }))}
                                                                                                                              placeholder="0"
                                                                                                                              style={{
                                                                                                                                                          width: 70,
                                                                                                                                                          background: "#0a0a0a",
                                                                                                                                                          border: "1px solid #2a2a2a",
                                                                                                                                                          color: "#f0ece4",
                                                                                                                                                          padding: "6px 8px",
                                                                                                                                                          fontSize: 13,
                                                                                                                                                          fontFamily: "inherit",
                                                                                                                                                          textAlign: "right",
                                                                                                                                                          outline: "none",
                                                                                                                                                          borderRadius: 1,
                                                                                                                                }}
                                                                                                                              onFocus={e => e.target.style.borderColor = "#c8f060"}
                                                                                                                              onBlur={e => e.target.style.borderColor = "#2a2a2a"}
                                                                                                                            />
                                                                              </div>div>
                                                          </div>div>
                                                        );
                    })}
                                </div>div>
                    
                      {hasQty && (
                                    <div style={{
                                                      border: "1px solid #2a2a2a",
                                                      background: "#0f0f0f",
                                                      padding: "28px",
                                                      marginBottom: 24,
                                    }}>
                                                    <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "#555", textTransform: "uppercase", marginBottom: 20 }}>
                                                                      Your cost breakdown — {frequency}
                                                    </div>div>
                                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
                                                      {[
                                      { label: "Uline Total", val: fmt(totalUline), color: "#e55" },
                                      { label: "Fair Market Total", val: fmt(totalFair), color: "#c8f060" },
                                      { label: "You're Overpaying", val: fmt(savings), color: "#fff" },
                                                        ].map(({ label, val, color }) => (
                                                                              <div key={label}>
                                                                                                    <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>div>
                                                                                                    <div style={{ fontSize: 26, fontFamily: "'DM Serif Display', Georgia, serif", color }}>{val}</div>div>
                                                                              </div>div>
                                                                            ))}
                                                    </div>div>
                                    
                                      {frequency === "monthly" && savings > 0 && (
                                                        <div style={{
                                                                              background: "#141414",
                                                                              border: "1px solid #1e1e1e",
                                                                              padding: "14px 18px",
                                                                              display: "flex",
                                                                              alignItems: "center",
                                                                              justifyContent: "space-between",
                                                        }}>
                                                                            <span style={{ fontSize: 12, color: "#666" }}>That's <strong style={{ color: "#f0ece4" }}>{fmt(annualSavings)}</strong>strong> per year leaving your margins.</span>span>
                                                                            <span style={{ background: "#c8f060", color: "#0a0a0a", fontSize: 11, fontWeight: 700, padding: "3px 10px", letterSpacing: "0.06em" }}>
                                                                              {savingsPct}% OVERPAY
                                                                            </span>span>
                                                        </div>div>
                                                    )}
                                    </div>div>
                                )}
                    
                      {hasQty && !showLead && (
                                    <button onClick={() => setShowLead(true)} style={{
                                                      width: "100%",
                                                      padding: "16px",
                                                      background: "#c8f060",
                                                      border: "none",
                                                      color: "#0a0a0a",
                                                      fontSize: 14,
                                                      fontWeight: 700,
                                                      fontFamily: "inherit",
                                                      cursor: "pointer",
                                                      letterSpacing: "0.06em",
                                                      textTransform: "uppercase",
                                                      transition: "all 0.15s",
                                    }}
                                                      onMouseEnter={e => e.currentTarget.style.background = "#d4f870"}
                                                      onMouseLeave={e => e.currentTarget.style.background = "#c8f060"}
                                                    >
                                                    Get a real quote from a regional distributor →
                                    </button>button>
                                )}
                    
                      {showLead && !submitted && (
                                    <div style={{ border: "1px solid #2a2a2a", padding: 28, background: "#0f0f0f" }}>
                                                    <div style={{ fontSize: 16, fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 6 }}>
                                                                      We'll match you with the right regional supplier.
                                                    </div>div>
                                                    <p style={{ fontSize: 12, color: "#666", margin: "0 0 24px" }}>
                                                                      No spam. A real person reaches out with pricing — usually within 1 business day.
                                                    </p>p>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                                      {[["name", "Your name"], ["company", "Company name"], ["email", "Work email"]].map(([field, placeholder]) => (
                                                          <input key={field}
                                                                                  type={field === "email" ? "email" : "text"}
                                                                                  placeholder={placeholder}
                                                                                  value={lead[field]}
                                                                                  onChange={e => setLead(l => ({ ...l, [field]: e.target.value }))}
                                                                                  style={{
                                                                                                            background: "#0a0a0a",
                                                                                                            border: "1px solid #2a2a2a",
                                                                                                            color: "#f0ece4",
                                                                                                            padding: "12px 14px",
                                                                                                            fontSize: 13,
                                                                                                            fontFamily: "inherit",
                                                                                                            outline: "none",
                                                                                                            borderRadius: 1,
                                                                                    }}
                                                                                  onFocus={e => e.target.style.borderColor = "#c8f060"}
                                                                                  onBlur={e => e.target.style.borderColor = "#2a2a2a"}
                                                                                />
                                                        ))}
                                                                      <button
                                                                                            onClick={() => { if (lead.name && lead.email) setSubmitted(true); }}
                                                                                            style={{
                                                                                                                    padding: "13px",
                                                                                                                    background: lead.name && lead.email ? "#c8f060" : "#1a1a1a",
                                                                                                                    border: "none",
                                                                                                                    color: lead.name && lead.email ? "#0a0a0a" : "#444",
                                                                                                                    fontSize: 13,
                                                                                                                    fontWeight: 700,
                                                                                                                    fontFamily: "inherit",
                                                                                                                    cursor: lead.name && lead.email ? "pointer" : "default",
                                                                                                                    letterSpacing: "0.06em",
                                                                                                                    textTransform: "uppercase",
                                                                                                                    transition: "all 0.2s",
                                                                                              }}>
                                                                                          Connect me with a supplier
                                                                      </button>button>
                                                    </div>div>
                                    </div>div>
                                )}
                    
                      {submitted && (
                                    <div style={{ border: "1px solid #c8f060", padding: 28, background: "#0d110a", textAlign: "center" }}>
                                                    <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>div>
                                                    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, marginBottom: 8 }}>
                                                                      You're in the system, {lead.name.split(" ")[0]}.
                                                    </div>div>
                                                    <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                                                                      Expect to hear from a regional specialist within 1 business day.<br />
                                                                      Estimated annual savings on your profile: <strong style={{ color: "#c8f060" }}>{fmt(annualSavings || savings * 12)}</strong>strong>
                                                    </p>p>
                                    </div>div>
                                )}
                    </div>div>
                        )}
                </div>div>
        
              <style>{`
                      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500;700&display=swap');
                              * { box-sizing: border-box; }
                                      input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                                              input[type=number] { -moz-appearance: textfield; }
                                                      ::-webkit-scrollbar { width: 4px; }
                                                              ::-webkit-scrollbar-track { background: #0a0a0a; }
                                                                      ::-webkit-scrollbar-thumb { background: #2a2a2a; }
                                                                            `}</style>style>
        </div>div>
      );
}</button>

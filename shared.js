const NAV = [
  { label: "Paths", href: "path.html" },
  { label: "Best Practices", href: "best-practices.html" },
  { label: "Guides", href: "guides.html" },
  { label: "Videos", href: "videos.html" },
];

function NavBar() {
  const current = window.location.pathname.split("/").pop() || "path.html";
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(26,23,20,0.9)", backdropFilter:"blur(12px)", borderBottom:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", height:56, display:"flex", alignItems:"center", gap:4 }}>
        <a href="path.html" style={{ display:"flex", alignItems:"center", gap:10, marginRight:20, flexShrink:0 }}>
          <div style={{ width:30, height:30, background:"var(--accent)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#1A1714" }}>💪</div>
          <span style={{ fontWeight:700, fontSize:16, color:"var(--text-head)" }}>FitPath</span>
        </a>
        {NAV.map(l => {
          const active = l.href === current;
          return (
            <a key={l.label} href={l.href} style={{
              padding:"6px 12px", borderRadius:6, fontSize:13.5, fontWeight:500,
              color: active ? "var(--accent)" : "var(--text2)",
              background: active ? "rgba(207,123,75,0.1)" : "transparent",
              transition:"all .15s",
            }}
            onMouseEnter={e => { if (!active) { e.target.style.color="var(--text)"; e.target.style.background="var(--bg2)"; } }}
            onMouseLeave={e => { if (!active) { e.target.style.color="var(--text2)"; e.target.style.background="transparent"; } }}
            >{l.label}</a>
          );
        })}
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          <a href="auth.html" style={{ padding:"6px 14px", borderRadius:8, fontSize:13, border:"1px solid var(--border)", color:"var(--text2)", background:"var(--bg2)" }}>Login</a>
          <a href="auth.html?mode=signup" style={{ padding:"6px 14px", borderRadius:8, fontSize:13, background:"var(--accent)", color:"#1A1714", fontWeight:700 }}>Sign up</a>
        </div>
      </div>
    </nav>
  );
}

window.NavBar = NavBar;
window.NAV = NAV;

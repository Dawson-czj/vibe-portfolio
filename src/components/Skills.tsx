import data from '../data/portfolioData'
export default function Skills() {
  return (
    <section id="capabilities" className="section capabilities-section motion-ready">
      <div className="container">
        <svg className="deco-top-left" viewBox="0 0 140 60"><path d="M4,36 Q40,10 80,28 Q110,44 134,18"/></svg>
        <svg className="deco-bottom-right" viewBox="0 0 120 50"><path d="M4,30 Q36,8 68,22 Q92,36 116,14"/></svg>
        <div className="section-header">
          <p className="section-label">/ capabilities</p>
          <h2 className="section-title">核心能力</h2>
          <p className="section-subtitle">产品设计 × AI 工程 × 内容增长 —— 每一项都在项目中得到过验证。</p>
          <span className="section-rule"></span>
        </div>
        <div className="skills-grid">
          {data.skills.map((s, i) => (
            <div key={i} className="skill-card" data-relate={s.relate}>
              <div className="skill-header"><span className="skill-index">{s.index}</span><span className="skill-category">{s.category}</span></div>
              <div className="skill-items">{s.items.map((item, j) => <span key={j} className="skill-item">{item}</span>)}</div>
              <div className="skill-evidence"><span className="skill-evidence-item"><a href={s.evidenceHref}>{s.evidence}</a></span></div>
              <div className="skill-tags">{s.tags.map((t, j) => <span key={j} className="skill-tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
        <div className="capabilities-footer">
          <span className="capabilities-footer-left">· {data.name} · 产品设计 ·</span>
          <span className="capabilities-footer-right"><a href="#contact">联系我 ↓</a></span>
        </div>
      </div>
    </section>
  )
}

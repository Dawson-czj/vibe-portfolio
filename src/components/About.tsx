import data from '../data/portfolioData'
const a = data.about

const courseStyles = [
  { '--tr': '-1.2deg', '--ty': '-1px' },
  { '--tr': '1.8deg', '--ty': '0px' },
  { '--tr': '-0.6deg', '--ty': '2px' },
  { '--tr': '2.4deg', '--ty': '-1px' },
  { '--tr': '-1.8deg', '--ty': '1px' },
  { '--tr': '0.9deg', '--ty': '-2px' },
  { '--tr': '-0.3deg', '--ty': '0px' },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="top-rule"><span className="top-rule-left">{a.topRuleLeft}</span><span className="top-rule-right">{a.topRuleRight}</span></div>
        <div className="about-header">
          <p className="section-label">/ about</p>
          <h1 className="section-title">关于我</h1>
          <p className="section-tagline">{a.tagline}</p>
          <p className="section-desc">{a.desc}</p>
        </div>
        <div className="about-grid">
          <div className="about-left">
            <div className="about-photo-frame" style={{ overflow: 'hidden', background: '#000' }}>
              <img src="/media/about-avatar.jpg" alt="池子俊" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            </div>
            <div className="about-info">
              {a.personal.map((item, i) => (
                <div key={i} className="info-row"><span className="info-label">{item.label}</span><span className="info-value">{item.value}</span></div>
              ))}
            </div>
          </div>
          <div className="about-right">
            <div className="about-stats">
              {a.stats.map((s, i) => (
                <div key={i} className="stat-item"><p className="stat-value">{s.value}</p><p className="stat-label">{s.label}<span className="stat-detail">{s.detail}</span></p></div>
              ))}
            </div>
            <div className="about-bio">
              {a.bio.map((p, i) => <p key={i} className={i === 0 ? 'bio-first' : ''}>{p}</p>)}
            </div>
            <div className="identity-timeline">
              {a.timeline.map((t, i) => (
                <div key={i} className="timeline-item"><span className="timeline-year">{t.year}</span><span className="timeline-dot"></span><span className="timeline-content">{t.content}</span></div>
              ))}
            </div>
            <div className="about-courses">
              {a.courses.map((c, i) => (
                <span key={i} className="course-item" style={{ '--tr': courseStyles[i % 7]['--tr'], '--ty': courseStyles[i % 7]['--ty'] } as React.CSSProperties}>{c}</span>
              ))}
            </div>
            <div className="about-portfolio-cta">
              <a href="#projects" className="cta-link">{a.ctaText}</a>
              <span className="cta-hint">{a.ctaHint}</span>
            </div>
            <div className="about-signature">
              <div className="signature-rule"></div>
              <div className="signature-body">
                <div className="signature-quote">
                  <p><span className="quote-mark">"</span>{a.quote}<span className="quote-mark">"</span></p>
                  <span className="quote-attribution">{a.quoteAttr}</span>
                </div>
                <div className="signature-meta">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.12"><path d="M8 20 Q20 4 32 20 Q20 36 8 20" stroke="currentColor" strokeWidth="1.2"/><path d="M12 20 Q20 8 28 20 Q20 32 12 20" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
                  <div className="meta-lines"><span>基于 AI 的产品设计</span><span>· 持续验证 · 持续生长</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-footer-rule">
          <span className="about-footer-left">· {data.name} · 产品设计 ·</span>
          <span className="about-footer-right"><a href="#projects" style={{ color: 'var(--accent)' }}>查看项目经历 ↓</a></span>
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect, useRef } from 'react'
import data from '../data/portfolioData'

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedAI, setExpandedAI] = useState<Record<string, boolean>>({})
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null)
  const lightboxRef = useRef<HTMLVideoElement>(null)
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v1 = videoRef1.current
    const v2 = videoRef2.current
    const stop = (v: HTMLVideoElement | null) => { if (v) { v.pause(); v.currentTime = 0 } }
    const play = (v: HTMLVideoElement | null) => {
      if (!v) return; v.muted = true; v.play().catch(() => {})
    }
    if (activeTab === 0) { stop(v2); setTimeout(() => play(v1), 550) }
    else                 { stop(v1); setTimeout(() => play(v2), 550) }
  }, [activeTab])

  const openLightbox = (src: string) => {
    setLightboxVideo(src)
    videoRef1.current?.pause()
    videoRef2.current?.pause()
  }

  const closeLightbox = () => {
    const lb = lightboxRef.current
    if (lb) { lb.pause(); lb.currentTime = 0 }
    setLightboxVideo(null)
  }

  const videoSrc = (id: string) => id === 'rotorua' ? '/media/project-rotorua.mp4' : '/media/project-agent-rent.mp4'

  return (
    <section id="projects" className="section projects-section motion-ready">
      <div className="container">
        <div className="section-header">
          <p className="section-label">/ featured projects</p>
          <h2 className="section-title">项目经历</h2>
          <p className="section-subtitle">从需求到第一个用户 —— 两个 AI 产品的完整实践。</p>
          <span className="section-rule"></span>
        </div>
        <div className="project-tabs">
          {data.projects.map((p, i) => (
            <button key={p.id} className={`project-tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{p.tabLabel}</button>
          ))}
        </div>
        {data.projects.map((p, i) => (
          <div key={p.id} className="project-card-inner" data-tags={p.dataTags}>
            <div className={`project-content ${activeTab === i ? 'active' : ''}`}>
              <div className="project-content-inner">
                <div className="project-image" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => openLightbox(videoSrc(p.id))}>
                  <video
                    ref={i === 0 ? videoRef1 : videoRef2}
                    src={videoSrc(p.id)}
                    muted loop playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, pointerEvents: 'none' }}
                  />
                  <div className="video-play-hint">
                    <span className="video-play-icon">&#9654;</span>
                    <span className="video-play-label">点击放大</span>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-meta"><span className="project-role">{p.role}</span><span className="project-period">{p.period}</span></div>
                  <span className="project-number">{p.number}</span>
                  <h3 className="project-title">{p.title}</h3>
                  <div className="project-tags">{p.tags.map((t, j) => <span key={j} className="project-tag">{t}</span>)}</div>
                  <ul className="project-desc">{p.desc.map((d, j) => <li key={j}><span className="bullet">→</span>{d}</li>)}</ul>
                  <div className="highlight-box">
                    <p className="highlight-box-label">关键成果</p>
                    <div className="metric-grid">{p.metrics.map((m, j) => <div key={j} className="metric-item"><span className="metric-value">{m.value}</span><span className="metric-label">{m.label}</span></div>)}</div>
                  </div>
                </div>
                {p.aiDecision && (
                  <div className={`ai-decision ${expandedAI[p.id] ? 'expanded' : ''}`}>
                    <button className="ai-decision-toggle" onClick={() => setExpandedAI(prev => ({...prev, [p.id]: !prev[p.id]}))}>
                      <span className="ai-decision-toggle-icon">{expandedAI[p.id] ? '−' : '+'}</span>
                      <span className="ai-decision-toggle-label">AI Product Decision</span>
                      <span className="ai-decision-toggle-hint">{expandedAI[p.id] ? '收起' : '展开决策 trace'}</span>
                    </button>
                    {expandedAI[p.id] && (
                      <div className="ai-decision-body">
                        <div className="ai-decision-section">
                          <div className="ai-decision-section-header">Why AI?</div>
                          <ul className="ai-decision-list">
                            {p.aiDecision.whyAI.map((item, j) => <li key={j}>{item}</li>)}
                          </ul>
                        </div>
                        <div className="ai-decision-section">
                          <div className="ai-decision-section-header">Architecture</div>
                          <div className="ai-decision-flow">
                            {p.aiDecision.architecture.map((step, j) => (
                              <div key={j} className="ai-decision-step">
                                <span className="ai-decision-step-index">{j + 1}</span>
                                <span className="ai-decision-step-label">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="ai-decision-section">
                          <div className="ai-decision-section-header">Trade-off</div>
                          <div className="ai-decision-tradeoff">
                            <div className="tradeoff-row">
                              <span className="tradeoff-label">Constraint</span>
                              <span className="tradeoff-value">{p.aiDecision.tradeoff.constraint}</span>
                            </div>
                            <div className="tradeoff-row">
                              <span className="tradeoff-label">Decision</span>
                              <span className="tradeoff-value decision">{p.aiDecision.tradeoff.decision}</span>
                            </div>
                            <div className="tradeoff-row">
                              <span className="tradeoff-label">Rejected</span>
                              <span className="tradeoff-value rejected">{p.aiDecision.tradeoff.rejected}</span>
                            </div>
                            <div className="tradeoff-row">
                              <span className="tradeoff-label">Gain · Cost</span>
                              <span className="tradeoff-value">{p.aiDecision.tradeoff.accept}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ai-decision-section">
                          <div className="ai-decision-section-header">Measurement</div>
                          <div className="ai-decision-metrics">
                            {p.aiDecision.measurement.map((m, j) => (
                              <span key={j} className="ai-decision-metric">{m}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="projects-footer">
          <span className="projects-footer-left">2 Selected Projects · Updated Quarterly</span>
          <span className="projects-footer-right"><a href="#capabilities">查看核心能力 ↓</a></span>
        </div>
      </div>

      {/* Video Lightbox */}
      {lightboxVideo && (
        <div className="video-lightbox" onClick={closeLightbox}>
          <div className="video-lightbox-content" onClick={e => e.stopPropagation()}>
            <video ref={lightboxRef} src={lightboxVideo} controls autoPlay playsInline className="video-lightbox-player" />
            <button className="video-lightbox-close" onClick={closeLightbox}>&#10005;</button>
          </div>
        </div>
      )}
    </section>
  )
}

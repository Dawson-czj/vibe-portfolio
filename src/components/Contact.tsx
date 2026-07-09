import { useState } from 'react'
import data from '../data/portfolioData'

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyContact = (text: string, label: string) => {
    if (copied) return
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(label)
        setTimeout(() => setCopied(null), 2200)
      }).catch(() => fallbackCopy(text, label))
    } else fallbackCopy(text, label)
  }

  const fallbackCopy = (text: string, label: string) => {
    const ta = document.createElement('textarea')
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px'; ta.style.top = '-9999px'
    document.body.appendChild(ta); ta.select()
    try { document.execCommand('copy'); setCopied(label); setTimeout(() => setCopied(null), 2200) } catch(e) {}
    document.body.removeChild(ta)
  }

  return (
    <section id="contact" className="section contact-section motion-ready">
      <div className="container">
        <div className="section-header">
          <p className="section-label">/ contact</p>
          <h2 className="section-title">保持联系</h2>
          <p className="section-subtitle">欢迎交流 AI 产品、设计与 Agent 应用。</p>
          <span className="section-rule"></span>
        </div>
        <div className="contact-channels">
          <div className={`contact-card contact-card-primary ${copied === 'email' ? 'copied' : ''}`} onClick={() => copyContact(data.social.email, 'email')}>
            <div className="contact-card-inner">
              <span className="contact-card-label">邮箱</span>
              <a href={`mailto:${data.social.email}`} className="contact-card-link" onClick={e => e.stopPropagation()}>
                <span className="contact-card-value">{data.social.email}</span>
              </a>
              <span className="contact-card-action">{copied === 'email' ? '' : '复制'}</span>
              <span className="copy-feedback">✓ 已复制</span>
            </div>
          </div>
          <div className={`contact-card contact-card-secondary ${copied === 'wechat' ? 'copied' : ''}`} onClick={() => copyContact(data.social.wechat, 'wechat')}>
            <div className="contact-card-inner">
              <span className="contact-card-label">微信</span>
              <span className="contact-card-value">{data.social.wechat}</span>
              <span className="contact-card-action">{copied === 'wechat' ? '' : '复制'}</span>
              <span className="copy-feedback">✓ 已复制</span>
            </div>
          </div>
        </div>
        <p className="contact-note">或直接发邮件，我会在 24 小时内回复。</p>
        <footer className="site-footer">
          <span className="site-footer-left">© 2026 {data.name}</span>
          <nav className="site-footer-nav">
            <a href="#hero">首页</a>
            <a href="#about">关于</a>
            <a href="#projects">项目</a>
            <a href="#capabilities">能力</a>
            <a href="#contact">联系</a>
          </nav>
        </footer>
      </div>
    </section>
  )
}

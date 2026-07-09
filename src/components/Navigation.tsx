import data from '../data/portfolioData'
export default function Navigation() {
  return (
    <nav className="site-nav" id="siteNav">
      <span className="site-nav-logo">{data.navLogo}<span style={{color:'var(--accent)'}}>{data.accentDot}</span></span>
      <div className="site-nav-links">
        <a href="#hero" className="active">首页</a>
        <a href="#about">关于</a>
        <a href="#projects">项目</a>
        <a href="#capabilities">能力</a>
        <a href="#contact">联系</a>
      </div>
    </nav>
  )
}

import { useEffect, useRef } from 'react'
import data from '../data/portfolioData'
const h = data.hero

export default function Hero() {
  const swooshRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Three.js TorusKnot (desktop only)
    if (window.innerWidth < 768) return
    const container = document.querySelector('.hero-content') as HTMLElement
    if (!container || container.querySelector('.three-hero-canvas')) return

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => {
      const scene = new (window as any).THREE.Scene()
      const camera = new (window as any).THREE.PerspectiveCamera(45, 1, 0.1, 1000)
      camera.position.set(0, 0, 8)
      const renderer = new (window as any).THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(200, 200)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.domElement.className = 'three-hero-canvas'
      renderer.domElement.style.cssText = 'position:absolute;bottom:-20px;right:-20px;opacity:0.2;pointer-events:none;z-index:0;'
      container.style.position = 'relative'
      container.appendChild(renderer.domElement)

      const geo = new (window as any).THREE.TorusKnotGeometry(1, 0.35, 64, 8, 2, 3)
      const mat = new (window as any).THREE.MeshPhysicalMaterial({ color: 0xb8806e, metalness: 0.1, roughness: 0.6, transparent: true, opacity: 0.5, wireframe: true })
      const knot = new (window as any).THREE.Mesh(geo, mat)
      scene.add(knot)
      const al = new (window as any).THREE.AmbientLight(0xffffff, 0.6); scene.add(al)
      const dl = new (window as any).THREE.DirectionalLight(0xb8806e, 1.2); dl.position.set(1, 2, 3); scene.add(dl)
      let t = 0
      function animate() { requestAnimationFrame(animate); t += 0.004; knot.rotation.x = Math.sin(t * 0.3) * 0.2; knot.rotation.y = t * 0.15; knot.position.y = Math.sin(t * 0.2) * 0.1; renderer.render(scene, camera) }
      animate()
      const resize = () => { const s = Math.min(200, window.innerWidth * 0.2); renderer.setSize(s, s) }
      window.addEventListener('resize', resize)
    }
    document.head.appendChild(script)
  }, [])

  return (
    <section id="hero" className="hero-section">
      <svg className="blob-left" viewBox="0 0 500 500"><path d="M350,120 C420,160 460,260 420,350 C380,440 280,470 190,440 C100,410 50,320 60,230 C70,140 160,70 250,60 C340,50 280,80 350,120 Z" fill="#b8806e" opacity="0.12" filter="url(#blur1)"/><path d="M300,150 C360,180 390,260 360,330 C330,400 250,420 180,390 C110,360 80,290 90,220 C100,150 170,100 240,90 C310,80 240,120 300,150 Z" fill="#b8806e" opacity="0.08" filter="url(#blur1)"/><defs><filter id="blur1"><feGaussianBlur stdDeviation="16"/></filter></defs></svg>
      <svg className="blob-right" viewBox="0 0 400 400"><path d="M280,80 C340,120 370,210 340,290 C310,370 220,390 140,360 C60,330 20,240 40,160 C60,80 150,20 230,10 C310,0 220,40 280,80 Z" fill="#b8806e" opacity="0.10" filter="url(#blur2)"/><defs><filter id="blur2"><feGaussianBlur stdDeviation="14"/></filter></defs></svg>
      <svg className="swoosh" viewBox="0 0 600 60" ref={swooshRef}><path d="M10,30 C100,10 200,-5 300,25 C400,55 500,40 590,20" stroke="#1c1a18" fill="none" strokeWidth="1.2" strokeLinecap="round"/></svg>
      <div className="hero-content" id="heroContent">
        <p className="hero-label">{h.greeting}</p>
        <h1 className="hero-name">{h.nameChars.map((ch,i) => <span key={i} className="float-letter">{ch}</span>)}<span className="accent-dot">.</span></h1>
        <p className="hero-role"><em>{h.roleEm}</em>{h.roleSuffix}</p>
        <p className="hero-locale">{h.locale}</p>
        <p className="hero-tagline">{h.tagline1}<br />{h.tagline2}</p>
        <div className="hero-ctas">
          <a href="#projects" className="btn-primary">查看项目 ↓</a>
          <a href="#contact" className="btn-secondary">联系我</a>
        </div>
      </div>
      <a href="#about" className="scroll-hint"><span>SCROLL</span><div className="scroll-line"></div></a>
    </section>
  )
}

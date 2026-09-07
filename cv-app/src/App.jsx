import { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { cvData } from './data/cvData'
import { DietPage } from './DietPage'
import './App.css'

const templateOptions = [
  { id: 'warm', label: 'Warm', description: 'Letisztult, meleg tones' },
  { id: 'modern', label: 'Modern', description: 'Sötét, tech-esebb hangulat' },
  { id: 'minimal', label: 'Minimal', description: 'Egyszerű, recruiter-barát' },
  { id: 'creative', label: 'Creative', description: 'Karakteresebb, hangsúlyosabb' },
  { id: 'timeline', label: 'Timeline', description: 'Idővonalas szakmai nézet' },
]

function PhotoBox({ photoUrl, className = '' }) {
  return photoUrl ? (
    <img className={className} src={photoUrl} alt="Profilkep" />
  ) : (
    <div className={className}>
      <span>Kep helye</span>
    </div>
  )
}

function WarmTemplate({ photoUrl }) {
  return (
    <article className="cv-page template-warm">
      <header className="cv-hero">
        <div>
          <h1>{cvData.name}</h1>
          <p className="cv-role">{cvData.role}</p>
          <p className="cv-summary">{cvData.summary}</p>
        </div>
        <PhotoBox photoUrl={photoUrl} className="photo-box warm-photo" />
      </header>

      <section className="cv-columns">
        <aside className="cv-sidebar">
          <section className="cv-section">
            <h2>Elérhetőség</h2>
            <ul className="plain-list">
              <li>
                <strong>Telefon</strong>
                <br />
                {cvData.contact.phone}
              </li>
              <li>
                <strong>Email</strong>
                <br />
                {cvData.contact.email}
              </li>
            </ul>
          </section>

          <section className="cv-section">
            <h2>Tapasztalatok</h2>
            <ul className="plain-list bullet-list">
              {cvData.experienceYears.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="cv-section">
            <h2>Adatbázisok</h2>
            <ul className="plain-list bullet-list">
              {cvData.databases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="cv-section">
            <h2>Technológiák és ismeretek</h2>
            {cvData.skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tag-list">
                  {group.items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </aside>

        <main className="cv-main">
          <section className="cv-section">
            <h2>Szakmai tapasztalat</h2>
            <div className="job-stack">
              {cvData.jobs.map((job) => (
                <article className="job-card" key={job.period + job.title}>
                  <span className="job-period">{job.period}</span>
                  <h3>{job.title}</h3>
                  <ul className="job-list">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </main>
      </section>
    </article>
  )
}

function ModernTemplate({ photoUrl }) {
  return (
    <article className="cv-page template-modern">
      <header className="cv-hero modern-hero">
        <PhotoBox photoUrl={photoUrl} className="photo-box modern-photo" />
        <div>
          <h1>{cvData.name}</h1>
          <p className="cv-role">{cvData.role}</p>
          <p className="cv-summary">{cvData.summary}</p>
        </div>
      </header>

      <section className="cv-columns modern-columns">
        <aside className="cv-sidebar modern-sidebar">
          <section className="cv-section compact-section">
            <h2>Elérhetőség</h2>
            <ul className="plain-list">
              <li>{cvData.contact.phone}</li>
              <li>{cvData.contact.email}</li>
            </ul>
          </section>

          <section className="cv-section compact-section">
            <h2>Tapasztalatok</h2>
            <ul className="plain-list bullet-list">
              {cvData.experienceYears.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="cv-section compact-section">
            <h2>Adatbázisok</h2>
            <ul className="plain-list bullet-list">
              {cvData.databases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="cv-section compact-section">
            <h2>Tech stack</h2>
            <div className="tag-list modern-tags">
              {cvData.skillGroups.flatMap((group) => group.items).map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <main className="cv-main modern-main">
          <section className="cv-section">
            <h2>Szakmai tapasztalat</h2>
            <div className="job-stack">
              {cvData.jobs.map((job) => (
                <article className="job-card modern-job" key={job.period + job.title}>
                  <span className="job-period">{job.period}</span>
                  <h3>{job.title}</h3>
                  <ul className="job-list">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </main>
      </section>
    </article>
  )
}

function MinimalTemplate({ photoUrl }) {
  return (
    <article className="cv-page template-minimal">
      <header className="minimal-header">
        <div>
          <h1>{cvData.name}</h1>
          <p className="cv-role">{cvData.role}</p>
        </div>
      </header>

      <section className="cv-columns minimal-columns">
        <aside className="cv-sidebar minimal-sidebar">
          <PhotoBox photoUrl={photoUrl} className="photo-box minimal-photo" />

          <section className="cv-section compact-section">
            <h2>Elérhetőség</h2>
            <p>{cvData.contact.phone}</p>
            <p>{cvData.contact.email}</p>
          </section>

          <section className="cv-section compact-section">
            <h2>Tapasztalatok</h2>
            <ul className="plain-list bullet-list">
              {cvData.experienceYears.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="cv-section compact-section">
            <h2>Adatbázisok</h2>
            <ul className="plain-list bullet-list">
              {cvData.databases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="cv-main minimal-main">
          <section className="cv-section compact-section">
            <h2>Rólam</h2>
            <p className="cv-summary">{cvData.summary}</p>
          </section>

          <section className="cv-section compact-section">
            <h2>Technológiák és ismeretek</h2>
            {cvData.skillGroups.map((group) => (
              <p key={group.title} className="minimal-line">
                <strong>{group.title}:</strong> {group.items.join(', ')}
              </p>
            ))}
          </section>

          <section className="cv-section">
            <h2>Szakmai tapasztalat</h2>
            <div className="job-stack">
              {cvData.jobs.map((job) => (
                <article className="job-card minimal-job" key={job.period + job.title}>
                  <span className="job-period">{job.period}</span>
                  <h3>{job.title}</h3>
                  <ul className="job-list">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </main>
      </section>
    </article>
  )
}

function CreativeTemplate({ photoUrl }) {
  return (
    <article className="cv-page template-creative">
      <header className="cv-hero creative-hero">
        <div>
          <h1>{cvData.name}</h1>
          <p className="cv-role">{cvData.role}</p>
          <p className="cv-summary">{cvData.summary}</p>
        </div>
        <PhotoBox photoUrl={photoUrl} className="photo-box creative-photo" />
      </header>

      <section className="creative-panels">
        <div className="creative-panel left-panel">
          <section className="cv-section compact-section">
            <h2>Elérhetőség</h2>
            <ul className="plain-list">
              <li>{cvData.contact.phone}</li>
              <li>{cvData.contact.email}</li>
            </ul>
          </section>

          <section className="cv-section compact-section">
            <h2>Tapasztalatok</h2>
            <ul className="plain-list bullet-list">
              {cvData.experienceYears.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="cv-section compact-section">
            <h2>Technológiák</h2>
            <div className="tag-list creative-tags">
              {cvData.skillGroups.flatMap((group) => group.items).map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="creative-panel right-panel">
          <section className="cv-section">
            <h2>Szakmai tapasztalat</h2>
            <div className="job-stack">
              {cvData.jobs.map((job) => (
                <article className="job-card creative-job" key={job.period + job.title}>
                  <span className="job-period">{job.period}</span>
                  <h3>{job.title}</h3>
                  <ul className="job-list">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="cv-section compact-section">
            <h2>Adatbázisok</h2>
            <div className="tag-list creative-tags alt-tags">
              {cvData.databases.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>
      </section>
    </article>
  )
}

function TimelineTemplate({ photoUrl }) {
  return (
    <article className="cv-page template-timeline">
      <header className="cv-hero timeline-hero">
        <div>
          <h1>{cvData.name}</h1>
          <p className="cv-role">{cvData.role}</p>
          <p className="cv-summary">{cvData.summary}</p>
        </div>
        <PhotoBox photoUrl={photoUrl} className="photo-box timeline-photo" />
      </header>

      <section className="cv-columns timeline-columns">
        <aside className="cv-sidebar timeline-sidebar">
          <section className="cv-section compact-section">
            <h2>Elérhetőség</h2>
            <p>{cvData.contact.phone}</p>
            <p>{cvData.contact.email}</p>
          </section>

          <section className="cv-section compact-section">
            <h2>Tapasztalatok</h2>
            <ul className="plain-list bullet-list">
              {cvData.experienceYears.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="cv-section compact-section">
            <h2>Adatbázisok</h2>
            <ul className="plain-list bullet-list">
              {cvData.databases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="cv-section compact-section">
            <h2>Technológiák</h2>
            <div className="tag-list timeline-tags">
              {cvData.skillGroups.flatMap((group) => group.items).map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <main className="cv-main timeline-main">
          <section className="cv-section">
            <h2>Szakmai tapasztalat</h2>
            <div className="timeline-list">
              {cvData.jobs.map((job) => {
                const [start, end = ''] = job.period.split(' - ')

                return (
                  <article className="timeline-item" key={job.period + job.title}>
                    <div className="timeline-period">
                      <span>{start}</span>
                      {end ? <span>{end}</span> : null}
                    </div>
                    <div className="timeline-card">
                      <h3>{job.title}</h3>
                      <ul className="job-list">
                        {job.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </main>
      </section>
    </article>
  )
}

function renderTemplate(templateId, photoUrl) {
  switch (templateId) {
    case 'modern':
      return <ModernTemplate photoUrl={photoUrl} />
    case 'minimal':
      return <MinimalTemplate photoUrl={photoUrl} />
    case 'creative':
      return <CreativeTemplate photoUrl={photoUrl} />
    case 'timeline':
      return <TimelineTemplate photoUrl={photoUrl} />
    default:
      return <WarmTemplate photoUrl={photoUrl} />
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('cv')
  const [selectedTemplate, setSelectedTemplate] = useState(templateOptions[0].id)
  const [photoUrl, setPhotoUrl] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [cvScale, setCvScale] = useState(1)
  const previewRef = useRef(null)
  const photoObjectUrlRef = useRef('')
  const stageRef = useRef(null)

  useEffect(() => {
    return () => {
      if (photoObjectUrlRef.current) {
        URL.revokeObjectURL(photoObjectUrlRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!stageRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      setCvScale(entry.contentRect.width / 794)
    })
    ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [])

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (photoObjectUrlRef.current) {
      URL.revokeObjectURL(photoObjectUrlRef.current)
    }

    const nextUrl = URL.createObjectURL(file)
    photoObjectUrlRef.current = nextUrl
    setPhotoUrl(nextUrl)
  }

  const handleClearPhoto = () => {
    if (photoObjectUrlRef.current) {
      URL.revokeObjectURL(photoObjectUrlRef.current)
      photoObjectUrlRef.current = ''
    }

    setPhotoUrl('')
  }

  const handleExportPdf = async () => {
    if (!previewRef.current || isExporting) {
      return
    }

    setIsExporting(true)

    try {
      previewRef.current.style.zoom = '1'
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })
      previewRef.current.style.zoom = String(cvScale)

      const imageData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const nativeHeight = (canvas.height * pageWidth) / canvas.width

      // Scale proportionally to fit on one page, preserving aspect ratio
      const drawHeight = Math.min(nativeHeight, pageHeight)
      const drawWidth = (drawHeight / nativeHeight) * pageWidth
      const xOffset = (pageWidth - drawWidth) / 2

      pdf.addImage(imageData, 'PNG', xOffset, 0, drawWidth, drawHeight, undefined, 'FAST')

      pdf.save(`Papp-Norbert-CV-${selectedTemplate}.pdf`)
    } finally {
      setIsExporting(false)
    }
  }

  const activeTemplate = templateOptions.find((template) => template.id === selectedTemplate)

  if (activeTab === 'diet') {
    return <DietPage onTabChange={setActiveTab} />
  }

  return (
    <div className="app-shell">
      <aside className="control-panel">
        <div className="panel-block">
          <p className="eyebrow">CV Generator</p>
          <h1>React alapú PDF export több sablonnal</h1>
          <p className="panel-copy">
            A szöveg egy helyen van tárolva, és ugyanabból az adatforrásból tudsz többféle
            önéletrajzot generálni.
          </p>
        </div>

        <div className="panel-block">
          <h2>Nézet</h2>
          <div className="app-tab-bar panel-tab-bar">
            <button type="button" className="app-tab-btn active" onClick={() => setActiveTab('cv')}>CV</button>
            <button type="button" className="app-tab-btn" onClick={() => setActiveTab('diet')}>🥗 Étrend</button>
          </div>
        </div>

        <div className="panel-block">
          <h2>Sablonok</h2>
          <div className="template-picker">
            {templateOptions.map((template) => (
              <button
                key={template.id}
                type="button"
                className={selectedTemplate === template.id ? 'template-button active' : 'template-button'}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <span>{template.label}</span>
                <small>{template.description}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="panel-block">
          <h2>Kép</h2>
          <label className="upload-button" htmlFor="photo-upload">
            Kép feltöltése
          </label>
          <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} />
          <button type="button" className="ghost-button" onClick={handleClearPhoto}>
            Kép törlése
          </button>
        </div>

        <div className="panel-block">
          <h2>Adatforrás</h2>
          <p className="panel-note">A teljes tartalom itt szerkeszthető: src/data/cvData.js</p>
        </div>

        <button type="button" className="export-button" onClick={handleExportPdf}>
          {isExporting ? 'PDF készül...' : 'PDF export'}
        </button>
      </aside>

      <main className="preview-shell">
        <div className="preview-header">
          <div>
            <p className="preview-label">Aktív sablon</p>
            <h2>{activeTemplate?.label}</h2>
          </div>
          <p className="preview-description">{activeTemplate?.description}</p>
        </div>

        <div className="preview-stage" ref={stageRef}>
          <div ref={previewRef} style={{ zoom: cvScale }}>{renderTemplate(selectedTemplate, photoUrl)}</div>
        </div>
      </main>
    </div>
  )
}

export default App

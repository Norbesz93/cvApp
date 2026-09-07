import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { dietData, dietDataMale } from './data/dietData'

function MacroBar({ macros }) {
  const total = macros.reduce((sum, m) => sum + m.grams * m.kcalPerG, 0)
  return (
    <div className="macro-bar-wrap">
      <div className="macro-bar">
        {macros.map((m) => {
          const pct = ((m.grams * m.kcalPerG) / total) * 100
          return (
            <div
              key={m.name}
              className="macro-bar-seg"
              style={{ width: `${pct}%`, background: m.color }}
              title={`${m.name}: ${m.grams}g`}
            />
          )
        })}
      </div>
      <div className="macro-legend">
        {macros.map((m) => (
          <div key={m.name} className="macro-legend-item">
            <span className="macro-dot" style={{ background: m.color }} />
            <span className="macro-name">{m.name}</span>
            <span className="macro-val">{m.grams}g</span>
            <span className="macro-kcal">({m.grams * m.kcalPerG} kcal)</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MacroVersionCard({ version, active, onClick }) {
  return (
    <button
      type="button"
      className={`macro-version-card${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <span className="macro-version-label">{version.label}</span>
      <small className="macro-version-desc">{version.description}</small>
      <strong className="macro-version-kcal">{version.totalKcal} kcal</strong>
    </button>
  )
}

function MealCard({ meal }) {
  const totalProtein = meal.macros.protein
  const totalCarbs = meal.macros.carbs
  const totalFat = meal.macros.fat
  const totalKcal = totalProtein * 4 + totalCarbs * 4 + totalFat * 9

  return (
    <article className="meal-card">
      <div className="meal-card-header">
        <div className="meal-icon-time">
          <span className="meal-icon">{meal.icon}</span>
          <div>
            <h3 className="meal-name">{meal.name}</h3>
            <span className="meal-time">{meal.time}</span>
          </div>
        </div>
        <div className="meal-kcal-badge">{totalKcal} kcal</div>
      </div>

      <ul className="meal-foods">
        {meal.foods.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>

      <div className="meal-macros">
        <div className="meal-macro-chip protein-chip">
          <span className="chip-label">Fehérje</span>
          <span className="chip-val">{totalProtein}g</span>
        </div>
        <div className="meal-macro-chip carbs-chip">
          <span className="chip-label">Szénhidrát</span>
          <span className="chip-val">{totalCarbs}g</span>
        </div>
        <div className="meal-macro-chip fat-chip">
          <span className="chip-label">Zsír</span>
          <span className="chip-val">{totalFat}g</span>
        </div>
      </div>
    </article>
  )
}

function DietDocument({ version, plan }) {
  const { dailyTotal, meals } = plan

  return (
    <div className="diet-page">
      <header className="diet-doc-header">
        <div>
          <h1 className="diet-doc-title">{plan.title}</h1>
          <p className="diet-doc-subtitle">{plan.subtitle}</p>
        </div>
        <div className="diet-doc-badge">
          <span className="diet-doc-badge-label">Terv</span>
          <span className="diet-doc-badge-name">{version.label}</span>
        </div>
      </header>

      <section className="diet-doc-targets">
        <h2 className="diet-doc-section-title">Makró célok</h2>
        <div className="diet-doc-targets-grid">
          {version.macros.map((m) => (
            <div key={m.name} className="diet-target-box" style={{ borderColor: m.color }}>
              <span className="diet-target-name">{m.name}</span>
              <strong className="diet-target-grams" style={{ color: m.color }}>{m.grams}g</strong>
              <span className="diet-target-kcal">{m.grams * m.kcalPerG} kcal</span>
            </div>
          ))}
          <div className="diet-target-box total-box">
            <span className="diet-target-name">Összesen</span>
            <strong className="diet-target-grams total-kcal">{version.totalKcal}</strong>
            <span className="diet-target-kcal">kcal / nap</span>
          </div>
        </div>
      </section>

      <section className="diet-doc-meals">
        <h2 className="diet-doc-section-title">Mintaétrend (5 étkezés)</h2>
        <div className="diet-doc-meals-grid">
          {meals.map((meal) => {
            const kcal = meal.macros.protein * 4 + meal.macros.carbs * 4 + meal.macros.fat * 9
            return (
              <article key={meal.id} className="diet-doc-meal">
                <div className="diet-doc-meal-head">
                  <span className="diet-doc-meal-icon">{meal.icon}</span>
                  <div>
                    <h3>{meal.name}</h3>
                    <span className="diet-doc-meal-time">{meal.time}</span>
                  </div>
                  <span className="diet-doc-meal-kcal">{kcal} kcal</span>
                </div>
                <ul className="diet-doc-meal-foods">
                  {meal.foods.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="diet-doc-meal-macros">
                  <span>Fehérje: <strong>{meal.macros.protein}g</strong></span>
                  <span>Szénhidrát: <strong>{meal.macros.carbs}g</strong></span>
                  <span>Zsír: <strong>{meal.macros.fat}g</strong></span>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="diet-doc-daily">
        <h2 className="diet-doc-section-title">Napi összesen</h2>
        <div className="diet-doc-daily-row">
          <div className="diet-daily-item">
            <span>Fehérje</span>
            <strong style={{ color: '#e67e22' }}>~{dailyTotal.protein}g</strong>
          </div>
          <div className="diet-daily-item">
            <span>Szénhidrát</span>
            <strong style={{ color: '#2f7f6d' }}>~{dailyTotal.carbs}g</strong>
          </div>
          <div className="diet-daily-item">
            <span>Zsír</span>
            <strong style={{ color: '#f1b24a' }}>~{dailyTotal.fat}g</strong>
          </div>
          <div className="diet-daily-item total-item">
            <span>Kalória</span>
            <strong>
              {dailyTotal.kcalMin === dailyTotal.kcalMax
                ? `~${dailyTotal.kcalMin} kcal`
                : `~${dailyTotal.kcalMin}–${dailyTotal.kcalMax} kcal`}
            </strong>
          </div>
        </div>
      </section>

      {plan.sources && (
        <section className="diet-doc-sources">
          <h2 className="diet-doc-section-title">Összefoglaló – élelmiszerek</h2>
          <div className="diet-doc-sources-grid">
            <div className="diet-doc-source-col">
              <h3 className="diet-doc-source-title">🥩 Fehérjeforrások</h3>
              <ul className="diet-doc-source-list">
                {plan.sources.protein.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="diet-doc-source-col">
              <h3 className="diet-doc-source-title">🌾 Szénhidrátforrások</h3>
              <ul className="diet-doc-source-list">
                {plan.sources.carbs.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="diet-doc-source-col">
              <h3 className="diet-doc-source-title">🫒 Zsírforrások</h3>
              <ul className="diet-doc-source-list">
                {plan.sources.fat.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
        </section>
      )}

      {plan.note && (
        <p className="diet-doc-note">{plan.note}</p>
      )}
    </div>
  )
}

function NutrientsDocument() {
  return (
    <div className="diet-page nutrients-page">
      <header className="diet-doc-header">
        <div>
          <h1 className="diet-doc-title">Ajánlott alapanyagok</h1>
          <p className="diet-doc-subtitle">Elsőrangú és másodrangú makrotápanyag-források</p>
        </div>
        <div className="diet-doc-badge">
          <span className="diet-doc-badge-label">Útmutató</span>
          <span className="diet-doc-badge-name">Bevásárló alap</span>
        </div>
      </header>

      <div className="nutrients-grid">
        {dietData.nutrients.map((n) => (
          <section key={n.id} className="nutrient-section">
            <div className="nutrient-section-title" style={{ borderColor: n.color }}>
              <span className="nutrient-icon">{n.icon}</span>
              <h2 style={{ color: n.color }}>{n.name}</h2>
            </div>

            <div className="nutrient-tiers">
              <div className="nutrient-tier">
                <div className="nutrient-tier-label primary-label">⭐ Elsőrangú — alapozzunk ezekre</div>
                <ul className="nutrient-list">
                  {n.primary.map((item) => (
                    <li key={item} className="nutrient-item primary-item">
                      <span className="nutrient-bullet" style={{ background: n.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {n.secondary.length > 0 && (
                <div className="nutrient-tier">
                  <div className="nutrient-tier-label secondary-label">➕ Másodrangú — kiegészítésnek</div>
                  <ul className="nutrient-list">
                    {n.secondary.map((item) => (
                      <li key={item} className="nutrient-item secondary-item">
                        <span className="nutrient-bullet secondary-bullet" style={{ borderColor: n.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export function DietPage({ onTabChange }) {
  const [activePlanId, setActivePlanId] = useState('base')
  const [activeVersionId, setActiveVersionId] = useState('chosen')
  const [isExporting, setIsExporting] = useState(false)
  const [isExportingNutrients, setIsExportingNutrients] = useState(false)
  const [scale, setScale] = useState(1)
  const [scaleN, setScaleN] = useState(1)
  const previewRef = useRef(null)
  const nutrientsRef = useRef(null)
  const stageRef = useRef(null)

  const currentDietData = activePlanId === 'male' ? dietDataMale : dietData

  const handlePlanChange = (planId) => {
    setActivePlanId(planId)
    const planData = planId === 'male' ? dietDataMale : dietData
    setActiveVersionId(planData.macroVersions[0].id)
  }

  const activeVersion = currentDietData.macroVersions.find((v) => v.id === activeVersionId)

  // ResizeObserver for scale — same pattern as App.jsx
  const stageCallbackRef = (node) => {
    if (!node) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 794)
    })
    ro.observe(node)
    stageRef.current = node
  }

  const nutrientsStageCallbackRef = (node) => {
    if (!node) return
    const ro = new ResizeObserver(([entry]) => {
      setScaleN(entry.contentRect.width / 794)
    })
    ro.observe(node)
  }

  const exportPdf = async (ref, scaleVal, filename, setExporting) => {
    if (!ref.current || isExporting || isExportingNutrients) return
    setExporting(true)
    try {
      ref.current.style.zoom = '1'
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })
      ref.current.style.zoom = String(scaleVal)
      const imageData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const nativeHeight = (canvas.height * pageWidth) / canvas.width
      const drawHeight = Math.min(nativeHeight, pageHeight)
      const drawWidth = (drawHeight / nativeHeight) * pageWidth
      const xOffset = (pageWidth - drawWidth) / 2
      pdf.addImage(imageData, 'PNG', xOffset, 0, drawWidth, drawHeight, undefined, 'FAST')
      pdf.save(filename)
    } finally {
      setExporting(false)
    }
  }

  const handleExportPdf = () => exportPdf(previewRef, scale, activePlanId === 'male' ? 'etrend-ferfinak.pdf' : 'etrend.pdf', setIsExporting)
  const handleExportNutrients = () => exportPdf(nutrientsRef, scaleN, 'alapanyagok.pdf', setIsExportingNutrients)

  return (
    <div className="app-shell">
      <aside className="control-panel">
        <div className="panel-block">
          <p className="eyebrow">Étrend</p>
          <h1>Makró alapú étrend tervező</h1>
          <p className="panel-copy">
            Válassz makró verziót, nézd meg a mintaétrendet, majd exportáld PDF-ként.
          </p>
        </div>

        <div className="panel-block">
          <h2>Nézet</h2>
          <div className="app-tab-bar panel-tab-bar">
            <button type="button" className="app-tab-btn" onClick={() => onTabChange?.('cv')}>CV</button>
            <button type="button" className="app-tab-btn active" onClick={() => onTabChange?.('diet')}>🥗 Étrend</button>
          </div>
        </div>

        <div className="panel-block">
          <h2>Étrend terv</h2>
          <div className="macro-version-picker">
            <button
              type="button"
              className={`macro-version-card${activePlanId === 'base' ? ' active' : ''}`}
              onClick={() => handlePlanChange('base')}
            >
              <span className="macro-version-label">🥗 Alap étrend</span>
              <small className="macro-version-desc">~1500–1550 kcal</small>
            </button>
            <button
              type="button"
              className={`macro-version-card${activePlanId === 'male' ? ' active' : ''}`}
              onClick={() => handlePlanChange('male')}
            >
              <span className="macro-version-label">💪 Étrend férfinak</span>
              <small className="macro-version-desc">120 kg, ~1950 kcal</small>
            </button>
          </div>
        </div>

        <div className="panel-block">
          <h2>Makró verzió</h2>
          <div className="macro-version-picker">
            {currentDietData.macroVersions.map((v) => (
              <MacroVersionCard
                key={v.id}
                version={v}
                active={v.id === activeVersionId}
                onClick={() => setActiveVersionId(v.id)}
              />
            ))}
          </div>
        </div>

        {activeVersion && (
          <div className="panel-block">
            <h2>Megoszlás</h2>
            <MacroBar macros={activeVersion.macros} />
          </div>
        )}

        <div className="panel-block">
          <h2>Étkezések</h2>
          <div className="meal-list-mini">
            {currentDietData.meals.map((meal) => {
              const kcal = meal.macros.protein * 4 + meal.macros.carbs * 4 + meal.macros.fat * 9
              return (
                <div key={meal.id} className="meal-mini-row">
                  <span>{meal.icon} {meal.name}</span>
                  <span className="meal-mini-kcal">{kcal} kcal</span>
                </div>
              )
            })}
          </div>
        </div>

        <button type="button" className="export-button" onClick={handleExportPdf}>
          {isExporting ? 'PDF készül...' : 'Étrend PDF export'}
        </button>
        <button type="button" className="export-button export-button-secondary" onClick={handleExportNutrients}>
          {isExportingNutrients ? 'PDF készül...' : 'Alapanyagok PDF export'}
        </button>
      </aside>

      <main className="preview-shell">
        <div className="preview-header">
          <div>
            <p className="preview-label">Aktív verzió</p>
            <h2>{activeVersion?.label}</h2>
          </div>
          <p className="preview-description">{activeVersion?.description} — {activeVersion?.totalKcal} kcal/nap</p>
        </div>

        <div className="diet-meal-cards">
          {currentDietData.meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>

        <div className="preview-stage diet-preview-stage" ref={stageCallbackRef}>
          <div ref={previewRef} style={{ zoom: scale }}>
            {activeVersion && <DietDocument version={activeVersion} plan={currentDietData} />}
          </div>
        </div>

        <div className="preview-header" style={{ marginTop: '36px' }}>
          <div>
            <p className="preview-label">Alapanyag útmutató</p>
            <h2>Ajánlott alapanyagok</h2>
          </div>
          <p className="preview-description">Elsőrangú és másodrangú fehérje, szénhidrát és zsírforrások</p>
        </div>

        <div className="preview-stage diet-preview-stage" ref={nutrientsStageCallbackRef}>
          <div ref={nutrientsRef} style={{ zoom: scaleN }}>
            <NutrientsDocument />
          </div>
        </div>
      </main>
    </div>
  )
}

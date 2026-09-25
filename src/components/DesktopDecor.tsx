const MARQUEE =
  'BATTLE NETWORK   \u2022   PRESS START   \u2022   PLAYER REGAZGAZ   \u2022   GAME BOY ADVANCE   \u2022   HIGH SCORE   \u2022   '

/** Purely decorative, desktop-only background. Hidden from AT and never interactive. */
export function DesktopDecor() {
  return (
    <div className="desktop-decor" aria-hidden="true">
      <div className="dd-grid" />
      <div className="dd-glow dd-glow--a" />
      <div className="dd-glow dd-glow--b" />
      <div className="dd-watermark pixel">GAME BOY</div>

      <div className="dd-marquee">
        <div className="dd-marquee__track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>
    </div>
  )
}

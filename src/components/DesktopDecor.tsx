import type { CSSProperties } from 'react'
import { PixelArt } from './PixelArt'
import { DECOR_ICONS } from '../data/decor'

type IconName = keyof typeof DECOR_ICONS

const FLOATERS: { icon: IconName; style: CSSProperties }[] = [
  { icon: 'sword', style: { top: '8%', left: '3%', width: '40px', height: '40px' } },
  { icon: 'hero', style: { top: '23%', left: '6%', width: '44px', height: '59px', animationDelay: '.6s' } },
  { icon: 'potion', style: { top: '44%', left: '3%', width: '38px', height: '38px', animationDelay: '1.2s' } },
  { icon: 'shield', style: { top: '63%', left: '6%', width: '42px', height: '42px', animationDelay: '.4s' } },
  { icon: 'gem', style: { top: '84%', left: '3%', width: '34px', height: '34px', animationDelay: '1.6s', animationDuration: '3.2s' } },
  { icon: 'knight', style: { top: '7%', right: '3%', width: '48px', height: '67px', animationDelay: '.8s' } },
  { icon: 'chest', style: { top: '30%', right: '6%', width: '42px', height: '42px', animationDelay: '1.4s' } },
  { icon: 'robot', style: { top: '52%', right: '3%', width: '44px', height: '59px', animationDelay: '.2s' } },
  { icon: 'key', style: { top: '71%', right: '7%', width: '36px', height: '36px', animationDelay: '1.9s', animationDuration: '3.4s' } },
  { icon: 'bomb', style: { top: '85%', right: '3%', width: '40px', height: '40px', animationDelay: '1s' } },
  { icon: 'star', style: { top: '30%', left: '47%', width: '22px', height: '22px', animationDelay: '.7s', animationDuration: '3.4s' } },
  { icon: 'star', style: { top: '66%', right: '47%', width: '20px', height: '20px', animationDelay: '1.8s', animationDuration: '3.1s' } },
]

const INVENTORY: IconName[] = ['sword', 'shield', 'potion', 'key', 'gem']

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

      {FLOATERS.map((f, i) => (
        <span key={i} className="dd-float" style={f.style}>
          <PixelArt rows={DECOR_ICONS[f.icon].rows} palette={DECOR_ICONS[f.icon].palette} className="w-full h-full" />
        </span>
      ))}

      <div className="dd-hud dd-hud--bl">
        {[0, 1, 2].map((i) => (
          <PixelArt key={i} rows={DECOR_ICONS.heart.rows} palette={DECOR_ICONS.heart.palette} className="dd-hud__icon" />
        ))}
        <span className="dd-hud__text">HP 03/03</span>
      </div>

      <div className="dd-hud dd-hud--br">
        <PixelArt rows={DECOR_ICONS.coin.rows} palette={DECOR_ICONS.coin.palette} className="dd-hud__icon" />
        <span className="dd-hud__text">&times;07</span>
        <span className="dd-hud__text dd-hud__dim">SCORE 000120</span>
      </div>

      <div className="dd-inventory">
        {INVENTORY.map((name) => (
          <span key={name} className="dd-slot">
            <PixelArt rows={DECOR_ICONS[name].rows} palette={DECOR_ICONS[name].palette} className="dd-slot__icon" />
          </span>
        ))}
      </div>

      <div className="dd-marquee">
        <div className="dd-marquee__track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>
    </div>
  )
}

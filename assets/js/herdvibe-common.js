/* ============================================
   HERDVIBE COMMON JS v2.2
   - Kakao SDK lazy init (ensureKakao)
   - postMessage clipboard for iframe
   - flashCopied visual feedback
   - Instagram share support
   ============================================ */

const HV = (() => {

  const CONFIG = {
    siteName: 'Herdvibe',
    siteUrl: 'https://herdvibe.com',
    kakaoAppKey: 'a43ed7b39fac35458f4f9df925a279b5',
    ogImage: 'https://raw.githubusercontent.com/kittycapital/kittycapital.github.io/main/assets/herdvibe-og.png',
    shareUrl: '',  // â† ê° ëŒ€ì‹œë³´ë“œì—ì„œ ë®ì–´ì“°ê¸° (ì˜ˆ: HV.CONFIG.shareUrl = 'https://herdvibe.com/28')
  };


  /* ===== KAKAO SDK LAZY INIT ===== */
  function ensureKakao() {
    try {
      if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
        Kakao.init(CONFIG.kakaoAppKey);
      }
      return typeof Kakao !== 'undefined' && Kakao.isInitialized();
    } catch (e) {
      return false;
    }
  }


  /* ===== CLIPBOARD (iframe-safe) ===== */
  function copyToClipboard(text) {
    // postMessage to parent for imweb iframe embedding
    try { window.parent.postMessage({ type: 'clipboard', text: text }, '*'); } catch (e) {}
    // fallback: direct clipboard (works when not in iframe)
    try { navigator.clipboard.writeText(text); } catch (e) {}
  }


  /* ===== FLASH COPIED FEEDBACK ===== */
  function flashCopied(btn) {
    if (!btn) return;
    var orig = btn.innerHTML;
    btn.style.background = '#22c55e';
    btn.style.color = '#fff';
    btn.style.borderColor = '#22c55e';
    var hasLabel = btn.querySelector('.label-text');
    btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M5 13l4 4L19 7"/></svg>'
      + (hasLabel ? '<span class="label-text" style="color:#fff">ë³µì‚¬ë¨!</span>' : '');
    setTimeout(function () {
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
      btn.innerHTML = orig;
    }, 2000);
  }


  /* ===== KAKAO SHARE ===== */
  function kakaoShare(title, desc) {
    var url = CONFIG.shareUrl || window.location.href;
    if (!ensureKakao()) {
      copyToClipboard(url);
      toast('ë§í¬ ë³µì‚¬ì™„ë£Œ! ì¹´ì¹´ì˜¤í†¡ì— ë¶™ì—¬ë„£ê¸° í•˜ì„¸ìš”');
      return;
    }
    try {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title || document.title,
          description: desc || '',
          imageUrl: CONFIG.ogImage,
          link: { mobileWebUrl: url, webUrl: url }
        },
        buttons: [{ title: 'ëŒ€ì‹œë³´ë“œ ë³´ê¸°', link: { mobileWebUrl: url, webUrl: url } }]
      });
    } catch (e) {
      copyToClipboard(url);
      toast('ë§í¬ ë³µì‚¬ì™„ë£Œ! ì¹´ì¹´ì˜¤í†¡ì— ë¶™ì—¬ë„£ê¸° í•˜ì„¸ìš”');
    }
  }


  /* ===== SHARE ì‹¤í–‰ ===== */
  function share(platform, text, btn) {
    var url = CONFIG.shareUrl || window.location.href;
    var t = text || document.title + ' â€” herdvibe.com';
    var eu = encodeURIComponent(url);
    var et = encodeURIComponent(t);

    switch (platform) {
      case 'twitter':
        window.open('https://twitter.com/intent/tweet?text=' + et + '&url=' + eu, '_blank');
        break;
      case 'telegram':
        window.open('https://t.me/share/url?url=' + eu + '&text=' + et, '_blank');
        break;
      case 'kakao':
        kakaoShare(t);
        break;
      case 'instagram':
        copyToClipboard(url);
        flashCopied(btn);
        toast('ë§í¬ ë³µì‚¬ì™„ë£Œ! ì¸ìŠ¤íƒ€ê·¸ëž¨ì— ë¶™ì—¬ë„£ê¸° í•˜ì„¸ìš”');
        break;
      case 'link':
        copyToClipboard(url);
        flashCopied(btn);
        toast('ë§í¬ê°€ ë³µì‚¬ë˜ì—ˆìŠµë‹ˆë‹¤ âœ“');
        break;
    }
  }


  /* ===== HEADER ìƒì„± ===== */
  function renderHeader({ title, category, updateTime } = {}) {
    const h = document.createElement('header');
    h.className = 'hv-header';
    h.innerHTML = `
      <div class="hv-header-inner">
        <div class="hv-header-title">
          <h1>${title || CONFIG.siteName}</h1>
          ${category ? `<span class="hv-header-category">${category}</span>` : ''}
        </div>
        <div class="hv-header-right">
          <div class="hv-update-badge">
            <span class="hv-live-dot"></span>
            <span>${updateTime || 'ì—…ë°ì´íŠ¸ í™•ì¸ ì¤‘...'}</span>
          </div>
        </div>
      </div>`;
    return h;
  }


  /* ===== FOOTER ìƒì„± ===== */
  function renderFooter() {
    const f = document.createElement('footer');
    f.className = 'hv-footer';
    f.innerHTML = `
      <div class="hv-footer-inner">
        <div class="hv-footer-links">
          <a href="${CONFIG.siteUrl}/about.html">ì†Œê°œ</a>
          <a href="${CONFIG.siteUrl}/privacy.html">ê°œì¸ì •ë³´ì²˜ë¦¬ë°©ì¹¨</a>
          <a href="${CONFIG.siteUrl}/terms.html">ì´ìš©ì•½ê´€</a>
          <a href="${CONFIG.siteUrl}/contact.html">ì—°ë½ì²˜</a>
        </div>
        <p class="hv-footer-note">
          ë³¸ ì‚¬ì´íŠ¸ì˜ ëª¨ë“  ì •ë³´ëŠ” íˆ¬ìž ì°¸ê³ ìš©ì´ë©°, íˆ¬ìž ê¶Œìœ ê°€ ì•„ë‹™ë‹ˆë‹¤.
          íˆ¬ìžì˜ ì±…ìž„ì€ ë³¸ì¸ì—ê²Œ ìžˆìœ¼ë©°, ë°ì´í„°ì˜ ì •í™•ì„±ì„ ë³´ìž¥í•˜ì§€ ì•ŠìŠµë‹ˆë‹¤.
          <br>ë°ì´í„° ì¶œì²˜: Yahoo Finance, CoinGecko, FRED, DefiLlama ë“±
        </p>
        <p style="font-size:.688rem;color:var(--hv-text-muted)">Â© ${new Date().getFullYear()} Herdvibe. All rights reserved.</p>
      </div>`;
    return f;
  }


  /* ===== SHARE BAR ìƒì„± ===== */
  const SHARE_ICONS = {
    x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    kakao: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.112 4.508 6.458l-1.148 4.265a.5.5 0 0 0 .764.533l4.94-3.26c.304.02.612.03.936.03 5.523 0 10-3.462 10-7.735C22 6.463 17.523 3 12 3z"/></svg>',
    telegram: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    instagram: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    link: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    capture: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  };

  function renderShareBar({ previewText, shareText } = {}) {
    const bar = document.createElement('div');
    bar.className = 'share-bar';
    const text = (shareText || previewText || document.title + ' â€” herdvibe.com').replace(/'/g, "\\'");
    bar.innerHTML = `
      <div class="share-bar-preview">
        <span>${previewText || ''}</span>${previewText ? ' â€” herdvibe.com' : ''}
      </div>
      <div class="share-bar-buttons">
        <button class="share-btn share-btn--x" onclick="HV.share('twitter','${text}',this)" title="íŠ¸ìœ„í„°ì— ê³µìœ ">
          ${SHARE_ICONS.x}<span class="label-text">íŠ¸ìœ„í„°</span>
        </button>
        <button class="share-btn share-btn--kakao" onclick="HV.share('kakao','${text}',this)" title="ì¹´ì¹´ì˜¤í†¡ìœ¼ë¡œ ê³µìœ ">
          ${SHARE_ICONS.kakao}<span class="label-text">ì¹´ì¹´ì˜¤í†¡</span>
        </button>
        <button class="share-btn share-btn--tg" onclick="HV.share('telegram','${text}',this)" title="í…”ë ˆê·¸ëž¨ìœ¼ë¡œ ê³µìœ ">
          ${SHARE_ICONS.telegram}<span class="label-text">í…”ë ˆê·¸ëž¨</span>
        </button>
        <button class="share-btn share-btn--ig" onclick="HV.share('instagram','${text}',this)" title="ì¸ìŠ¤íƒ€ê·¸ëž¨ ê³µìœ  (ë§í¬ ë³µì‚¬)">
          ${SHARE_ICONS.instagram}<span class="label-text">ì¸ìŠ¤íƒ€</span>
        </button>
        <button class="share-btn share-btn--copy" onclick="HV.share('link','',this)" title="ë§í¬ ë³µì‚¬">
          ${SHARE_ICONS.link}<span class="label-text">ë§í¬ ë³µì‚¬</span>
        </button>
      </div>`;
    return bar;
  }


  /* ===== Chart.js ì›Œí„°ë§ˆí¬ í”ŒëŸ¬ê·¸ì¸ ===== */
  const watermarkPlugin = {
    id: 'herdvibeWatermark',
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      const cx = (chartArea.left + chartArea.right) / 2;
      const cy = (chartArea.top + chartArea.bottom) / 2;
      ctx.save();
      ctx.font = '700 38px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Herdvibe.com', cx, cy);
      ctx.restore();
    }
  };


  /* ===== Chart.js ê³µí†µ í…Œë§ˆ ===== */
  function chartTheme() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { color: '#8a8a8a', font: { family: "'Noto Sans KR',sans-serif", size: 11 }, boxWidth: 10, padding: 14 } },
        tooltip: {
          backgroundColor: 'rgba(10,10,10,0.95)', titleColor: '#e5e5e5', bodyColor: '#8a8a8a',
          borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, cornerRadius: 6, padding: 10,
          titleFont: { family: "'Noto Sans KR',sans-serif", weight: '600', size: 12 },
          bodyFont: { family: "'JetBrains Mono',monospace", size: 11 },
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false }, ticks: { color: '#555', font: { family: "'JetBrains Mono',monospace", size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false }, ticks: { color: '#555', font: { family: "'JetBrains Mono',monospace", size: 10 } } }
      }
    };
  }

  const COLORS = {
    primary: '#3b82f6', secondary: '#8b5cf6', tertiary: '#06b6d4',
    up: '#22c55e', down: '#ef4444', warning: '#f59e0b',
    series: ['#3b82f6','#8b5cf6','#06b6d4','#f59e0b','#ec4899','#22c55e','#f97316','#14b8a6'],
  };


  /* ===== ì—…ë°ì´íŠ¸ ì‹œê°„ ì„¤ì • ===== */
  function setUpdateTime(isoString) {
    const el = document.querySelector('.hv-update-badge span:last-child');
    if (!el) return;
    if (!isoString) { el.textContent = 'ë°ì´í„° ë¡œë”© ì¤‘...'; return; }
    const d = new Date(isoString);
    el.textContent = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} KST`;
  }


  /* ===== OG ë©”íƒ€ íƒœê·¸ ===== */
  function setOG({ title, description, image, url }) {
    const set = (prop, val) => {
      let el = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop}"]`);
      if (!el) { el = document.createElement('meta'); prop.startsWith('og:') ? el.setAttribute('property', prop) : el.setAttribute('name', prop); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };
    const full = `${title} | Herdvibe`;
    set('og:title', full); set('og:description', description || ''); set('og:image', image || CONFIG.ogImage);
    set('og:url', url || location.href); set('og:type', 'website'); set('og:site_name', 'Herdvibe');
    set('twitter:card', 'summary_large_image'); set('twitter:title', full); set('twitter:description', description || ''); set('twitter:image', image || CONFIG.ogImage);
    document.title = full;
  }


  /* ===== íŽ˜ì´ì§€ ì´ˆê¸°í™” ===== */
  function init({ title, category, updateTime, ogDescription, ogImage, shareUrl } = {}) {
    // Kakao SDK init on load
    ensureKakao();
    // Set share URL if provided
    if (shareUrl) CONFIG.shareUrl = shareUrl;
    // Render header & footer
    document.body.insertBefore(renderHeader({ title, category, updateTime }), document.body.firstChild);
    document.body.appendChild(renderFooter());
    if (title) setOG({ title, description: ogDescription, image: ogImage });
  }


  /* ===== í† ìŠ¤íŠ¸ ===== */
  function toast(msg) {
    let c = document.querySelector('.toast-wrap');
    if (!c) { c = document.createElement('div'); c.className = 'toast-wrap'; document.body.appendChild(c); }
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(12px)'; t.style.transition = '.3s'; setTimeout(() => t.remove(), 300); }, 3000);
  }


  /* ===== ìˆ«ìž í¬ë§· ===== */
  function fmtNum(n, { dec = 2, prefix = '', suffix = '', compact = false } = {}) {
    if (n == null || isNaN(n)) return 'â€”';
    if (compact) {
      const a = Math.abs(n);
      if (a >= 1e12) return prefix + (n/1e12).toFixed(1) + 'ì¡°' + suffix;
      if (a >= 1e8)  return prefix + (n/1e8).toFixed(1) + 'ì–µ' + suffix;
      if (a >= 1e4)  return prefix + (n/1e4).toFixed(1) + 'ë§Œ' + suffix;
    }
    return prefix + Number(n).toLocaleString('ko-KR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
  }

  function fmtPct(n, dec = 2) {
    if (n == null || isNaN(n)) return 'â€”';
    return `${n > 0 ? '+' : ''}${Number(n).toFixed(dec)}%`;
  }

  function fmtChange(n) {
    if (n == null || isNaN(n)) return { text: 'â€”', cls: 'flat' };
    return { text: `${n > 0 ? 'â–²' : n < 0 ? 'â–¼' : 'â€”'} ${fmtPct(n)}`, cls: n > 0 ? 'up' : n < 0 ? 'down' : 'flat' };
  }


  /* ===== JSON ë°ì´í„° ë¡œë“œ ===== */
  async function fetchData(url) {
    try { const r = await fetch(url); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); }
    catch (e) { console.error(`Fetch failed: ${url}`, e); toast('ë°ì´í„°ë¥¼ ë¶ˆëŸ¬ì˜¤ëŠ” ë° ì‹¤íŒ¨í–ˆìŠµë‹ˆë‹¤'); return null; }
  }


  /* ===== PUBLIC API ===== */
  return {
    CONFIG, init, renderHeader, renderFooter, renderShareBar,
    share, kakaoShare, copyToClipboard, flashCopied, ensureKakao,
    toast, setUpdateTime, setOG,
    watermarkPlugin, chartTheme, COLORS, SHARE_ICONS,
    fmtNum, fmtPct, fmtChange, fetchData,
  };

})();

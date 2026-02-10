/* ============================================
   HERDVIBE COMMON JS v2.0
   ============================================ */

const HV = (() => {

  const CONFIG = {
    siteName: 'Herdvibe',
    siteUrl: 'https://herdvibe.com',
    kakaoAppKey: '',  // ← 카카오 앱 키 입력
  };


  /* === HEADER 생성 === */
  function renderHeader({ title, category, updateTime } = {}) {
    const h = document.createElement('header');
    h.className = 'hv-header';
    h.innerHTML = `
      <div class="hv-header-inner">
        <a href="${CONFIG.siteUrl}" class="hv-logo">
          <span class="hv-logo-mark"></span>
          <span>Herdvibe</span>
        </a>
        ${title ? `
        <div class="hv-header-center">
          <h1>${title}</h1>
          ${category ? `<span class="hv-header-category">${category}</span>` : ''}
        </div>` : ''}
        <div class="hv-header-right">
          <div class="hv-update-badge">
            <span class="hv-live-dot"></span>
            <span>${updateTime || '업데이트 확인 중...'}</span>
          </div>
        </div>
      </div>`;
    return h;
  }


  /* === FOOTER 생성 === */
  function renderFooter() {
    const f = document.createElement('footer');
    f.className = 'hv-footer';
    f.innerHTML = `
      <div class="hv-footer-inner">
        <div class="hv-footer-brand">Herdvibe</div>
        <div class="hv-footer-links">
          <a href="${CONFIG.siteUrl}/about.html">소개</a>
          <a href="${CONFIG.siteUrl}/privacy.html">개인정보처리방침</a>
          <a href="${CONFIG.siteUrl}/terms.html">이용약관</a>
          <a href="${CONFIG.siteUrl}/contact.html">연락처</a>
        </div>
        <p class="hv-footer-note">
          본 사이트의 모든 정보는 투자 참고용이며, 투자 권유가 아닙니다.
          투자의 책임은 본인에게 있으며, 데이터의 정확성을 보장하지 않습니다.
          <br>데이터 출처: Yahoo Finance, CoinGecko, FRED, DefiLlama 등
        </p>
        <p style="font-size:.688rem;color:var(--hv-text-muted)">© ${new Date().getFullYear()} Herdvibe. All rights reserved.</p>
      </div>`;
    return f;
  }


  /* === SHARE BAR 생성 === */
  function renderShareBar({ previewText, shareText } = {}) {
    const bar = document.createElement('div');
    bar.className = 'share-bar';
    const text = shareText || previewText || document.title + ' — herdvibe.com';
    bar.innerHTML = `
      <div class="share-bar-preview">
        <span>${previewText || ''}</span>${previewText ? ' — herdvibe.com' : ''}
      </div>
      <div class="share-bar-buttons">
        <button class="share-btn share-btn--capture" onclick="HV.toast('차트 이미지 저장됨')" title="차트 이미지로 저장">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <span class="label-text">캡처</span>
        </button>
        <button class="share-btn share-btn--x" onclick="HV.share('twitter','${text.replace(/'/g, "\\'")}')" title="트위터에 공유">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span class="label-text">트위터</span>
        </button>
        <button class="share-btn share-btn--kakao" onclick="HV.share('kakao','${text.replace(/'/g, "\\'")}')" title="카카오톡으로 공유">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.112 4.508 6.458l-1.148 4.265a.5.5 0 0 0 .764.533l4.94-3.26c.304.02.612.03.936.03 5.523 0 10-3.462 10-7.735C22 6.463 17.523 3 12 3z"/></svg>
          <span class="label-text">카카오톡</span>
        </button>
        <button class="share-btn share-btn--tg" onclick="HV.share('telegram','${text.replace(/'/g, "\\'")}')" title="텔레그램으로 공유">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          <span class="label-text">텔레그램</span>
        </button>
        <button class="share-btn share-btn--copy" onclick="HV.share('link')" title="링크 복사">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="label-text">링크 복사</span>
        </button>
      </div>`;
    return bar;
  }


  /* === 공유 실행 === */
  function share(platform, text) {
    const url = window.location.href;
    const t = text || document.title + ' — herdvibe.com';
    switch (platform) {
      case 'link':
        navigator.clipboard.writeText(url).then(() => toast('링크가 복사되었습니다'));
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(url)}`, '_blank', 'width=550,height=420');
        break;
      case 'kakao':
        if (window.Kakao && Kakao.isInitialized()) {
          Kakao.Share.sendDefault({
            objectType: 'feed',
            content: { title: document.title, description: t, imageUrl: `${CONFIG.siteUrl}/assets/images/og-default.png`, link: { mobileWebUrl: url, webUrl: url } },
            buttons: [{ title: '대시보드 보기', link: { mobileWebUrl: url, webUrl: url } }]
          });
        } else {
          navigator.clipboard.writeText(`${t}\n${url}`);
          toast('카카오톡 공유 텍스트가 복사되었습니다');
        }
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(t)}`, '_blank');
        break;
    }
  }


  /* === Chart.js 워터마크 플러그인 === */
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


  /* === Chart.js 공통 테마 === */
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


  /* === 업데이트 시간 설정 === */
  function setUpdateTime(isoString) {
    const el = document.querySelector('.hv-update-badge span:last-child');
    if (!el) return;
    if (!isoString) { el.textContent = '데이터 로딩 중...'; return; }
    const d = new Date(isoString);
    el.textContent = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} KST`;
  }


  /* === OG 메타 태그 === */
  function setOG({ title, description, image, url }) {
    const set = (prop, val) => {
      let el = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop}"]`);
      if (!el) { el = document.createElement('meta'); prop.startsWith('og:') ? el.setAttribute('property', prop) : el.setAttribute('name', prop); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };
    const full = `${title} | Herdvibe`;
    set('og:title', full); set('og:description', description || ''); set('og:image', image || `${CONFIG.siteUrl}/assets/images/og-default.png`);
    set('og:url', url || location.href); set('og:type', 'website'); set('og:site_name', 'Herdvibe');
    set('twitter:card', 'summary_large_image'); set('twitter:title', full); set('twitter:description', description || ''); set('twitter:image', image || `${CONFIG.siteUrl}/assets/images/og-default.png`);
    document.title = full;
  }


  /* === 페이지 초기화 === */
  function init({ title, category, updateTime, ogDescription, ogImage } = {}) {
    document.body.insertBefore(renderHeader({ title, category, updateTime }), document.body.firstChild);
    document.body.appendChild(renderFooter());
    if (title) setOG({ title, description: ogDescription, image: ogImage });
  }


  /* === 토스트 === */
  function toast(msg) {
    let c = document.querySelector('.toast-wrap');
    if (!c) { c = document.createElement('div'); c.className = 'toast-wrap'; document.body.appendChild(c); }
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(12px)'; t.style.transition = '.3s'; setTimeout(() => t.remove(), 300); }, 3000);
  }


  /* === 숫자 포맷 === */
  function fmtNum(n, { dec = 2, prefix = '', suffix = '', compact = false } = {}) {
    if (n == null || isNaN(n)) return '—';
    if (compact) {
      const a = Math.abs(n);
      if (a >= 1e12) return prefix + (n/1e12).toFixed(1) + '조' + suffix;
      if (a >= 1e8)  return prefix + (n/1e8).toFixed(1) + '억' + suffix;
      if (a >= 1e4)  return prefix + (n/1e4).toFixed(1) + '만' + suffix;
    }
    return prefix + Number(n).toLocaleString('ko-KR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
  }

  function fmtPct(n, dec = 2) {
    if (n == null || isNaN(n)) return '—';
    return `${n > 0 ? '+' : ''}${Number(n).toFixed(dec)}%`;
  }

  function fmtChange(n) {
    if (n == null || isNaN(n)) return { text: '—', cls: 'flat' };
    return { text: `${n > 0 ? '▲' : n < 0 ? '▼' : '—'} ${fmtPct(n)}`, cls: n > 0 ? 'up' : n < 0 ? 'down' : 'flat' };
  }


  /* === JSON 데이터 로드 === */
  async function fetchData(url) {
    try { const r = await fetch(url); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); }
    catch (e) { console.error(`Fetch failed: ${url}`, e); toast('데이터를 불러오는 데 실패했습니다'); return null; }
  }


  /* === PUBLIC === */
  return {
    CONFIG, init, renderHeader, renderFooter, renderShareBar,
    share, toast, setUpdateTime, setOG,
    watermarkPlugin, chartTheme, COLORS,
    fmtNum, fmtPct, fmtChange, fetchData,
  };

})();

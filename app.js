document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

(function(){
  const GA_MEASUREMENT_ID='G-0RK2GX97PW';
  const CONSENT_KEY='dovrsi_cookie_consent_v1';
  const GA_SCRIPT_ID='dovrsi-ga4-script';

  function loadAnalytics(){
    if(!GA_MEASUREMENT_ID || document.getElementById(GA_SCRIPT_ID)) return;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments);};
    const s=document.createElement('script'); s.async=true; s.id=GA_SCRIPT_ID;
    s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(s);
    gtag('js',new Date());
    gtag('config',GA_MEASUREMENT_ID,{anonymize_ip:true});
  }
  function track(name,params){ if(typeof window.gtag==='function') window.gtag('event',name,params||{}); }

  const consent=localStorage.getItem(CONSENT_KEY);
  if(consent==='analytics') loadAnalytics();

  // Contact form -> mail client
  const form=document.querySelector('#upit-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const data=new FormData(form);
      const subject='DOVRŠI – novi upit za montažu';
      const body=['Ime: '+(data.get('ime')||''),'Telefon ili e-mail: '+(data.get('kontakt')||''),'Usluga: '+(data.get('usluga')||''),'Lokacija: '+(data.get('lokacija')||''),'','Opis / popis radova:',data.get('poruka')||''].join('\n');
      track('generate_lead',{method:'contact_form',service:data.get('usluga')||''});
      window.location.href='mailto:difference.usluge@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      const msg=document.querySelector('#form-msg');
      if(msg){msg.hidden=false;msg.textContent='Otvaramo vaš program za e-mail s pripremljenim upitom.';}
    });
  }

  // Inject the same cookie banner on every page without changing the site layout.
  function ensureBanner(){
    if(document.getElementById('cookie-banner')) return document.getElementById('cookie-banner');
    const b=document.createElement('div'); b.id='cookie-banner'; b.className='cookie-banner'; b.setAttribute('role','dialog'); b.setAttribute('aria-label','Postavke kolačića');
    const policyHref=location.pathname.includes('/usluge/')?'../kolacici.html':'kolacici.html';
    b.innerHTML='<p><strong>Kolačići:</strong> Koristimo nužne tehnologije za rad stranice. Google Analytics 4 aktivira se samo ako prihvatite analitičke kolačiće. <a href="'+policyHref+'" style="text-decoration:underline">Saznajte više</a>.</p><div class="cookie-actions"><button class="cookie-more" type="button" data-cookie-essential>Samo nužni</button><button class="cookie-ok" type="button" data-cookie-analytics>Prihvati analitiku</button></div>';
    document.body.appendChild(b);
    b.querySelector('[data-cookie-essential]').addEventListener('click',()=>{localStorage.setItem(CONSENT_KEY,'essential');b.hidden=true;track('cookie_consent',{choice:'essential'});});
    b.querySelector('[data-cookie-analytics]').addEventListener('click',()=>{localStorage.setItem(CONSENT_KEY,'analytics');b.hidden=true;loadAnalytics();track('cookie_consent',{choice:'analytics'});});
    return b;
  }
  const banner=ensureBanner();
  if(consent==='essential'||consent==='analytics') banner.hidden=true;

  // Analytics-friendly outbound conversion clicks.
  document.addEventListener('click',function(e){
    const a=e.target.closest('a'); if(!a) return;
    const href=a.getAttribute('href')||'';
    if(href.startsWith('mailto:')) track('contact_click',{method:'email'});
    else if(href.includes('wa.me')) track('contact_click',{method:'whatsapp'});
    else if(href.startsWith('tel:')) track('contact_click',{method:'phone'});
  });
})();

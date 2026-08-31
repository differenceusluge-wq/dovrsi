document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

(function(){
  const form=document.querySelector('#upit-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const data=new FormData(form);
      const subject='DOVRŠI – novi upit za montažu';
      const body=[
        'Ime: '+(data.get('ime')||''),
        'Telefon ili e-mail: '+(data.get('kontakt')||''),
        'Usluga: '+(data.get('usluga')||''),
        'Lokacija: '+(data.get('lokacija')||''),
        '',
        'Opis / popis radova:',
        data.get('poruka')||''
      ].join('\n');
      const url='mailto:difference.usluge@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      window.location.href=url;
      const msg=document.querySelector('#form-msg');
      if(msg){msg.hidden=false;msg.textContent='Otvaramo vaš program za e-mail s pripremljenim upitom.';}
    });
  }
  const banner=document.getElementById('cookie-banner');
  const ok=document.getElementById('cookie-ok');
  if(banner && ok){
    if(localStorage.getItem('dovrsi_cookie_notice')==='1') banner.hidden=true;
    ok.addEventListener('click',function(){localStorage.setItem('dovrsi_cookie_notice','1');banner.hidden=true;});
  }
})();

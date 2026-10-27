(function(){
  var PHONE='010-8209-6615';
  // before-after slider (main page)
  var r=document.getElementById('baRange');
  if(r){
    var a=document.getElementById('baAfter'),b=document.getElementById('baBar'),k=document.getElementById('baKnob');
    var set=function(v){a.style.clipPath='inset(0 0 0 '+v+'%)';b.style.left=v+'%';k.style.left=v+'%';};
    r.addEventListener('input',function(){set(r.value)});set(r.value);
  }
  // mobile menu
  var btn=document.getElementById('menuBtn'),m=document.getElementById('mnav');
  if(btn&&m){btn.addEventListener('click',function(){var o=m.classList.toggle('open');btn.setAttribute('aria-expanded',o)});}
  // header border on scroll
  var hd=document.getElementById('hd');
  if(hd){window.addEventListener('scroll',function(){hd.classList.toggle('scrolled',window.scrollY>8)},{passive:true});}
  // sms: prefill inquiry form (iOS uses '&', others use '?')
  var SMS_BODY=['[정도클린 예약문의]','1. 지역: ','2. 평수: ','3. 청소 형태: (입주/이사/사이/가정/사무실·상가)','4. 희망 날짜: (여러 날짜 가능)','5. 희망 시간: (오전/오후/이사 시간 등)','6. 추가 요청: (외부 유리창·심한 곰팡이·스티커·실리콘 제거·새집증후군 시공)','7. 문의사항: '].join('\n');
  var ua=navigator.userAgent||'';
  var isIOS=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var smsHref='sms:'+PHONE+(isIOS?'&':'?')+'body='+encodeURIComponent(SMS_BODY);
  document.querySelectorAll('a.sms').forEach(function(el){el.setAttribute('href',smsHref);});
  // PC: phone/sms links copy the number
  var toast=document.getElementById('toast'),tm;
  function show(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(tm);tm=setTimeout(function(){toast.classList.remove('show')},2600);}
  function copy(t){
    if(navigator.clipboard&&navigator.clipboard.writeText){return navigator.clipboard.writeText(t);}
    return new Promise(function(res,rej){var x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy');res();}catch(e){rej(e);}document.body.removeChild(x);});
  }
  var desktop=window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(desktop){
    document.querySelectorAll('a.tel,a.sms').forEach(function(el){
      el.addEventListener('click',function(e){
        e.preventDefault();
        copy(PHONE).then(function(){show('전화번호 '+PHONE+' 가 복사되었습니다 · 상담 07:00~23:00');})
          .catch(function(){show('정도클린 상담 전화 '+PHONE+' (07:00~23:00)');});
      });
    });
  }
  // portfolio filter
  var tabs=document.querySelectorAll('.f-tab');
  if(tabs.length){
    var cards=document.querySelectorAll('[data-cat]');
    tabs.forEach(function(t){t.addEventListener('click',function(){
      tabs.forEach(function(x){x.setAttribute('aria-pressed',x===t?'true':'false')});
      var f=t.getAttribute('data-filter');
      cards.forEach(function(c){c.hidden=!(f==='all'||c.getAttribute('data-cat')===f);});
    });});
  }
  // lightbox
  var lb=document.getElementById('lightbox');
  if(lb){
    var li=document.getElementById('lbImg'),lc=document.getElementById('lbCap');
    document.querySelectorAll('[data-zoom]').forEach(function(z){
      z.addEventListener('click',function(){var im=z.querySelector('img');li.src=im.src;li.alt=im.alt;lc.textContent=z.getAttribute('data-zoom');lb.classList.add('open');document.body.style.overflow='hidden';});
    });
    var close=function(){lb.classList.remove('open');li.removeAttribute('src');document.body.style.overflow='';};
    document.getElementById('lbClose').addEventListener('click',close);
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))close();});
  }
})();

(function(){chrome.runtime.sendMessage({action:'trackPageview',page:'options.html'});for(var a,b=document.getElementsByTagName('*'),c=0,d=b.length;c<d;c++)a=b[c],a.dataset&&a.dataset.message&&(a.innerText=chrome.i18n.getMessage(a.dataset.message));var e=document.getElementById('statistics');chrome.storage.sync.get('statistics',function(a){e.checked=!!a.statistics}),e.addEventListener('change',function(){this.checked?chrome.storage.sync.set({statistics:!0},function(){chrome.runtime.sendMessage({action:'trackEvent',args:['Settings','Statistics','1']})}):chrome.runtime.sendMessage({action:'trackEvent',args:['Settings','Statistics','0']},function(){chrome.storage.sync.set({statistics:!1})})},this);var f=document.getElementById('hide_update_tab');chrome.storage.sync.get('hide_update_tab',function(a){f.checked=!!a.hide_update_tab}),f.addEventListener('change',function(){this.checked?(chrome.storage.sync.set({hide_update_tab:!0}),chrome.runtime.sendMessage({action:'trackEvent',args:['Settings','HideUpdateTab','1']})):(chrome.storage.sync.set({hide_update_tab:!1}),chrome.runtime.sendMessage({action:'trackEvent',args:['Settings','HideUpdateTab','0']}))})})();
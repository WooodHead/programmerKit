(function(){chrome.runtime.sendMessage({action:'trackPageview',page:'update.html'});for(var a,b=document.getElementsByTagName('*'),c=0,d=b.length;c<d;c++)a=b[c],a&&a.dataset&&a.dataset.message&&(a.innerHTML=chrome.i18n.getMessage(a.dataset.message));for(var e,f=document.getElementsByTagName('a'),c=0,d=f.length;c<d;c++)e=f[c],e.addEventListener('click',function(a){a.preventDefault(),chrome.tabs.create({url:this.href}),chrome.runtime.sendMessage({action:'trackEvent',args:['Link','click',this.href]})},!1);var g=document.querySelector('h1'),h='',i='';'#install'===location.hash?(i=chrome.i18n.getMessage('updatePageTitleInstall'),h=chrome.i18n.getMessage('updatePageHeaderInstall')):'#update'===location.hash?(h=chrome.i18n.getMessage('updatePageHeader',chrome.runtime.getManifest().version),i=chrome.i18n.getMessage('updatePageTitle')):(i=chrome.i18n.getMessage('extName'),h=chrome.i18n.getMessage('extName')),g.innerHTML=h,document.title=i;var j=document.getElementById('noshow_checkbox');j.addEventListener('change',function(){this.checked?(chrome.storage.sync.set({hide_update_tab:!0}),chrome.runtime.sendMessage({action:'trackEvent',args:['Settings','HideUpdateTab','1']})):(chrome.storage.sync.set({hide_update_tab:!1}),chrome.runtime.sendMessage({action:'trackEvent',args:['Settings','HideUpdateTab','0']}))})})();
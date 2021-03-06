export default {

  setHome: () => {
    var url = window.location;
    try {
      document.style.behavior = "url(#default#homepage)";
      document.setHomePage(url);
    } catch (e) {
      if (window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege(
            "UniversalXPConnect"
          );
        } catch (e) {
          alert(
            "此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'"
          );
        }
        var prefs = Components.classes[
          "@mozilla.org/preferences-service;1"
        ].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref("browser.startup.homepage",url);
      } 
      else {
        alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入：" + url + "点击确定。");
      }
    }
  },
  addFavorite: () => {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
      alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    } else if (ua.indexOf("msie 8") > -1) {
      window.external.AddToFavoritesBar(url, title); //IE8
    } else if (document.all) {
      try {
        window.external.addFavorite(url, title);
      } catch (e) {
        alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
      }
    } else if (window.sidebar) {
      window.sidebar.addPanel(title, url, "");
    } else {
      alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
    }
  }
};
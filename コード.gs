function doPost(e) {
  try {
    var res = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    
    if (res.action === "save") {
      props.setProperty("USER_" + res.code, JSON.stringify(res.data));
      return ContentService.createTextOutput(JSON.stringify({status: "success"}))
                           .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (res.action === "load") {
      var data = props.getProperty("USER_" + res.code);
      if (data) {
        return ContentService.createTextOutput(JSON.stringify({status: "success", data: JSON.parse(data)}))
                             .setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({status: "failed", message: "アカウントコードが見つかりません"}))
                             .setMimeType(ContentService.MimeType.JSON);
      }
    }
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: err.toString()}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('進数ツムツム')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

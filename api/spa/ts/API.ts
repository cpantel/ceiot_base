interface GETResponseListener {
  handleGETResponse(status:number, response:string, url:string): void;
}

class API{

  requestGET(url:string, listener: GETResponseListener):void {
    let xhr:XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          listener.handleGETResponse(xhr.status,xhr.responseText, url);
        } else {
          listener.handleGETResponse(xhr.status,null,url);
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send(null);
  }
}

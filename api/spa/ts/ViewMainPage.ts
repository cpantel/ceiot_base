class ViewMainPage {
    showDevices(list:DeviceInt[],element:Main):void {

      let e:HTMLElement = document.getElementById("devicesList");
      e.innerHTML="";
      for (let device of list) {
          let image = "temp.png";
          e.innerHTML += `<li class="collection-item avatar">
            <img src="images/${image}" alt="" class="circle">
            <span class="title">${device.name}</span>
            <p>id: ${device.device_id}</p>
            <p>key: ${device.key}</p>
          </li>  
          `;
      }
    }
    showMeasurements(list:MeasurementInt[],element:Main):void {

      let e:HTMLElement = document.getElementById("measurementsList");
      e.innerHTML="";
      for (let measurement of list) {
          let image = "temp.png";
          e.innerHTML += `<li class="collection-item avatar">
            <img src="images/${image}" alt="" class="circle">
            <span class="title">${measurement._id}</span>
            <p>id: ${measurement.id}</p>
            <p>t: ${measurement.t}</p>
            <p>h: ${measurement.h}</p>
          </li>  
          `;
      }
    }
}

let count = 1;

function initMap() {
    // 초기 위치 설정 (서울 시청)
    var seoulCityHall = {lat: 37.5665, lng: 126.9780};
    
    // 맵 생성
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13, // 확대 수준
      center: seoulCityHall // 초기 중심 위치
    });

  }

function mapbtn(){
    let mapwindow = document.getElementById('map-header');
    mapwindow.classList.add('movedmap');
    mapwindow.classList.add('maphome');
    if(count%2==0){
        mapwindow.classList.toggle('movedmap');
        count=count+1
    }
    else if(count%2==1){
        mapwindow.classList.toggle('maphome');
        count=count+1
    }
    console.log(count)
}
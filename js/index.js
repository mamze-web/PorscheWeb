
        
  const csvFiles = [
    './doc/1.csv',
    '/doc/2.csv'
    // 여기에 필요한 만큼의 파일을 추가할 수 있습니다
];

// 열의 인덱스와 이름을 설정합니다

        var selectedMarker = null; // 선택된 마커를 저장하는 전역 변수
        var myChart = null; // 그래프를 저장하는 전역 변수
        var map; // 지도 객체를 변수로 선언
        var markers = []; // 마커 객체를 배열로 선언
        var geocoder; // Geocoder 객체를 변수로 선언
        var infoWindow; // 정보 윈도우를 변수로 선언
        var markerCluster; // 마커 클러스터러 객체를 변수로 선언
        var pinData = [
            {
                address: "서울특별시 고려대학교 서울캠퍼스",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy3Ig2hyup0c_HexEZTYOqkIywU84F0FG1Qg&s",
                csvFilePath: "./doc/1.csv"
            },
            {
                address: "서울특별시 미래산업과학고등학교",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFhO56j80uvEsF7UNrS52Cp8vODlRJlX8cg&s",
                csvFilePath: "./doc/2.csv"
            },
            {
                address: "수원역",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRwGhyqyLhhjdAqsvIKr5xEze6cu9dAACZw&s",
                csvFilePath: "./doc/2.csv"
            },
            
            {
                address: "제주공항",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKUPPs9aIw3r2iLX-Q1Hv5Wgl7GKCQR1Apg&s",
                csvFilePath: "./doc/2.csv"
            },
            {
                address: "제주 국밥",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKUPPs9aIw3r2iLX-Q1Hv5Wgl7GKCQR1Apg&s",
                csvFilePath: "./doc/2.csv"
            },
            {
                address: "강원도",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPdO_UPgR6CdcfgwmOsxZkoimUUvPf6Wf6bA&s",
                csvFilePath: "./doc/2.csv"
            },
            {
                address: "강원랜드",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPdO_UPgR6CdcfgwmOsxZkoimUUvPf6Wf6bA&s",
                csvFilePath: "./doc/2.csv"
            },
        ];
       
        function initMap() {
            // 지도를 생성
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 37.584182, lng: 127.024492}, // 초기 위치 설정
                zoom: 10, // 확대 수준
                mapTypeId: 'roadmap'
            });

            // Geocoder 객체를 생성
            geocoder = new google.maps.Geocoder();

            // 정보 윈도우를 생성
            infoWindow = new google.maps.InfoWindow();

            // 클러스터러를 생성
            markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'http://www.empowervate.org/wp-content/uploads/2015/11/circle.jpg'});
          
            
            // 각 주소에 대해 마커 표시
            pinData.forEach(function(data) {
                geocoder.geocode({'address': data.address}, function(results, status) {
                    if (status === 'OK') {
                        var location = results[0].geometry.location;
                        placeMarker(location, data);
                    } else {
                        console.error('Error geocoding address:', data.address);
                    }
                });
            });
        }
 
        function placeMarker(location, data) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: {
                    url: 'https://firebasestorage.googleapis.com/v0/b/microschool-gongdo.appspot.com/o/prod%2Fres%2FPorsche%20web%2Ftest%2Fbee.png?alt=media&token=1ec62c16-c7b7-45e2-a9e5-0f5b0e286dbe', // 빨간색 마커 이미지
                    labelOrigin: new google.maps.Point(32,33),
                    scaledSize: new google.maps.Size(40, 40)
                    
                }
            });
        

            // 마커 클릭 시 정보 창 열기
            marker.addListener('click', function() {
                // 선택된 마커 업데이트
                selectedMarker = marker;
        
                // 정보창 업데이트
                var contentString = '<h1>' + data.address + '</h1>' + '<div id="content">' +
                    '<img src="' + data.imageUrl + '" alt="이미지">' +
                    '</p>' +
                    '</div>';
                document.getElementById("maptext").innerHTML = contentString;
        
                // CSV 데이터 불러오기 및 그래프 업데이트
                if (data.csvFilePath) {
                    fetch(data.csvFilePath)
                        .then(response => response.text())
                        .then(csvData => {
                            updateChart(csvData);
                        })
                        .catch(error => console.error('Error fetching CSV data:', error));
                } else {
                    clearChart(); // CSV 파일 경로가 없으면 그래프를 지웁니다.
                }
            });
        
        markerCluster.addMarker(marker);
        }
        
        function updateChart(csvData) {
            clearChart();
        
            const labels = [];
            const values = [];
            const labels2 = [];
            const values2 = [];
            const rows = csvData.split('\n').slice(1); // 헤더를 건너뜁니다.
            rows.forEach(row => {
                const [time, temp,humidity] = row.split(',');
                labels.push(time);
                values.push(parseFloat(temp));
            });
           
            const ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
        
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Temp',
                        data: values,
        
                        backgroundColor: 'rgba(39,86,246, 0.2)',
                        borderColor: 'rgba(39,86,246, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            const rows2 = csvData.split('\n').slice(1); // 헤더를 건너뜁니다.
            rows.forEach(row => {
                const [time,temp ,humidity] = row.split(',');
                labels2.push(time);
                values2.push(parseFloat(humidity));
            });
            const ctx2 = document.getElementById('myChart2').getContext('2d');
            myChart2 = new Chart(ctx2, {
                type: 'line',
        
                data: {
                    labels: labels2,
                    datasets: [{
                        label: 'huminity',
                        data: values2,
                        backgroundColor: 'rgba(255,56,155, 0.2)',
                        borderColor: 'rgba(255,56,155, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });    
        }
        
        
        // 그래프 초기화 함수
        function clearChart() {
            if (myChart) {
                myChart.destroy(); // 이전 차트 파괴
                myChart2.destroy();
            }
        }
        

        function findCurrentLocation() {
            // HTML5의 Geolocation으로 사용자의 현재 위치를 얻어옵니다.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    // 현재 위치로 지도 이동
                    map.setCenter(pos);

                    // 현재 위치에 마커 표시
                    var currentLocationMarker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "현재 위치"
                    });

                    // 정보 창 열기
                    var contentString = '<h1>현재 위치</h1>' +
                        '<p>위도: ' + pos.lat + '<br>경도: ' + pos.lng + '</p>';
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, currentLocationMarker);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // 브라우저가 Geolocation을 지원하지 않을 때의 처리
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }
        
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Geolocation이 활성화되지 않았습니다.' :
                '브라우저가 Geolocation을 지원하지 않습니다.');
            infoWindow.open(map);
        }

        initMap();
      
        
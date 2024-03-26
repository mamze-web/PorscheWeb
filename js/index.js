

var map; // 지도 객체를 변수로 선언
        var markers = []; // 마커 객체를 배열로 선언
        var geocoder; // Geocoder 객체를 변수로 선언
        var infoWindow; // 정보 윈도우를 변수로 선언
        var markerCluster; // 마커 클러스터러 객체를 변수로 선언

        // 핀에 대한 데이터 객체 생성
        var pinData = [
            {
                address: "서울특별시 고려대학교 서울캠퍼스",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGSgEtf5glS_6Ul-iCizK7DSQcUubNcHHPQA&s" // 첫 번째 핀에 대한 이미지 URL
            },
            {
                address: "서울특별시 미래산업과학고등학교",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFhO56j80uvEsF7UNrS52Cp8vODlRJlX8cg&s" // 두 번째 핀에 대한 이미지 URL
            },
            {
                address: "수원역",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRwGhyqyLhhjdAqsvIKr5xEze6cu9dAACZw&s" // 두 번째 핀에 대한 이미지 URL
            },
            {
                address: "수원국밥",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRwGhyqyLhhjdAqsvIKr5xEze6cu9dAACZw&s" // 두 번째 핀에 대한 이미지 URL
            },
            {
                address: "제주공항",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKUPPs9aIw3r2iLX-Q1Hv5Wgl7GKCQR1Apg&s" // 두 번째 핀에 대한 이미지 URL
            },{
                address: "제주 국밥",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKUPPs9aIw3r2iLX-Q1Hv5Wgl7GKCQR1Apg&s" // 두 번째 핀에 대한 이미지 URL
            },
            {
                address: "강원도",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPdO_UPgR6CdcfgwmOsxZkoimUUvPf6Wf6bA&s" // 두 번째 핀에 대한 이미지 URL
            },
            {
                address: "강원랜드",
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPdO_UPgR6CdcfgwmOsxZkoimUUvPf6Wf6bA&s" // 두 번째 핀에 대한 이미지 URL
            },
            
        ];

        function initMap() {
            // 지도를 생성
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 37.584182, lng: 127.024492}, // 초기 위치 설정
                zoom: 5, // 확대 수준
                mapTypeId: 'roadmap'
            });

            // Geocoder 객체를 생성
            geocoder = new google.maps.Geocoder();

            // 정보 윈도우를 생성
            infoWindow = new google.maps.InfoWindow();

            // 클러스터러를 생성
            markerCluster = new MarkerClusterer(map, [], {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' ,

            });

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
            // 새로운 마커를 생성하고 지도에 추가
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });

            // 마커 클릭 시 정보 창 열기
            marker.addListener('click', function() {
                // 여기서는 해당 핀에 대한 데이터의 이미지 URL을 가져와서 InfoWindow에 표시합니다.
                var contentString = '<div id="content">' +
                    '<img src="' + data.imageUrl + '" alt="이미지">'+'<br>위치:' + data.address +
                    '<p>위도: ' + location.lat() + '<br>경도: ' + location.lng() + '</p>' +
                    '</div>';
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
            });

            // 마커를 클러스터에 추가
            markerCluster.addMarker(marker);
        }

        initMap();
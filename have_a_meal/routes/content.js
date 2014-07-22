/**
 * Created by ChiHwan on 2014. 7. 13..
 */

var hotContentList = [
    { id : 1, userId: 'clghks@gmail.com', isPublicity: true, recruitStartDateTime: new Date(2014,3,24), recruitEndDateTime: new Date, foodType: 1, subject: '[앵콜 89차] 火를 태우는 火요일의 점심식사_스트레스 너 따위', contents: '열심히 일한 당신\n열심히 공부한 당신\n혹시 당신도 번아웃 증후군?? ', gpsX:1000.00, gpsY:2222.00, meetingDateTime: new Date, count: 10, fee: 20000, joinUsers: 'aaaaa', attachedFile: 'hi~~', imgUrl: 'http://www.zipbob.net/uploads/dining/photo/image/7b/a2/53b38a0ae76f68c52700000f/large_IMG_0782.jpg'},
    { id : 2, userId: 'choi@gmail.com', isPublicity: true, recruitStartDateTime: new Date(2014,3,24), recruitEndDateTime: new Date, foodType: 1, subject: '[앵콜 1차] 들어는 보았나? 오븐족발과 함께하는 바베큐 파티!', contents: '안녕하세요.\n어느덧 여름의 시작에 서 있는 7월입니다!\n본격적인 여름을 앞두고 색다른 체험을 즐겨보는 건 어떠세요?', gpsX:1000.00, gpsY:2222.00, meetingDateTime: new Date, count: 10, fee: 20000, joinUsers: 'aaaaa', attachedFile: 'hi~~', imgUrl:'http://www.zipbob.net/uploads/dining/photo/image/5c/69/53bbba08e76f681e09000006/large_1.png'},
    { id : 3, userId: 'chchoi@gmail.com', isPublicity: true, recruitStartDateTime: new Date(2014,3,24), recruitEndDateTime: new Date, foodType: 1, subject: '테로 16회 쉐프와 흑돼지 미담 함께 먹으러 가요', contents: '둘이 먹긴 너무 아쉬운 맛집 탐방입니다\n맛집에 갈 때마다 "아, 여길 여러명이 왔으면 더 많은 메뉴를 먹었을 텐데"하며 아쉬운 적 많이 있으시죠?', gpsX:1000.00, gpsY:2222.00, meetingDateTime: new Date, count: 10, fee: 20000, joinUsers: 'aaaaa', attachedFile: 'hi~~', imgUrl:'http://www.zipbob.net/uploads/dining/photo/image/db/33/53bbc370e76f68efc6000006/large_%EB%AF%B8%EB%9E%98%EC%86%8C%EB%85%84.jpg'},
];

var contentList = [
    { id : 1, userId: 'clghks@gmail.com', isPublicity: true, recruitStartDateTime: new Date(2014,3,24), recruitEndDateTime: new Date, foodType: 1, subject: '[앵콜 89차] 火를 태우는 火요일의 점심식사_스트레스 너 따위', contents: '열심히 일한 당신\n열심히 공부한 당신\n혹시 당신도 번아웃 증후군?? ', gpsX:1000.00, gpsY:2222.00, meetingDateTime: new Date, count: 10, fee: 20000, joinUsers: 'aaaaa', attachedFile: 'hi~~', imgUrl: 'http://www.zipbob.net/uploads/dining/photo/image/7b/a2/53b38a0ae76f68c52700000f/large_IMG_0782.jpg'},
    { id : 2, userId: 'choi@gmail.com', isPublicity: true, recruitStartDateTime: new Date(2014,3,24), recruitEndDateTime: new Date, foodType: 1, subject: '[앵콜 1차] 들어는 보았나? 오븐족발과 함께하는 바베큐 파티!', contents: '안녕하세요.\n어느덧 여름의 시작에 서 있는 7월입니다!\n본격적인 여름을 앞두고 색다른 체험을 즐겨보는 건 어떠세요?', gpsX:1000.00, gpsY:2222.00, meetingDateTime: new Date, count: 10, fee: 20000, joinUsers: 'aaaaa', attachedFile: 'hi~~', imgUrl:'http://www.zipbob.net/uploads/dining/photo/image/5c/69/53bbba08e76f681e09000006/large_1.png'},
    { id : 3, userId: 'chchoi@gmail.com', isPublicity: true, recruitStartDateTime: new Date(2014,3,24), recruitEndDateTime: new Date, foodType: 1, subject: '테로 16회 쉐프와 흑돼지 미담 함께 먹으러 가요', contents: '둘이 먹긴 너무 아쉬운 맛집 탐방입니다\n맛집에 갈 때마다 "아, 여길 여러명이 왔으면 더 많은 메뉴를 먹었을 텐데"하며 아쉬운 적 많이 있으시죠?', gpsX:1000.00, gpsY:2222.00, meetingDateTime: new Date, count: 10, fee: 20000, joinUsers: 'aaaaa', attachedFile: 'hi~~', imgUrl:'http://www.zipbob.net/uploads/dining/photo/image/db/33/53bbc370e76f68efc6000006/large_%EB%AF%B8%EB%9E%98%EC%86%8C%EB%85%84.jpg'},
];

exports.hotList = function(req, res){
    res.send(hotContentList);
};

exports.contentList = function(req, res){
    res.send(contentList);
};

const util ={
	  getNowDate(item){
        if(item==""|| item == "undefined" || item == undefined){
            var date = new Date();
        }else{
             var date = new Date(item);
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var nowdate = year + '-' + month + '-' + strDate
        return nowdate;
    },
    getNowTime(item){
        if(item==""|| item == "undefined" || item == undefined){
            var date = new Date();
        }else{
             var date = new Date(item);
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        var Minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (month >= 0 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (Minutes >= 0 && Minutes <= 9) {
            Minutes = "0" + Minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var nowdate = year + '-' + month + '-' + strDate +' ' + hour +':' + Minutes +':'+seconds
        return nowdate;
    },
    getImgUrl(){
    	return 'http://dphp.yysoul.com/img/';
    },
    getDefaultSrc(){
//  	return 'https://www.case-cloud.com/';
    	return 'https://www.ecase-study.com/';
//  	return 'http://39.106.115.99/';
    }
}
export default util

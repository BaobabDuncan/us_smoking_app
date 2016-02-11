settingDB();

function settingDB() {
	myDBHandler = new DBHandler(databaseOptions);
	myDBHandler.connectDB();
	myDBHandler.createSettingTable();
	myDBHandler.createProductTable();
	myDBHandler.createStatementTable();
}

function dropAllDB() {
	myDBHandler.dropTable('product');
	myDBHandler.dropTable('setting');
	myDBHandler.dropTable('statement');
}

function clone(obj) {
	if(typeof(obj) != 'object') return obj;
	if(obj == null) return obj;
	
	var newObj = new Object();
	for(var i in obj) newObj[i] = clone(obj[i]);
	return newObj;
};

function getJqtCurrentPageWrapper(pageId) {
	var wrapperPage = pageId+'-wrapper';
	return wrapperPage;
};

function emptyHTML(Id){
	$(Id).empty();
};

function goToPage(pageId,event,reverse) {	
	if (event==null) event='';
	if (reverse==null) reverse=false;
	jQT.goTo(pageId,event,reverse);	
};

function getToDayDate(){
	var today = new Date();
	var s = leadingZeros(today.getFullYear(), 4) + '-' +
		leadingZeros(today.getMonth() + 1, 2) + '-' +
		leadingZeros(today.getDate(), 2);
	return s;
}
function getNextUpdateDate(){
	var updateArray = splitData(mySetting.update_date,Constants.Separator.Date);
	var nextDay = new Date(updateArray[0],Math.abs(updateArray[1])-1,Math.abs(updateArray[2])+1);
	var s = leadingZeros(nextDay.getFullYear(), 4) + '-' +
		leadingZeros(nextDay.getMonth() + 1, 2) + '-' +
		leadingZeros(nextDay.getDate(), 2);
	return s;
}
function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

function getTimingDifference() {			
	var todayArray = splitData(getToDayDate(),Constants.Separator.Date);
	var updateArray = splitData(mySetting.update_date,Constants.Separator.Date);	
	var todayDate = new Date(todayArray[0],Math.abs(todayArray[1])-1,todayArray[2]);	
	// for test
	//var todayDate = new Date(2011,4,50);	
	var updateDate = new Date(updateArray[0],Math.abs(updateArray[1]-1),updateArray[2]);	
	return todayDate-updateDate;
};

function getSomkingMoney() {		
	return mySetting.how_much * Constants.CigarettePrice.Defalt;		
};

function splitData(data,separator) {
	return data.split(separator);	
}

function getPlatform()
{       
        var platform = navigator.userAgent.toLowerCase();
        var platformResult = null;        
        if (platform.search("iphone") > -1){
                platformResult = Constants.Platform.Iphone;
        }
        else{
                platformResult = Constants.Platform.PC;
        }       
        return platformResult;
};
function showMessage(detail){
    var currentPlatform = getPlatform();
    if(currentPlatform == Constants.Platform.Iphone){
            navigator.notification.alert(detail,'알림','확인');                         
    }       
    else{
            alert(detail);    
    }
};

function showConfirm(detail){
    var currentPlatform = getPlatform();
    
    if(currentPlatform == Constants.Platform.Iphone){
    	return confirm(detail);
    	//return navigator.notification.confirm(detail,'경고');                             
    }       
    else{
    	return confirm(detail);
    }
};


quitsmokingApp.SettingProxy = function(_facade) {
	var settingFacade = _facade;	
	var self = this;	
	
	
	quitsmokingApp.SettingProxy.prototype.getSettingData = function(callbackFunc) {
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from setting WHERE setting_id = '+Constants.Setting_id+'';
			tx.executeSql(sql,[], function(transaction, results)  {                         
				callbackFunc(results);
			}, self.handleError);
		});   
	};
	
	quitsmokingApp.SettingProxy.prototype.saveSettingDataToLocalDB = function(callbackFunc) {
		var toDay = getToDayDate();
		
		myDBHandler.database.transaction(function (tx) {
			tx.executeSql("INSERT INTO setting (setting_id,start_date) VALUES (?,?)",
				[Constants.Setting_id,toDay],
				function(trans, results)  {                             
					callbackFunc();
				}, self.handleError);
		});
	};
	
	quitsmokingApp.SettingProxy.prototype.saveSettingDataToClientArray = function(data,callbackFunc) {
		for (var index = 0; index < data.rows.length; index++)
		{                                               
			var setting = data.rows.item(index);                    
			var settingVO = new quitsmokingApp.VO_Setting();
			settingVO.setting_id = setting['setting_id'];
			settingVO.start_date = setting['start_date'];
			settingVO.update_date = setting['update_date'];
			settingVO.how_much = setting['how_much'];
			settingVO.level = setting['level'];
			settingVO.total_product = setting['total_product'];
			settingVO.total_amount = setting['total_amount'];
			settingVO.d_day = setting['d_day'];
			settingVO.status = setting['status'];
			settingVO.quit_count = setting['quit_count'];				
		}			
		mySetting = settingVO;
		callbackFunc();
	};
	
	quitsmokingApp.SettingProxy.prototype.updateSettingLocalDB = function(callbackFunc) {				
		myDBHandler.database.transaction(function (tx) {
			var sql = "UPDATE setting SET update_date = '"+mySetting.update_date+"',how_much= '"+mySetting.how_much+"',level= '"+mySetting.level+"',total_product= '"+mySetting.total_product+"',total_amount= '"+mySetting.total_amount+"',d_day= '"+mySetting.d_day+"',start_date= '"+mySetting.start_date+"',status= '"+mySetting.status+"',quit_count= '"+mySetting.quit_count+"' WHERE setting_id = '"+mySetting.setting_id+"'";
			tx.executeSql(sql,[], function(transaction, results)  {                         
					callbackFunc();
			}, self.handleError);
		});       
	};	
	
	quitsmokingApp.SettingProxy.prototype.updateMySettingForSaveStatement = function() {				
		var timing = getTimingDifference();
		// first time		
		if(!timing){			
			update_date = getToDayDate();			
			
		}
		else{			
			update_date = getNextUpdateDate();					
		}
		mySetting.update_date = update_date;
		mySetting.total_amount = mySetting.total_amount + getSomkingMoney();
		mySetting.d_day = self.getDdayDate();
		mySetting.level = self.getLevel();
	};
	
	quitsmokingApp.SettingProxy.prototype.getDdayDate = function() {				
		var todayDate = new Date();
		var startArray = splitData(mySetting.start_date,Constants.Separator.Date);	
		var startDate = new Date(startArray[0],Math.abs(startArray[1])-1,startArray[2]);		
		var strPeriod = todayDate - startDate;
		d_day = strPeriod/1000/60/60/24;
		d_day = Math.ceil(d_day);				
		return d_day;		
	};
	
	quitsmokingApp.SettingProxy.prototype.getLevel = function() {				
		var level = 1;
		var money = mySetting.total_amount;
		if (money>910000){
			level = 13;
		}
		else if(money>770000){
			level = 12;
		}
		else if(money>630000){
			level = 11;
		}
		else if(money>560000){
			level = 10;
		}
		else if(money>420000){
			level = 9;
		}
		else if(money>350000){
			level = 8;
		}
		else if(money>210000){
			level = 7;
		}
		else if(money>140000){
			level = 6;
		}
		else if(money>70000){
			level = 5;
		}
		else if(money>50000){
			level = 4;
		}
		else if(money>20000){
			level = 3;
		}
		else if(money>10000){
			level = 2;
		}		
		return level;
	};
	
	quitsmokingApp.SettingProxy.prototype.updateStopQuitSmokingData = function() {				
		mySetting.update_date = "";
		mySetting.start_date = getToDayDate();
		mySetting.total_amount = 0;
		mySetting.how_much = 0;
		mySetting.d_day = 0;
		mySetting.level = 1;
		mySetting.total_product = 0;
		mySetting.quit_count = mySetting.quit_count +1;
		mySetting.status = Constants.Boolean.False;		
	};
	
};

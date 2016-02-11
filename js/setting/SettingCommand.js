quitsmokingApp.SettingCommand = function(_facade) {
	var settingFacade = _facade;	
	var self = this;	
	
	quitsmokingApp.SettingCommand.prototype.getSettingData = function() {
		settingFacade.retrieveProxy().getSettingData(self.handleGetSettingData);
	};
	quitsmokingApp.SettingCommand.prototype.handleGetSettingData = function(responseObject) {		
		var data_length = responseObject.rows.length;
		if (data_length==0) {
			productFacade.getProductDataToFile();			
		}
		else{                   
			self.saveSettingDataToClientArray(responseObject);
		}
	};	
	quitsmokingApp.SettingCommand.prototype.saveSettingDataToLocalDB = function() {
		settingFacade.retrieveProxy().saveSettingDataToLocalDB(self.handleSaveSettingDataToLocalDB);
	};
	quitsmokingApp.SettingCommand.prototype.handleSaveSettingDataToLocalDB = function() {
		self.getSettingData();
	};
	quitsmokingApp.SettingCommand.prototype.saveSettingDataToClientArray = function(data) {
		settingFacade.retrieveProxy().saveSettingDataToClientArray(data,self.handleSaveSettingDataToClientArray);
	};
	quitsmokingApp.SettingCommand.prototype.handleSaveSettingDataToClientArray = function() {
		if (mySetting.status==Constants.Boolean.False)
		{
			settingFacade.showFirstSettingPage();			
		}
		else{			
			onDeviceReady();			
		}
		
	};
	
	quitsmokingApp.SettingCommand.prototype.updateSettingLocalDB = function(callbackFunc) {
		settingFacade.retrieveProxy().updateSettingLocalDB(callbackFunc);
	};
	quitsmokingApp.SettingCommand.prototype.handleUpdateSettingLocalDB = function() {		
		self.getSettingData();
	};
	
	quitsmokingApp.SettingCommand.prototype.updateMySettingForSaveStatement = function() {		
		settingFacade.retrieveProxy().updateMySettingForSaveStatement();
	};
	
	quitsmokingApp.SettingCommand.prototype.updateStopQuitSmokingData = function() {		
		settingFacade.retrieveProxy().updateStopQuitSmokingData();
		settingFacade.updateSettingLocalDB(settingFacade.settingCommand.handleUpdateStopQuitSmokingData);
	};
	
	quitsmokingApp.SettingCommand.prototype.handleUpdateStopQuitSmokingData = function() {
		myDBHandler.dropTable('statement');
		//self.getSettingData();
		//console.info('handleUpdateStopQuitSmokingData');
		productFacade.updateAllProductStatus();
	};
	
	
};
quitsmokingApp.SettingFacade = function() {
	this.settingProxy = clone(new quitsmokingApp.SettingProxy(this));
	this.settingCommand = clone(new quitsmokingApp.SettingCommand(this));
	this.settingMediator = clone(new quitsmokingApp.SettingMediator(this));

	quitsmokingApp.SettingFacade.prototype.retrieveMediator = function() {
		return this.settingMediator;
	};	
	quitsmokingApp.SettingFacade.prototype.retrieveProxy = function() {
		return this.settingProxy;
	};
	
	quitsmokingApp.SettingFacade.prototype.getSettingData = function() {
		this.settingCommand.getSettingData();
	};
	
	quitsmokingApp.SettingFacade.prototype.updateSettingLocalDB = function(callbackFunc) {		
		this.settingCommand.updateSettingLocalDB(callbackFunc);
	};
	
	quitsmokingApp.SettingFacade.prototype.saveSettingDataToLocalDB = function() {
		this.settingCommand.saveSettingDataToLocalDB();
	};
	
	quitsmokingApp.SettingFacade.prototype.showFirstSettingPage = function() {
		this.settingMediator.initalizeFirstSettingPage();
		this.settingMediator.appendHtmlFirstSettingPage();
		this.settingMediator.attachEventFirstSettingEvents();
		this.settingMediator.displayEventFirstSettingPage();
	};
	
	quitsmokingApp.SettingFacade.prototype.showIndexPage = function() {
		this.settingMediator.initalizeIndexPage();
		this.settingMediator.appendHtmlIndexPage();
		this.settingMediator.attachEventIndexEvents();
		this.settingMediator.displayEventIndexPage();
	};	
	
	quitsmokingApp.SettingFacade.prototype.showSettingPage = function() {
		this.settingMediator.initalizeSettingPage();
		this.settingMediator.appendHtmlSettingPage();
		this.settingMediator.attachEventSettingEvents();
		this.settingMediator.displayEventSettingPage();
	};
	
	quitsmokingApp.SettingFacade.prototype.updateMySettingForSaveStatement = function() {
		this.settingCommand.updateMySettingForSaveStatement();
	};
		
	quitsmokingApp.SettingFacade.prototype.updateStopQuitSmokingData = function() {
		this.settingCommand.updateStopQuitSmokingData();
	};
	
	
};
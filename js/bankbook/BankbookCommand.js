quitsmokingApp.BankbookCommand = function(_facade) {
	var bankbookFacade = _facade;	
	var self = this;
	
	quitsmokingApp.BankbookCommand.prototype.saveStatementData = function()
	{
		// update true		
		if(bankbookFacade.retrieveProxy().checkUpdateTime()){			
			settingFacade.updateMySettingForSaveStatement();			
			productFacade.getPossibleProductArray(this.handleGetPossibleProductArray);			
		}
		// update false
		else{
			
			self.getStatementData();			
		}		
	};
	quitsmokingApp.BankbookCommand.prototype.handleGetPossibleProductArray = function(responseObject)
	{		
		var data_length = responseObject.rows.length;
		mySetting.total_product = mySetting.total_product + data_length;
		bankbookFacade.retrieveProxy().saveStatementDataToClientArray();
		bankbookFacade.retrieveProxy().saveProductDataToClientStatementArray(responseObject,self.handleSaveStatementDataToClientArray);
	};
	quitsmokingApp.BankbookCommand.prototype.handleSaveStatementDataToClientArray = function()
	{		
		if(myStatement.length>1){				
			productFacade.updateProductStatue(self.handleUpdateProductStatue);
		}
		else{
			self.handleUpdateProductStatue();			
		}		
	};
	quitsmokingApp.BankbookCommand.prototype.handleUpdateProductStatue = function()
	{		
		self.saveStatementDataToLocalDB();
	};
	quitsmokingApp.BankbookCommand.prototype.saveStatementDataToLocalDB = function()
	{		
		bankbookFacade.retrieveProxy().saveStatementDataToLocalDB(self.handleSaveStatementDataToLocalDB);
	};
	quitsmokingApp.BankbookCommand.prototype.handleSaveStatementDataToLocalDB = function()
	{		
		self.saveStatementData();		
	};
	
	quitsmokingApp.BankbookCommand.prototype.getStatementData = function()
	{
		bankbookFacade.retrieveProxy().getStatementData(self.handleGetStatementData);
	};
	quitsmokingApp.BankbookCommand.prototype.handleGetStatementData = function(data)
	{		
		settingFacade.updateSettingLocalDB(bankbookFacade.bankbookCommand.handleUpdateSettingLocalDB);
		bankbookFacade.retrieveMediator().initalizeBankbookListPage();
		bankbookFacade.retrieveMediator().appendHtmlBankbookListPage(data);
		bankbookFacade.retrieveMediator().attachEventBankbookListEvents();
		bankbookFacade.retrieveMediator().displayEventBankbookListPage();
	};
	quitsmokingApp.BankbookCommand.prototype.handleUpdateSettingLocalDB = function()
	{		
		console.info('quitsmokingApp.BankbookCommand.prototype.handleUpdateSettingLocalDB');
	};
	quitsmokingApp.BankbookCommand.prototype.getMoreStatementData = function(aMore_number)
	{		
		bankbookFacade.retrieveProxy().getMoreStatementData(aMore_number,self.handleGetMoreStatementData);
	};
	quitsmokingApp.BankbookCommand.prototype.handleGetMoreStatementData = function(data)
	{
		bankbookFacade.retrieveMediator().appendHtmlMoreBankbookListPage(data);
		bankbookFacade.retrieveMediator().attachEventBankbookListEvents();
	};
	

};
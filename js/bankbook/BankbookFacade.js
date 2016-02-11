quitsmokingApp.BankbookFacade = function() {
	this.bankbookProxy = clone(new quitsmokingApp.BankbookProxy(this));
	this.bankbookCommand = clone(new quitsmokingApp.BankbookCommand(this));
	this.bankbookMediator = clone(new quitsmokingApp.BankbookMediator(this));

	quitsmokingApp.BankbookFacade.prototype.retrieveMediator = function() {
		return this.bankbookMediator;
	};
	
	quitsmokingApp.BankbookFacade.prototype.retrieveProxy = function() {
		return this.bankbookProxy;
	};	
	
	quitsmokingApp.BankbookFacade.prototype.showBankbookListPage = function() {
		this.bankbookCommand.saveStatementData();
		//this.bankbookCommand.getStatementData();
		/*this.bankbookMediator.initalizeBankbookListPage();
		this.bankbookMediator.appendHtmlBankbookListPage();
		this.bankbookMediator.attachEventBankbookListEvents();
		this.bankbookMediator.displayEventBankbookListPage();*/
	};
	
	quitsmokingApp.BankbookFacade.prototype.getMoreStatementData = function(aMore_number) {
		this.bankbookCommand.getMoreStatementData(aMore_number);		
	};
};
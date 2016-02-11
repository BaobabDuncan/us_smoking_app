quitsmokingApp.ProductCommand = function(_facade) {
	var productFacade = _facade;	
	var self = this;	
	
	
	quitsmokingApp.ProductCommand.prototype.getProductDataToFile = function() {		
		productFacade.retrieveProxy().getProductDataToFile(self.handleGetProductDataToFile);
	};
	quitsmokingApp.ProductCommand.prototype.handleGetProductDataToFile = function(responseObject) {		
		self.saveProductDataToLocalDB(responseObject);		
	};
	quitsmokingApp.ProductCommand.prototype.saveProductDataToLocalDB = function(data) {		
		productFacade.retrieveProxy().saveProductDataToLocalDB(data,self.handleSaveProductDataToLocalDB);
	};
	quitsmokingApp.ProductCommand.prototype.handleSaveProductDataToLocalDB = function() {		
		settingFacade.saveSettingDataToLocalDB();
	};
	
	quitsmokingApp.ProductCommand.prototype.getPossibleProductArray = function(callbackFunc) {		
		productFacade.retrieveProxy().getPossibleProductArray(callbackFunc);
	};
	
	quitsmokingApp.ProductCommand.prototype.updateProductStatue = function(callbackFunc) {		
		productFacade.retrieveProxy().updateProductStatue(callbackFunc);
	};
	
	
	quitsmokingApp.ProductCommand.prototype.getProductToLocalDB = function() {		
		productFacade.retrieveProxy().getProductToLocalDB(self.handleGetProductToLocalDB);
	};
	quitsmokingApp.ProductCommand.prototype.handleGetProductToLocalDB = function(responseObject) {				
		productFacade.retrieveMediator().initalizeProductListPage();
		productFacade.retrieveMediator().appendHtmlProductListPage(responseObject);
		productFacade.retrieveMediator().attachEventProductListEvents();
		productFacade.retrieveMediator().displayEventProductListPage();
	};
	
	
	quitsmokingApp.ProductCommand.prototype.getProductByIdToLocalDB = function(product_id) {		
		productFacade.retrieveProxy().getProductByIdToLocalDB(product_id,self.handleGetProductByIdToLocalDB);
	};
	quitsmokingApp.ProductCommand.prototype.handleGetProductByIdToLocalDB = function(responseObject) {				
		
		productFacade.retrieveMediator().initalizeProductDetailPage();
		productFacade.retrieveMediator().appendHtmlProductDetailPage(responseObject);
		productFacade.retrieveMediator().attachEventProductDetailEvents();
		productFacade.retrieveMediator().displayEventProductDetailPage();
	};
	
	quitsmokingApp.ProductCommand.prototype.updateAllProductStatus = function() {		
		productFacade.retrieveProxy().updateAllProductStatus(self.handleUpdateAllProductStatus);
	};
	quitsmokingApp.ProductCommand.prototype.handleUpdateAllProductStatus = function() {				
		myDBHandler.createStatementTable();
		settingFacade.getSettingData();
	};
	
};
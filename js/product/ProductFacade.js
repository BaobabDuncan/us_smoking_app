quitsmokingApp.ProductFacade = function() {
	this.productProxy = clone(new quitsmokingApp.ProductProxy(this));
	this.productCommand = clone(new quitsmokingApp.ProductCommand(this));
	this.productMediator = clone(new quitsmokingApp.ProductMediator(this));

	quitsmokingApp.ProductFacade.prototype.retrieveMediator = function() {
		return this.productMediator;
	};	
	quitsmokingApp.ProductFacade.prototype.retrieveProxy = function() {
		return this.productProxy;
	};
	
	quitsmokingApp.ProductFacade.prototype.getProductDataToFile = function() {
		this.productCommand.getProductDataToFile();
	};
	
	quitsmokingApp.ProductFacade.prototype.getPossibleProductArray = function(callbackFunc) {
		this.productCommand.getPossibleProductArray(callbackFunc);
	};
	
	quitsmokingApp.ProductFacade.prototype.updateProductStatue = function(callbackFunc) {		
		this.productCommand.updateProductStatue(callbackFunc);
	};
	
	quitsmokingApp.ProductFacade.prototype.showProductListPage = function() {		
		this.productCommand.getProductToLocalDB();
	};
	
	quitsmokingApp.ProductFacade.prototype.showProductDetailPage = function(product_id) {		
		this.productCommand.getProductByIdToLocalDB(product_id);
	};
	
	quitsmokingApp.ProductFacade.prototype.updateAllProductStatus = function() {		
		this.productCommand.updateAllProductStatus();
	};

};
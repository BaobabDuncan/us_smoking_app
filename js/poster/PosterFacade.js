quitsmokingApp.PosterFacade = function() {
	this.posterProxy = clone(new quitsmokingApp.PosterProxy(this));
	this.posterCommand = clone(new quitsmokingApp.PosterCommand(this));
	this.posterMediator = clone(new quitsmokingApp.PosterMediator(this));

	quitsmokingApp.PosterFacade.prototype.retrieveMediator = function() {
		return this.posterMediator;
	};	
	quitsmokingApp.PosterFacade.prototype.retrieveProxy = function() {
		return this.posterProxy;
	};
	
	quitsmokingApp.PosterFacade.prototype.showPosterListPage = function() {
		this.posterMediator.initalizePosterListPage();
		this.posterMediator.appendHtmlPosterListPage();
		this.posterMediator.attachEventPosterListEvents();
		this.posterMediator.displayEventPosterListPage();
	};
	
	quitsmokingApp.PosterFacade.prototype.showPosterDetailPage = function(picNum) {
		this.posterMediator.initalizePosterDetailPage();
		this.posterMediator.appendHtmlPosterDetailPage(picNum);
		this.posterMediator.attachEventPosterDetailEvents();
		this.posterMediator.displayEventPosterDetailPage();
	};
};
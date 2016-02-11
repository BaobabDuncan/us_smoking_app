quitsmokingApp.PosterMediator = function(_facade) {	
	var posterFacade = _facade;			
	var self = this;
	
	quitsmokingApp.PosterMediator.prototype.initalizePosterListPage = function() {		
		myCurrentPage = Constants.ViewingPage.PosterList;		
	};
    quitsmokingApp.PosterMediator.prototype.appendHtmlPosterListPage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(myCurrentPage);
      emptyHTML(targetDiv);
      var html = self.getHtmlForPosterList();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
    quitsmokingApp.PosterMediator.prototype.getHtmlForPosterList = function() {		
		var html = '';
		html += '<div class="info">';
		html += '<p>현재 레벨 '+mySetting.level+'까지의 포스터가 나오고 있습니다.</p>';
		html += '<p>예금 일수가 올라감에 따라서 레벨도 올라 갑니다.</p>';
		html += '<p></p>';		
		html += '</div>';
		html += '<table>';
		var max_line = self.getMaxLineByLevel();
		for(var line=1; line < max_line; line++)
		{
			html += '<tr>';
				start_num = (1+(line-1)*4);
				for(var row = start_num; row < start_num+4; row++){
					html += '<td>';
					html += '<a href="javascript:" class="clickPosterPic" title="'+row+'">';
					html += '<img src="./images/poster/'+row+'.jpg" style="width:80px; height:100px;">';
					html += '</a>';					
					html += '</td>';
				}
			html += '</tr>';
		}		
		
		return html;		
	};
	quitsmokingApp.PosterMediator.prototype.getMaxLineByLevel = function() {
		var max_line = 2;
		if (mySetting.level != 1) max_line = mySetting.level;
		if (mySetting.level > 11) max_line = 11;		
		return max_line;
	};
    quitsmokingApp.PosterMediator.prototype.attachEventPosterListEvents = function() {
		$(".clickPosterPic").click(function(){			
			posterFacade.showPosterDetailPage(this.title);
		});
	};
    quitsmokingApp.PosterMediator.prototype.displayEventPosterListPage = function() {		
		goToPage(myCurrentPage,'slideleft');
	};
	
	quitsmokingApp.PosterMediator.prototype.initalizePosterDetailPage = function() {		
		myCurrentPage = Constants.ViewingPage.PosterDetail;		
	};
    quitsmokingApp.PosterMediator.prototype.appendHtmlPosterDetailPage = function(picNum) {
	  var targetDiv = getJqtCurrentPageWrapper(myCurrentPage);
      emptyHTML(targetDiv);
      var html = self.getHtmlForPosterDetail(picNum);
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
    quitsmokingApp.PosterMediator.prototype.getHtmlForPosterDetail = function(picNum) {		
		var html = '';
		html += '<img src="./images/poster/'+picNum+'.jpg" style="width:320px; height:426px;">';		
		return html;		
	};
    quitsmokingApp.PosterMediator.prototype.attachEventPosterDetailEvents = function() {
		
	};
    quitsmokingApp.PosterMediator.prototype.displayEventPosterDetailPage = function() {		
		goToPage(myCurrentPage,'slideleft');
	};
};


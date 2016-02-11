quitsmokingApp.BankbookMediator = function(_facade) {	
	var bankbookFacade = _facade;
	var more_number = 1;
	var self = this;
	
	quitsmokingApp.BankbookMediator.prototype.initalizeBankbookListPage = function() {		
		myCurrentPage = Constants.ViewingPage.BankbookList;
		more_number = 1;
	};
    quitsmokingApp.BankbookMediator.prototype.appendHtmlBankbookListPage = function(aStatements) {
	  var targetDiv = getJqtCurrentPageWrapper(myCurrentPage);
      emptyHTML(targetDiv);
      var html = self.getHtmlForBankbookList(aStatements);
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
    quitsmokingApp.BankbookMediator.prototype.getHtmlForBankbookList = function(aStatements) {		
		var html = '';
		html += '<div class="info">';
		html += '<p>개설일 '+mySetting.start_date+'</p>';
		html += '<p>총 잔액 '+mySetting.total_amount+' 원<p>';		
		html += '<p>지난 기간 '+mySetting.d_day+'일</p>';	
		html += '</div>';
		html += '<ul id="statements_list">';
		for (var index=0; index < aStatements.rows.length; index++)
		{
			var statement = aStatements.rows.item(index);
			html += '<li class="statement_list">';
			html += '<p><span class="date">'+statement['date']+'</span>';
			html += '<span class="type';			
			html += self.getSapnClass(statement['type']);			
			html += '">'+statement['type']+'</span></p>';				
			html += '<p><span class="detail">'+statement['detail']+'</span>';
			html += '<span class="money';
			html += self.getSapnClass(statement['type']);
			html += '">'+statement['money']+'원</span></p>';			
			html += '</li>';
		}
		html += self.getHtmlForMore(aStatements);
		html += '</ul>';
		return html;		
	};
	quitsmokingApp.BankbookMediator.prototype.getHtmlForMore = function(aStatements) {		
		var html = '';
		if (aStatements.rows.length==0) return html;		
		if (!(aStatements.rows.length%Constants.Statement.PageView)){			
			//html += '<li id="more_li"><a href="javascript:" class="more_button" title="'+more_number+'">More'+more_number+'</a></li>';			
			html += '<li id="more_li"><div style="margin: 10px;"><a href="javascript:" class="whiteButton more_button" title="'+more_number+'">더 보기</a></div></li>';
		}
		return html;		
	};
	quitsmokingApp.BankbookMediator.prototype.getSapnClass = function(aType) {
		var className='';
		if (aType == Constants.StatementType.InCome){
			className += ' blue';
		}
		else{
			className += ' red';
		}
		return className;
	};
    quitsmokingApp.BankbookMediator.prototype.attachEventBankbookListEvents = function() {
		$(".more_button").click(function(){
			$("#more_li").remove();
			bankbookFacade.getMoreStatementData(this.title);				
			more_number = more_number + 1;			
		})
	};
    quitsmokingApp.BankbookMediator.prototype.displayEventBankbookListPage = function() {		
		goToPage(myCurrentPage,'slideleft');
	};
	
	quitsmokingApp.BankbookMediator.prototype.appendHtmlMoreBankbookListPage = function(aStatements) {
		var html ='';		
		for (var index=0; index < aStatements.rows.length; index++)
		{
			var statement = aStatements.rows.item(index);
			html += '<li class="statement_list">';
			html += '<p><span class="date">'+statement['date']+'</span>';
			html += '<span class="type';			
			html += self.getSapnClass(statement['type']);			
			html += '">'+statement['type']+'</span></p>';				
			html += '<p><span class="detail">'+statement['detail']+'</span>';
			html += '<span class="money';
			html += self.getSapnClass(statement['type']);
			html += '">'+statement['money']+'원</span></p>';			
			html += '</li>';
		}
		html += self.getHtmlForMore(aStatements);		
		$("#statements_list").append(html);
	};
};


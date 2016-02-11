quitsmokingApp.SettingMediator = function(_facade) {	
	var settingFacade = _facade;			
	var self = this;
	
	quitsmokingApp.SettingMediator.prototype.initalizeFirstSettingPage = function() {		
		myCurrentPage = Constants.ViewingPage.FirstSetting;		
	};
    quitsmokingApp.SettingMediator.prototype.appendHtmlFirstSettingPage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(myCurrentPage);
      emptyHTML(targetDiv);
      var html = self.getHtmlForFirstSetting();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
    quitsmokingApp.SettingMediator.prototype.getHtmlForFirstSetting = function() {		
		var html = '';			
		html += '<div class="info">';
		html += '<p>금연통장은 실제 통장은 아닙니다.</p>';
		html += '<p>실제 금연을 통해서 얻어지는 이득을 통장형식으로 저축이 되고 그에 따르는 이자 아이템 지급 및 포스터 아이템 지급되어 지속적인 금연을 할 수 있게 도와주는 어플리케이션 입니다.</p>';		
		html += '</div>';
		if (!(mySetting.quit_count==0)){
			html += '<h2>해지 횟수</h2>';
			html += '<ul class="edit rounded">';
			html += '<li>';				
			html += mySetting.quit_count;
			html += '</li>';
			html += '</ul>';
		}
		html += '<h2>흡연량 선택</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';		
		html +=	'<select id="how_much">';
		html += '<option value ="0.5">하루 반갑</option>';
		html += '<option value ="1">하루 한갑</option>';	
		html += '<option value ="1.5">하루 한갑반</option>';	
		html += '<option value ="2">하루 두갑</option>';				
		html += '</select>';	
		html += '</li>';
		html += '</ul>';		
		html += '</ul>';
		html += '<div style="margin: 10px;"><a href="javascript:" class="whiteButton start">계좌 개설</a></div>';
		return html;		
	};
    quitsmokingApp.SettingMediator.prototype.attachEventFirstSettingEvents = function() {
		$(".start").click(function(){
			mySetting.how_much = $('#how_much').val();
			mySetting.status = Constants.Boolean.True;			
			settingFacade.updateSettingLocalDB(settingFacade.settingCommand.handleUpdateSettingLocalDB);
			//settingFacade.updateSettingForHowMuch($('#how_much').val());
		});
	};
    quitsmokingApp.SettingMediator.prototype.displayEventFirstSettingPage = function() {		
		goToPage(myCurrentPage,'slideleft');
	};
	
	quitsmokingApp.SettingMediator.prototype.initalizeIndexPage = function() {		
		myCurrentPage = Constants.ViewingPage.Index;		
	};
    quitsmokingApp.SettingMediator.prototype.appendHtmlIndexPage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(myCurrentPage);
      emptyHTML(targetDiv);
      var html = self.getHtmlForIndexSetting();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
    quitsmokingApp.SettingMediator.prototype.getHtmlForIndexSetting = function() {		
		var html = '';		
		html += "<ul class='rounded'>";
        html += "<li class='arrow'><a href='javascript:' class='movePage' title='1'>예금조회 및 입금</a></li>";
        html += "<li class='arrow'><a href='javascript:' class='movePage' title='2'>이자상품 리스트</a></li>";
        html += "<li class='arrow'><a href='javascript:' class='movePage' title='3'>포스터 리스트</a></li>";
		html += "<li class='arrow'><a href='javascript:' class='movePage' title='4'>고객정보</a></li>";
		html += "</ul>";
		return html;		
	};
    quitsmokingApp.SettingMediator.prototype.attachEventIndexEvents = function() {
		$(".movePage").click(function(){
			if(this.title=='1'){
				bankbookFacade.showBankbookListPage();		
			}
			else if(this.title=='2'){
				productFacade.showProductListPage();
			}
			else if(this.title=='3'){
				posterFacade.showPosterListPage();
			}
			else if(this.title=='4'){
				settingFacade.showSettingPage();
			}
		});
	};
    quitsmokingApp.SettingMediator.prototype.displayEventIndexPage = function() {		
		goToPage(myCurrentPage,'pop');
	};
	
	quitsmokingApp.SettingMediator.prototype.initalizeSettingPage = function() {		
		myCurrentPage = Constants.ViewingPage.Setting;		
	};
    quitsmokingApp.SettingMediator.prototype.appendHtmlSettingPage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(myCurrentPage);
      emptyHTML(targetDiv);
      var html = self.getHtmlForSetting();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
    quitsmokingApp.SettingMediator.prototype.getHtmlForSetting = function() {		
		var html = '';
		html += '<h2>총 금액</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += mySetting.total_amount+' 원';
		html += '</li>';
		html += '</ul>';
		html += '<h2>금연 일수</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += mySetting.d_day+' 일';
		html += '</li>';
		html += '</ul>';
		html += '<h2>레벨</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += mySetting.level+' 레벨';
		html += '</li>';
		html += '</ul>';
		html += '<h2>총 이자 물품</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += mySetting.total_product+' 개';
		html += '</li>';
		html += '</ul>';
		html += '<h2>입금 시작일</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += mySetting.start_date;
		html += '</li>';
		html += '</ul>';		
		html += '<h2>하루 흡연량</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += mySetting.how_much+' 갑';
		html += '</li>';
		html += '</ul>';		
		html += '<div style="margin: 10px;"><a href="javascript:" class="whiteButton stop">해지</a></div>';
		return html;		
	};
    quitsmokingApp.SettingMediator.prototype.attachEventSettingEvents = function() {
		$(".stop").click(function(){
			var confirm1Var = showConfirm('통장을 해지 하시겠습니까?(모든 데이터가 소멸 됩니다)');            
            if(confirm1Var){
            	var confirm2Var = showConfirm('다시 한번 생각해 보세요. 벌써 '+mySetting.d_day+'일 이나 참으셨어요.');            
            	if (confirm2Var){
            		settingFacade.updateStopQuitSmokingData();		
            	}
            }
		});
	};
    quitsmokingApp.SettingMediator.prototype.displayEventSettingPage = function() {		
		goToPage(myCurrentPage,'slideleft');
	};
};


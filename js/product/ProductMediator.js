quitsmokingApp.ProductMediator = function(_facade) {	
	var productFacade = _facade;			
	var self = this;
	quitsmokingApp.ProductMediator.prototype.initalizeProductListPage = function() {		
		myCurrentPage = Constants.ViewingPage.ProductList;		
	};
    quitsmokingApp.ProductMediator.prototype.appendHtmlProductListPage = function(aProducts) {
	  var targetDiv = getJqtCurrentPageWrapper(myCurrentPage);
      emptyHTML(targetDiv);
      var html = self.getHtmlForProductList(aProducts);
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
    quitsmokingApp.ProductMediator.prototype.getHtmlForProductList = function(aProducts) {		
		var html = '';		
		html += '<div class="info">';
		html += '<p>총 '+mySetting.total_product+'개의 이자 상품이 있습니다.</p>';
		html += '<p>더욱 많은 상품을 모아 보세요.</p>';				
		html += '</div>';
		html += '<table>';
		var max_line = self.getMaxLineByProduct(aProducts.rows.length);		
		for(var line=1; line < max_line; line++)
		{			
			html += '<tr>';
				start_num = (0+(line-1)*4);						
				for(var row = start_num; row < start_num+4; row++){						
					if (row >= aProducts.rows.length) continue;						
					var product = aProducts.rows.item(row);
					html += '<td>';
					html += '<a href="javascript:" class="clickProcutPic" title="'+product['product_id']+'">';
					html += '<img src="./images/product/'+product['level']+'/'+product['image']+'.jpg" style="width:80px; height:100px;">';
					html += '</a>';
					html += '</td>';
				}
			html += '</tr>';
		}		
		
		return html;		
	};
	quitsmokingApp.ProductMediator.prototype.getMaxLineByProduct = function(dataLength) {		
		var max_line = '';		
		max_line = Math.ceil(dataLength/4)+1;		
		return max_line;
	};
    quitsmokingApp.ProductMediator.prototype.attachEventProductListEvents = function() {
		$(".clickProcutPic").click(function(){				
			productFacade.showProductDetailPage(this.title);
		});
	};
    quitsmokingApp.ProductMediator.prototype.displayEventProductListPage = function() {		
		goToPage(myCurrentPage,'slideleft');
	};
	
	quitsmokingApp.ProductMediator.prototype.initalizeProductDetailPage = function() {		
		myCurrentPage = Constants.ViewingPage.ProductDetail;		
	};
    quitsmokingApp.ProductMediator.prototype.appendHtmlProductDetailPage = function(aProduct) {
	  var targetDiv = getJqtCurrentPageWrapper(myCurrentPage);
      emptyHTML(targetDiv);
      var html = self.getHtmlForProductDetail(aProduct);
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
    quitsmokingApp.ProductMediator.prototype.getHtmlForProductDetail = function(aProduct) {
		var product = aProduct.rows.item(0);
		var html = '';
		html += '<h2>상품명</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += product['title'];
		html += '</li>';
		html += '</ul>';
		html += '<h2>상품 가치</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += product['money'];
		html += '</li>';
		html += '</ul>';
		html += '<h2>상품 레벨</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += product['level']+'레벨';
		html += '</li>';
		html += '</ul>';
		html += '<h2>상품 이미지</h2>';
		html += '<ul class="edit rounded">';
		html += '<li>';				
		html += '<img src="./images/product/'+product['level']+'/'+product['image']+'.jpg" style="width:90%; height:50%">';		
		//html += product['level'];
		html += '</li>';
		html += '</ul>';
		
		return html;		
	};
    quitsmokingApp.ProductMediator.prototype.attachEventProductDetailEvents = function() {
		
	};
    quitsmokingApp.ProductMediator.prototype.displayEventProductDetailPage = function() {		
		goToPage(myCurrentPage,'slideleft');
	};
};


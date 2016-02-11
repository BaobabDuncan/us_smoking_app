quitsmokingApp.ProductProxy = function(_facade) {
	var productFacade = _facade;	
	var self = this;
	
	var INDICATOR = {
			index: 0,
			length: 0
	};
	
	quitsmokingApp.ProductProxy.prototype.getProductDataToFile = function(callbackFunc)
	{
		$.ajax({
			url:"./file/product.txt",
			error : function(e){
				console.info('quitsmokingApp.ProductProxy.prototype.getProductDataToFile Error = ' + e.message);
			},
			success : function(data){				
				callbackFunc(data);
			} 
		});
	};
	
	quitsmokingApp.ProductProxy.prototype.saveProductDataToLocalDB = function(data,callbackFunc)
	{
		var tempProductData = new Array();
		var data = data.split(Constants.Separator.ProductLine);	
		var data_len = data.length;		
		for (var index = 0; index < data_len; index++)
		{			
			var productData = jQuery.trim(data[index]);			
			var ProductVO = self.parseFileProductData(productData);			
			tempProductData.push(ProductVO);			
		}		
		
		data_len = tempProductData.length;
		INDICATOR.length = data_len;
		INDICATOR.index = 0;		
		myDBHandler.database.transaction(function(tx){
			for (var index = 0; index < data_len; index++){				
				var product = tempProductData[index];
				try{					
					tx.executeSql('INSERT INTO product (money, title, image, level, status) VALUES (?,?,?,?,?)',
							[product.money, product.title, product.image, product.level, product.status],
							function(trans, results){
								INDICATOR.index += 1;								
								if (INDICATOR.index==INDICATOR.length){
									callbackFunc();
								}
							}, function(trans, results){
								console.log('quitsmokingApp.ProductProxy.prototype.saveProductDataToLocalDB = ' + results.message);
							});
				}catch(e){
					alert('quitsmokingApp.ProductProxy.prototype.saveProductDataToLocalDB = ' + e.message);
				}
			}
		});
	};
	
	quitsmokingApp.ProductProxy.prototype.parseFileProductData = function(productData)
	{
		productlist = productData.split(Constants.Separator.ProductSection);		
		var productVO = new quitsmokingApp.VO_Product();
		productVO.money = jQuery.trim(productlist[0]);
		productVO.title = jQuery.trim(productlist[1]);
		productVO.image = jQuery.trim(productlist[2]);
		productVO.level = jQuery.trim(productlist[3]);
		productVO.status = Constants.Boolean.False;		
		return productVO;
	};
	
	quitsmokingApp.ProductProxy.prototype.getPossibleProductArray = function(callbackFunc)
	{		
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from product WHERE money <= '+mySetting.total_amount+' and status = "'+Constants.Boolean.False+'"';
			//var sql = "select * from product where ";
			tx.executeSql(sql,[], function(transaction, results)  {					
				callbackFunc(results);
			}, self.handleError);
		});       
	};
	
	quitsmokingApp.ProductProxy.prototype.updateProductStatue = function(callbackFunc)
	{		
		data_len = myStatement.length;
		INDICATOR.length = data_len;
		INDICATOR.index = 0;
		myDBHandler.database.transaction(function(tx){
			for (var index = 0; index < data_len; index++){				
				var statement = myStatement[index];				
				try{
					var sql = "UPDATE product SET status = '"+Constants.Boolean.True+"' WHERE product_id = '"+statement.product_id+"'";
					tx.executeSql(sql,[],
					function(transaction, results)  {                         
						INDICATOR.index += 1;								
						if (INDICATOR.index==INDICATOR.length){
							callbackFunc();
						}
					}, self.handleError);					
				}catch(e){
					alert('quitsmokingApp.ProductProxy.prototype.saveProductDataToLocalDB = ' + e.message);
				}
			}
		});
	};
	
	quitsmokingApp.ProductProxy.prototype.getProductToLocalDB = function(callbackFunc)
	{		
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from product WHERE status = "'+Constants.Boolean.True+'"';			
			tx.executeSql(sql,[], function(transaction, results)  {					
				callbackFunc(results);
			}, self.handleError);
		});       
	};
	
	quitsmokingApp.ProductProxy.prototype.getProductByIdToLocalDB = function(product_id,callbackFunc)
	{		
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from product WHERE product_id = "'+product_id+'"';			
			tx.executeSql(sql,[], function(transaction, results)  {					
				callbackFunc(results);
			}, self.handleError);
		});       
	};
	
	quitsmokingApp.ProductProxy.prototype.updateAllProductStatus = function(callbackFunc)
	{		
		myDBHandler.database.transaction(function (tx) {
			var sql = 'UPDATE product SET status = "'+Constants.Boolean.False+'"';			
			tx.executeSql(sql,[], function(transaction, results)  {					
				callbackFunc(results);
			}, self.handleError);
		});       
	};
	
};

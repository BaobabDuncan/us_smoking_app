quitsmokingApp.BankbookProxy = function(_facade) {
	var bankbookFacade = _facade;	
	var self = this;	
	var INDICATOR = {
			index: 0,
			length: 0
	};
	quitsmokingApp.BankbookProxy.prototype.checkUpdateTime = function() {
		
		if (!mySetting.update_date){			
			return true;
		}
		var Timing = getTimingDifference();
		if (Timing != 0){			
			return true;
		}
		else return false;
	};
	
	
	quitsmokingApp.BankbookProxy.prototype.getStatementData = function(callbackFunc) {		
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from statement order by - statement_id LIMIT 0, '+Constants.Statement.PageView+'';
			tx.executeSql(sql,[], function(transaction, results)  {                         
				callbackFunc(results);
			}, self.handleError);
		});   
	};
	
	quitsmokingApp.BankbookProxy.prototype.getMoreStatementData = function(aMore_number,callbackFunc) {		
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from statement order by - statement_id LIMIT '+self.getMoreFrom(aMore_number)+', '+Constants.Statement.PageView+'';
			tx.executeSql(sql,[], function(transaction, results)  {                         
				callbackFunc(results);
			}, self.handleError);
		});   
	};
	quitsmokingApp.BankbookProxy.prototype.getMoreFrom = function(aMore_number) {		
		return aMore_number*Constants.Statement.PageView;
	};	
	
	quitsmokingApp.BankbookProxy.prototype.saveStatementDataToClientArray = function() {
		myStatement.length = 0;
		var tempStatement = new Array();		
		var statementVO = self.parseMySetting();
		myStatement.push(statementVO);			
	};
	quitsmokingApp.BankbookProxy.prototype.saveProductDataToClientStatementArray = function(data,callbackFunc) {		
		var tempStatement = new Array();
		var data_len = data.rows.length;
		for (var index = 0; index < data_len; index++)
		{						
			var product = data.rows.item(index);			
			var statementVO = self.parseDbProduct(product);
			myStatement.push(statementVO);			
		}		
		callbackFunc(); 
	};
	
	quitsmokingApp.BankbookProxy.prototype.parseMySetting = function() {				
		var statementVO = new quitsmokingApp.VO_Statement();		
		statementVO.date = mySetting.update_date;
		statementVO.type = Constants.StatementType.InCome;
		statementVO.money = getSomkingMoney();
		statementVO.detail = Constants.StatementDetail.Somking;
		return statementVO;
	};
	
	quitsmokingApp.BankbookProxy.prototype.parseDbProduct = function(product) {				
		var statementVO = new quitsmokingApp.VO_Statement();		
		statementVO.date = mySetting.update_date;
		statementVO.type = Constants.StatementType.Product;
		statementVO.money = product['money'];
		statementVO.detail = product['title'];
		statementVO.product_id = product['product_id'];
		return statementVO;
	};
	
	quitsmokingApp.BankbookProxy.prototype.getSomkingMoney = function() {		
		return mySetting.how_much * Constants.CigarettePrice.Defalt;		
	};
	
	quitsmokingApp.BankbookProxy.prototype.saveStatementDataToLocalDB = function(callbackFunc) {		
		data_len = myStatement.length;
		INDICATOR.length = data_len;
		INDICATOR.index = 0;		
		myDBHandler.database.transaction(function(tx){
			for (var index = 0; index < data_len; index++){				
				var statement = myStatement[index];
				try{					
					tx.executeSql('INSERT INTO statement (date, type, money, detail) VALUES (?,?,?,?)',
							[statement.date, statement.type, statement.money, statement.detail],
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
};

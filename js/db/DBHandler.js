
function DBHandler(aOption)
{
	var self = this;
	
	this.databaseOption = aOption;
	this.database = null;
	this.name = 'DBHandler';
	
	DBHandler.prototype.connectDB = function(){	
		try{
			self.database = openDatabase(
					self.databaseOption.fileName,
					self.databaseOption.version,
					self.databaseOption.displayName,
					self.databaseOption.maxSize
			);
		}
		catch(e){
			
		}
	};
	DBHandler.prototype.nullDataHandler = function(transaction, resultSet) {
		console.info('nullDataHandler');
	};
	DBHandler.prototype.nullDataHandler = function(transaction, resultSet) {
		console.info('nullDataHandler');
	};
	DBHandler.prototype.handleError = function(transaction, resultSet){
		console.info('handleError');
	};
	
	
	DBHandler.prototype.openSQL = function(aSql,dataHandler,errorHandler){		
		self.database.transaction(
			function (transaction){
				transaction.executeSql(aSql,[],dataHandler,errorHandler);
			}
		);
	};
	DBHandler.prototype.accSQL = function(aSql,dataHandler,errorHandler){			
		self.database.transaction(
			function (transaction){
				transaction.executeSql(aSql,[],dataHandler,dataHandler);
			}
		);
	};
	
	DBHandler.prototype.execSQLCommand = function(aSql, onSuccess, onFailure){		
		self.database.transaction(
			function(transaction){
				transaction.executeSql(aSql, [], onSuccess, onFailure);
			}
		);
	};
	
	DBHandler.prototype.execSQL = function(aSql) {
		self.execSQLCommand(aSql, self.nullDataHandler, self.nullErrorHandler);
	};

	
	DBHandler.prototype.dropTable = function(table_name) {		
		var sql1 = 'DROP TABLE '+table_name;		
		self.execSQL(sql1,self.nullDataHandler,self.nullErrorHandler);
	};
	
	DBHandler.prototype.createSettingTable = function() {
		try{
			var sSql = 'CREATE TABLE IF NOT EXISTS setting'+
				'(setting_id INTEGER NOT NULL PRIMARY KEY, '+
				' start_date TEXT DEFAULT "", '+
				' update_date TEXT DEFAULT "", '+
				' how_much INTGER DEFAULT 0, '+
				' level INTGER DEFAULT 1, '+
				' quit_count INTGER DEFAULT 0, '+
				' total_product INTGER DEFAULT 0, '+
				' d_day INTGER DEFAULT 0, '+
				' status TEXT DEFAULT "'+Constants.Boolean.False+'", '+
				' total_amount INTGER DEFAULT 0);';								
			self.execSQL(sSql);
		}
		catch(err){
			console.info('DBHandler.prototype.createFriendsTable = '+err.message);
		}
	};
	
	DBHandler.prototype.createProductTable = function() {
		try{
			var sSql = 'CREATE TABLE IF NOT EXISTS product'+
				'(product_id INTEGER NOT NULL PRIMARY KEY, '+
				' money INTGER, '+
				' title TEXT DEFAULT "", '+
				' image TEXT DEFAULT "", '+
				' level TEXT DEFAULT "", '+
				' status TEXT DEFAULT "", '+
				' etc TEXT DEFAULT "");';								
			self.execSQL(sSql);
		}
		catch(err){
			console.info('DBHandler.prototype.createFriendsTable = '+err.message);
		}
	};
	
	DBHandler.prototype.createStatementTable = function() {
		try{
			var sSql = 'CREATE TABLE IF NOT EXISTS statement'+
				'(statement_id INTEGER NOT NULL PRIMARY KEY, '+
				' date DATE DEFAULT "", '+
				' type TEXT DEFAULT "", '+
				' money INTGER, '+
				' detail TEXT DEFAULT "", '+
				' etc TEXT DEFAULT "");';								
			self.execSQL(sSql);
		}
		catch(err){
			console.info('DBHandler.prototype.createFriendsTable = '+err.message);
		}
	};
	
}
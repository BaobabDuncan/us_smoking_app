function quitsmokingApp(){
	quitsmokingApp.prototype = new Object();
};
quitsmokingApp.VO_Setting = function() {
	this.setting_id = '';             
	this.start_date = '';
	this.update_date = '';
	this.how_much = '';
	this.level = '';
	this.total_product = '';
	this.total_amount = '';
	this.quit_count = '';
	this.d_day = '';
	this.status = '';
};

quitsmokingApp.VO_Product = function() {
	this.product_id = '';             
	this.money = '';
	this.title = '';
	this.image = '';
	this.level = '';
	this.status = '';
	this.etc = '';
};

quitsmokingApp.VO_Statement = function() {
	this.statement_id = '';             
	this.date = '';
	this.type = '';
	this.money = '';
	this.detail = '';
	this.etc = '';
	this.product_id = '';
};
	



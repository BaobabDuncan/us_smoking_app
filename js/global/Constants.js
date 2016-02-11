var databaseOptions = {
	fileName: "quit-smoking.db",
	version: "1.0",
	displayName:"quit-smoking db",
	maxSize: 1024
};

myCurrentPage = null;
mySetting = new Array();
myStatement = new Array();

var Constants = {
	Setting_id : 1,
	ViewingPage : {
		PosterList : '#posterlistview',
		PosterDetail : '#posterdetailview',
		ProductList : '#productlistview',
		ProductDetail : '#productdetailview',
		FirstSetting : '#firstsettingview',
		Setting :'#settingview',
		BankbookList : '#bankbooklistview',
		BankbookDetail : '#bankbookdetailview',
		Index : '#indexview'
	},
	Separator : {
		ProductLine : '^',
		ProductSection : '|',
		Date : '-'
	},
	Boolean : {
		False : "false",
		True : "true"
	},
	StatementType : {
		Product : "이자상품",
		InCome : "입금"
	},
	StatementDetail : {
		Somking : "금연"
	},
	CigarettePrice : {
		Defalt : 2500
	},
	Statement :{
		PageView : 10
	},
	Platform : {
        Iphone : 'iPhone',       
        PC : 'Win32'
	}
};
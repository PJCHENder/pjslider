(function(global, $) {

    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    }

    let supportedLangs = ['en', 'zh'];

    let greetings = {
        en: 'Hello',
        zh: '你好'
    };

    let formalGreetings = {
        en: 'Greetings',
        zh: '您好'
    };

    let logMessages = {
        en: 'Logged',
        zh: '登入'
    };

    Greetr.prototype = {
    	fullName: function(){
    		return this.firstname + ' ' + this.lastname;
    	},
    	validate: function(){
    		if(supportedLangs.indexOf(this.language) === -1){
    			throw 'Invalid Language';
    		}
    	},
    	greeting: function(){
    		return greetings[this.language] + ' ' + this.firstname;
    	},
    	formalGreeting: function(){
    		return formalGreetings[this.language] + ', ' + this.fullName();
    	},
    	greet: function(formal){
    		
    		let msg;

    		//	if undefined or null, it will coerced to 'false'
    		if(formal){
    			msg = this.formalGreeting();
    		}else{
    			msg = this.greeting();
    		}

    		if(console){
    			console.log(msg);
    		}

    		//	'this' refers to the calling object at execution time
    		//	makes method chainable
    		return this;

    	},
    	log: function(){
    		if(console){
    			console.log(logMessages[this.language] + ' ' + this.fullName());
    		}
    		return this;
    	},
    	setLang: function(lang){
    		this.language = lang;
    		this.validate();
    		return this;
    	}
    };

    Greetr.init = function(firstname, lastname, language) {
        let self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'zh';
    }

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;


}(window, jQuery))

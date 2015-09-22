/**
  * Based on original ideia: https://github.com/rodrigorhas/Components/blob/master/xjs/bootstrap.js
  */
Bootstrap = {
	data  : null,
	count : 0,
	body  : document.body,

	Loading : {
		start : function(){ document.body.style.display  = "none" },
		stop  : function(){ Bootstrap.body.style.display = "" }
	},

	init: function(data, callBack){
		Bootstrap.Loading.start();
		Bootstrap.data = data || [];
		if(!Bootstrap.data.length){
			console.warn("No assets to be loaded");
			if(!Bootstrap.isEmpty(callBack))
				return callBack();
		}
		else
			Bootstrap.recursiveLoad(callBack);
	},
	recursiveLoad: function(callBack){
		if(Bootstrap.count < Bootstrap.data.length){
			var url = Bootstrap.data[Bootstrap.count];
			if(url){
				Bootstrap.load({
					url      : url,
					callBack : function(){
						Bootstrap.count++;
						if(Bootstrap.count < Bootstrap.data.length)
							Bootstrap.recursiveLoad(callBack);
						else{
							if(!Bootstrap.isEmpty(callBack))
								callBack();
								Bootstrap.Loading.stop();
						}
					}
				});
			}
		}
	},
	load: function(config){
		var callBack  = config.callBack;
		var url       = config.url;
		var extension = url.match(/.(\w+)$/ig)[0];
		var tag       = null;
		switch (extension){
			case '.js':
				tag      = document.createElement('script');
		    	tag.type = 'text/javascript';
		    	tag.src  = url;
			break;
			case '.css':
				tag      = document.createElement('link');
		    	tag.rel  = 'stylesheet';
		    	tag.href = url;
			break;
			default:
				return console.error('Type not suported -> ' + extension);
			break;
		}
		if (tag){
		    tag.onload  = (tag.onload)  ? tag.onload  : callBack;
		    tag.onerror = (tag.onerror) ? tag.onerror : callBack;
	    	Bootstrap.body.appendChild(tag);
		}
	},
	isEmpty: function(val){
		return (val == "" || val == null || val == undefined);
	}
}
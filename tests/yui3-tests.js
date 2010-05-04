
window.tests = {
	
	"make" : function(){	
		var ul, i;

		for ( i = 0; i < 250; i++ ) {
            // Maybe the instructions should be updated on this one.  They
            // call for adding the LIs as the last step after appending to
            // the DOM, but every solution set is adding the LIs before
            // appending
            Y.one('body').append(
                '<ul class="fromcode" id="setid' + i + '">' +
                    '<li>one</li><li>two</li><li>three</li>' +
                '</ul>');
		}

		return Y.all('ul.fromcode').size();
	},
	
	"indexof" : function(){
		var index;

		for ( i = 0; i < 20; i++ ) {
            index = Y.all('ul').indexOf( Y.one('#setid150') );
		}
		return index;
	},
	
	"bind" : function(){
        var items = Y.all('ul > li');
        items.on('click', function () {});
		return items.size();
	},
	
	"attr" : function(){
		return Y.all('ul').get('id').length;
	},
	
	"bindattr" : function(){
        function subscriber() {}

		var nodes = Y.all('ul > li');

		nodes.on('mouseover', subscriber);
		nodes.set('rel', 'touched')
		     .detach('mouseover');

		return nodes.size();
	},

	"table": function(){
		var body, i;
		for ( i = 0; i < 40; i++ ) {
            body = Y.one('body');
            body.appendChild(body.create('<table class="madetable"></table>'))
			    .appendChild(body.create('<tr><td>first</td></tr>'))
			    .prepend('<td>before</td>');
		}
		return Y.all('tr td').size();
	},
	
	"addanchor" : function(){
		return Y.all('.fromcode > li').append('<a href="http://example.com">link</a>').size();
	},

	"append" : function(){
		// Selector failing on "div[rel^='foo2']"
		for ( var i = 0; i < 500; i++ ) {
			Y.one('body').append('<div rel="foo2"></div>');
		}
		return Y.all("div[rel^='foo2']").size();
	},
	
	"addclass-odd" : function(){
		return Y.all('div').addClass('added').odd().addClass('odd').size();
	},
	
	"style": function(){
		return Y.all('.added').setStyles({ 'background-color':'#ededed', 'color':'#fff' }).size();
	},
	
	"removeclass": function(){
		return Y.all('.added').removeClass('added').size();
	},
	
	"sethtml": function(){
		return Y.all('div').setContent('<p>new content</p>').refresh().size();
	},
	
	"insertbefore" : function(){
		return Y.all('.fromcode a').insert('<p>A Link</p>','before').size();
	},
	
	"insertafter" : function(){
		return Y.all('.fromcode a').insert('<p>After Link</p>','after').size();
	},
	
	"destroy": function(){ 
		return Y.all('.fromcode').remove().size();
	},
	
	"finale": function(){
		return Y.all('body > *').remove().refresh().size();
	}
	
};

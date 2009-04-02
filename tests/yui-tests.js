window.tests = {
	
	"make" : function(){
		var ul;
		for ( var i = 0; i < 250; i++ ) {
			ul = document.createElement('ul');
			YAHOO.util.Dom.addClass(ul, 'fromcode');
			YAHOO.util.Dom.setAttribute(ul, 'id', 'setid'+i);
			document.body.appendChild(ul);
			ul.innerHTML = '<li>one</li><li>two</li><li>three</li>';
		}
		return YAHOO.util.Selector.query('ul.fromcode').length;
	},
	
	"indexof" : function(){
		var target, uls, index, i, j, l;

		for ( i = 0; i < 20; i++ ) {
			target = YAHOO.util.Dom.get('setid150');
			uls = YAHOO.util.Selector.query('ul');

			index = -1;
			for ( j = 0, l = uls.length; j < l; ++j ) {
				if ( uls[j] === target ) {
					index = j;
					break;
				}
			}
		}
		return index;
	},
	
	"bind" : function(){
		var lis = YAHOO.util.Selector.query('ul > li:first-child');
		YAHOO.util.Event.on(lis, 'click', function(){});
		return lis.length;
	},
	
	"attr" : function(){
		return YAHOO.util.Dom.batch(
            YAHOO.util.Selector.query('ul'),
            function(el){
                return YAHOO.util.Dom.getAttribute(el, 'id');
		    }).length;
	},
	
	"bindattr" : function(){
		var lis = YAHOO.util.Selector.query('ul > li:first-child'),i;

        YAHOO.util.Event.on(lis, 'mouseover', function(){});

		for (i = lis.length - 1; i >= 0; --i) {
            YAHOO.util.Dom.setAttribute(lis[i], 'rel', 'touched');
        }

        YAHOO.util.Event.removeListener(lis, 'mouseover');
		return lis.length;
	},

	"table": function(){
		var _, table, i;
		for ( i = 0; i < 40; i++ ) {
            _ = document.createElement('div');
            _.innerHTML = '<table><tbody><tr><td>first</td></tr></tbody></table>';
			table = _.getElementsByTagName('table')[0];
			YAHOO.util.Dom.addClass(table, 'madetable');

			document.body.appendChild(table);
			YAHOO.util.Dom.insertBefore(
                document.createElement('td'),
                table.getElementsByTagName('td')[0]);
		}

		return YAHOO.util.Selector.query('tr td').length;
	},
	
	"addanchor" : function(){
		return YAHOO.util.Dom.batch(
            YAHOO.util.Selector.query('.fromcode > li:first-child'),
            function(li){
			    li.innerHTML = '<a href="http://example.com">link</a>';
		    }).length;
	},

	"append" : function(){
        // TODO: verify against other lib tests.  Confusing example docs.
		var div, o;
		for ( i = 0; i < 500; i++ ) {
			div = document.createElement('div');
			YAHOO.util.Dom.setAttribute(div, 'rel', 'foo2');
			document.body.appendChild(div);
		}
		return YAHOO.util.Selector.query("div[rel^='foo2']").length;
	},
	
	"addclass-odd" : function(){
		var divs, odds;
		divs = document.getElementsByTagName('div');
		YAHOO.util.Dom.addClass(divs, 'added');

        odds = YAHOO.util.Selector.filter(divs, ':nth-child(odd)');
        YAHOO.util.Dom.addClass(odds, 'odd');

        return divs.length;
	},
	
	"style": function(){
        var nodes = YAHOO.util.Dom.getElementsByClassName('added');
        YAHOO.util.Dom.setStyle(nodes,'background-color', '#ededed');
        YAHOO.util.Dom.setStyle(nodes,'color', '#fff');
		return nodes.length;
	},
	
	"removeclass": function(){
        var nodes = YAHOO.util.Dom.getElementsByClassName('added');
		YAHOO.util.Dom.removeClass(nodes, 'added');
		return nodes.length;
	},
	
	"sethtml": function(){
		return YAHOO.util.Dom.batch(
            document.getElementsByTagName('div'),
            function (div) {
			    div.innerHTML = '<p>new content</p>';
		    }).length;
	},
	
	"insertbefore" : function(){
		return YAHOO.util.Dom.batch(
            YAHOO.util.Selector.query('.fromcode a'),
            function(a){
                var p = document.createElement('p');
                p.innerHTML = 'A Link';
                YAHOO.util.Dom.insertBefore(p,a);
            }).length;
	},
	
	"insertafter" : function(){
		return YAHOO.util.Dom.batch(
            YAHOO.util.Selector.query('.fromcode a'), function(a){
                var p = document.createElement('p');
                p.innerHTML = 'After Link';
                YAHOO.util.Dom.insertAfter(p,a);
            }).length;
	},
	
	"destroy": function(){ 
		return YAHOO.util.Dom.batch(
            YAHOO.util.Dom.getElementsByClassName('fromcode'),
            function(n){
                n.parentNode.removeChild(n);
            }).length;
	},
	
	"finale": function(){
		// Same as other library's empty methods
		document.body.innerHTML = '';
		return YAHOO.util.Selector.query('body *').length;
	}
	
};

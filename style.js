(function (blink) {
	'use strict';

	var majesticdemoStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	majesticdemoStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_majesticdemo',
		ckEditorStyles: {
			name: 'majesticdemo',
			styles: [

				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title bck-title1'} },
				{ name: 'Título 2', element: 'h4', attributes: { 'class': 'bck-title bck-title2'} },

				{ name: 'Lista ordenada 1', element: 'ol', attributes: { 'class': 'bck-ol bck-ol1' } },
				{ name: 'Lista ordenada 2', element: 'ol', attributes: { 'class': 'bck-ol bck-ol2' } },
				{ name: 'Lista ordenada 3', element: 'ol', attributes: { 'class': 'bck-ol bck-ol3' } },
				{ name: 'Lista ordenada 4', element: 'ol', attributes: { 'class': 'bck-ol bck-ol4' } },

				{ name: 'Caja 1', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box1' } },
				{ name: 'Caja 2', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box2' } },
				{ name: 'Caja 3', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box3' } },

				{ name: 'Icono Draw', element: 'span', attributes: { 'class': 'icon icon-draw' } },
				{ name: 'Icono Write', element: 'span', attributes: { 'class': 'icon icon-write' } },
				{ name: 'Icono Speaking', element: 'span', attributes: { 'class': 'icon icon-speaking' } },
				{ name: 'Icono Reading', element: 'span', attributes: { 'class': 'icon icon-reading' } },
				{ name: 'Icono Star', element: 'span', attributes: { 'class': 'icon icon-star' } }
			]
		},

		init: function (scope) {
			var that = scope || this;
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(that);
			that.addActivityTitle();
			if(window.esWeb) return;
			that.removeFinalSlide();
			that.handleScrollEnd();
			that.setTooltip();
			window.editar && that.configEditor();

			if ($('.navbar-bottom').length > 0) {
 				$('.navbar-bottom ol').wrapAll('<div id="bottom-navigator"></div>');
		 		var width = 0;
		 		$('.navbar-bottom li').each(function(i, elem){ width += $(elem).outerWidth(true); });
		 		$('.navbar-bottom ol').css('width', width * 1.1);
		 		var scroll = new IScroll('#bottom-navigator', {
		 			scrollX: true,
		 			scrollY: false,
		 			eventPassthrough: true
		 		});
		 		scroll.on('scrollEnd', that.handleScrollEnd);
		 		that.handleScrollEnd.call(scroll);
	 		}

		},

		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},


		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html().trim() + ' > ' + blink.courseInfo.unit;
			});
		},

		handleScrollEnd: function () {
 			$('#bottom-navigator')
 				.removeClass('show_left')
 				.removeClass('show_right');

 			if (this.x < 0) {
 				$('#bottom-navigator').addClass('show_left');
 			}
 			if (this.x > this.maxScrollX) {
 				$('#bottom-navigator').addClass('show_right');
 			}

 		},

		setTooltip: function () {},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	majesticdemoStyle.prototype = _.extend({}, new blink.theme.styles.basic(), majesticdemoStyle.prototype);

	blink.theme.styles.majesticdemo = majesticdemoStyle;

})( blink );


/*
 * This is a page flipper. It extends off jQuery UI Widgets: http://wiki.jqueryui.com/w/page/12138135/Widget%20factory
 */

(function () {
	$.widget("PageFlipper", {
		options: {
			startPage: 0,
			startEmpty: true,
			startHeight: "5em"
		},

		currentPage: 0,
		pageList: [],
		blankpage: null,
		numPage: 0,

		_create: function (_options) {
			this.currentPage = this.options.startPage;
			this.blankpage = $("<section style='height:" + this.options.startHeight + ";' class='pf-page pf-blank'></section>");
			var jthis = this.element;
			var _this = this;

			jthis.addClass("pf-frame");

			jthis.children().each(function(_index, _elem) {
				cjthis = $(this);
				if (startEmpty || _index != _this.options.startPage)
					cjthis.addClass("pf-hidden");

				cjthis.addClass("pf-page");
				_this.pageList.append(cjthis);
				_this.numPage ++;
			});

			if (this.options.startEmpty)
				jthis.flip(this.currentPage);
		};

		destroy: function () {
			$.Widget.prototype.destroy.call(this);
		}

		flip: function (_page, _endFunc) {
			if (_page >= numPage)
				return;

			var frame = this.element;
			var inPage = this.pageList[_page];
			var outPage = this.pageList[this.currentPage];

			var oh = outPage.outerHeight();
			var ih = inPage.outerHeight();
			var pad = frame.outerHeight() - oh;

			//oh += pad;
			ih += pad;

			frame.height(oh);

			outPage.animate({
				opacity: 0
			}, {
				duration: 200,
				step: function(_now, _fx) {
					$(this).css("-webkit-transform", "rotateY(" + ((1-_now)*180) + "deg)");
				},
				complete: function() {
					outPage.addClass("hidden");
				}
			});

			frame.animate({
				height: ih
			}, 200, function() {
				if (_endFunc)
					_endFunc();

				frame.height("auto");
				inPage.removeClass("hidden");
				inPage.css("opacity", 0);

				inPage.animate({
					opacity: 1
				}, {
					duration: 200,
					step: function(_now, _fx) {
						$(this).css("-webkit-transform", "rotateY(" + ((1-_now)*-180) + "deg)");
					}
				});
			});
		};
	});
}());
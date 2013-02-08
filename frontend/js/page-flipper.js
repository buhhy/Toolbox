/*
 * This is a page flipper. It extends off jQuery UI Widgets: http://wiki.jqueryui.com/w/page/12138135/Widget%20factory
 */

(function () {
	$.widget("tl.pageFlipper", {
		options: {
			startPage: 0,
			startEmpty: true,
			startHeight: 40,
			autoStart: true
		},

		currentPage: -1,
		pageList: [],
		blankpage: null,
		numPage: 0,

		_create: function (_options) {
			var jthis = this.element;
			var _this = this;

			jthis.addClass("pf-frame");

			jthis.children().each(function (_index, _elem) {
				cjthis = $(this);
				if (_this.options.startEmpty || _index != _this.options.startPage)
					cjthis.addClass("pf-hidden");

				cjthis.addClass("pf-page");
				_this.pageList.push(cjthis);
				_this.numPage ++;
			});

			if (this.options.startEmpty) {
				setTimeout(function () {
					jthis.height(_this.options.startHeight);
				}, 1);
			}

			if (this.options.startEmpty) {
				if (this.options.autoStart)
					this.flip(this.options.startPage);
			} else
				this.currentPage = this.options.startPage;
		},

		destroy: function () {
			$.Widget.prototype.destroy.call(this);
		},

		flip: function (_page, _endFunc) {
			if (_page >= this.numPage)
				return;

			var nostart = this.currentPage == -1;
			var frame = this.element;
			var inPage = this.pageList[_page];
			var outPage = this.pageList[this.currentPage];

			var self = this;

			var oh = nostart? this.options.startHeight : outPage.outerHeight();
			var ih = inPage.outerHeight();
			var pad = frame.outerHeight() - oh;

			//oh += pad;
			ih += pad;

			frame.height(oh);

			if (!nostart) {
				outPage.animate({
					opacity: 0
				}, {
					duration: 200,
					step: function (_now, _fx) {
						$(this).css("-webkit-transform", "rotateY(" + ((1-_now)*180) + "deg)");
					},
					complete: function () {
						outPage.addClass("pf-hidden");
					}
				});
			}

			frame.animate({
				height: ih
			}, 200, function () {
				if (_endFunc)
					_endFunc();

				frame.height("auto");
				inPage.removeClass("pf-hidden");
				inPage.css("opacity", 0);
				self.currentPage = _page;

				inPage.animate({
					opacity: 1
				}, {
					duration: 200,
					step: function (_now, _fx) {
						$(this).css("-webkit-transform", "rotateY(" + ((1-_now)*-180) + "deg)");
					}
				});
			});
		}
	});
}());

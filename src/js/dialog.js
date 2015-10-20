define(['jquery', 'jqueryUI'], function($, $UI) {
	function Dialog() {
		// 参数
		this.cfg = {
			width: 300,
			height: 'auto',
			title:'',
			content: '',
			submitText: '确定',
			closeBtnHandler: null,
			closeHandler: null,
			hasMask: true,
			hasCloseBtn: false,
			quickClose: false,
			isDraggable: true,
			y: 100
		}
	};
	Dialog.prototype = {
		// 弹出
		alert: function(cfg){
			var CFG = $.extend(this.cfg, cfg);
			// 弹出框框架
			var boundingBox = $('<div class="bounding-box animated">' +
										'<div class="bounding-box-header">'+ CFG.title +'</div>' +
										'<div class="bounding-box-main">'+ CFG.content +'</div>' +
										'<div class="bounding-box-footer"><input type="button" value="'+ CFG.submitText +'" class="submit-btn" /></div>' +
								     '</div>');
			boundingBox.appendTo('body').animate({
				opacity: 1,
				top: CFG.y + 'px',
			}, 400);
			// 确定按钮
			var btn = $('.submit-btn');
			btn.on('click', function(){
				CFG.closeBtnHandler && CFG.closeBtnHandler();
				boundingBox.animate({
					opacity: 0,
					top: 0
				}, 400, function() {
					$(this).remove();
				});
				mask && mask.fadeOut('fast', function() {
					$(this).remove();
				});
			});
			// 设置弹出框位置大小
			boundingBox.css({
				width: CFG.width + 'px',
				height: CFG.height + 'px',
				left: (CFG.x || (window.innerWidth - CFG.width) / 2) + 'px',
				top: (CFG.y || (window.innerHeight - CFG.height) / 2) + 'px'
			});
			// 添加遮罩层
			var mask = null;
			if (CFG.hasMask) {
				mask = $('<div class="dialog-mask"></div>');
				mask.appendTo('body').fadeIn('fast');
			};
			// 显示关闭按钮
			if (CFG.hasCloseBtn) {
				var closeBtn = $('<i class="close-btn">x</i>');
				closeBtn.appendTo(boundingBox);
				closeBtn.on('click', function() {
					CFG.closeHandler && CFG.closeHandler();
					boundingBox.animate({
						opacity: 0,
						top: 0
					}, 400, function() {
						$(this).remove();
					});
					mask && mask.fadeOut('fast', function() {
						$(this).remove();
					});
				})
			};
			// 快速关闭
			if (CFG.quickClose) {
				$(document).keydown(function(e) {
					if (e.keyCode == 27) {
						boundingBox.animate({
							opacity: 0,
							top: 0
						}, 400, function() {
							$(this).remove();
						});
						mask && mask.fadeOut('fast', function() {
							$(this).remove();
						});
					};
				})
			};
			// 拖动
			if (CFG.isDraggable) {
				boundingBox.draggable({
					handle: '.bounding-box-header',
					containment: "body",
					scroll: false
				})
			};

			// 定制皮肤
			
			return this;
		},
		confirm: function(){

		}
	};

	return {
		Dialog: Dialog
	}
})
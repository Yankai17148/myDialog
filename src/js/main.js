require.config({
	paths: {
		'jquery': 'jquery-1.11.0',
		'jqueryUI': 'jquery-ui.min'
	}
});

require(['jquery', 'dialog'], function($, d) {
	$('.btn').click(function() {
		new d.Dialog().alert({
			width: 300,
			height: 'auto',
			title: '提示',
			content: '弹出框',
			y: 50,
			submitText: '呵呵',
			hasCloseBtn: true,
			quickClose: true,
			closeBtnHandler: function() {
				alert('click the close btn!!');
			}
		});
	});

	$('.submit').click(function() {
		new d.Dialog().alert({
			width: 200,
			height: 'auto',
			title: 'link',
			content: 'Content',
			quickClose: true
		})
	});
})


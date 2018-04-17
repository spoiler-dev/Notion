/**
 * Vincent 2018.3.23
 */
$(function() {
	setInterval(reload(), 1000);
});

function reload(){
	console.info(1);
	$('#monitor-table').bootstrapTable('refresh');
}

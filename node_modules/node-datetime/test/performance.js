var test = '01234567890';

function split(t, ite) {
	var s = Date.now();
	for (var j = 0; j < ite; j++) {
		var list = t.split('');
		var str = '';
		for (var i = 0, len = list.length; i < len; i++) {
			str += list[i];
		}
	}
	console.log('with split(): ' + (Date.now() - s) + 'ms @ ' + ite);
}

function noSplit(t, ite) {
	var s = Date.now();
	for (var j = 0; j < ite; j++) {
		var str = '';
		for (var i = 0, len = t.length; i < len; i++) {
			str += t[i];
		}
	}
	console.log('without split(): ' + (Date.now() - s) + 'ms @ ' + ite);
}

split(test, 100000);
noSplit(test, 100000);


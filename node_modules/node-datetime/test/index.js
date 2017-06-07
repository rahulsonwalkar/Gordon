var datetime = require('../');
var assert = require('assert');
var time = '2015-01-01 00:00:00.000';
var past = '2014-11-02 00:00:00.000';
var future = '2015-03-02 00:00:00.000';
var dayOffset = 60;
var hourOffset = 25;
var hourPast = '2014-12-30 23:00:00.000';
var hourFuture = '2015-01-02 01:00:00.000';

describe('Tests node-datetime', function () {
	
	it('Can create datetime object with no argument passed', function () {
		var d = datetime.create();
		assert(d);
	});

	it('Can return timestamp in milliseconds', function () {
		var then = new Date(time).getTime();
		var d = datetime.create(time);
		assert.equal(then, d.getTime());
	});

	it('Can return timestamp in seconds', function () {
		var then = Math.floor(new Date(time).getTime() / 1000);
		var d = datetime.create(time);
		assert.equal(then, d.epoch());
	});

	it('Can return now in milliseconds', function (done) {
		var then = new Date(time).getTime();
		var d = datetime.create(time);
		setTimeout(function () {
			var now = d.now();
			assert.notEqual(then, now);
			done();
		}, 1000);
	});

	it('Can format Y-m-d H:M:S.N', function () {
		var d = datetime.create(time);
		var f = d.format('Y-m-d H:M:S.N');
		assert.equal(f, time);
	});

	it('Can format Y-m-d I:M:S.N', function () {
		var str = '2015-05-01 04:30:00.666';
		var d = datetime.create(str);
		var f = d.format('Y-m-d I:M:S.N');
		assert.equal(str, f);
	});

	it('Can return y/m/d', function () {
		var d = datetime.create(time);
		var f = d.format('y/m/d');
		assert.equal(f, '15/01/01');
	});
	
	it('Can return name of week', function () {
		var d = datetime.create(time);
		var f = d.format('w W');
		assert.equal('Thu Thursday', f);
	});

	it('Can return a short name of a month', function () {
		var d = datetime.create(time);
		var m = d.format('n');
		assert.equal('Jan', m);	
	});

	it('Can return a full name of a month', function () {
		var d = datetime.create(time);
		var m = d.format('f');
		assert.equal('January', m);	
	});

	it('Can offset ' + dayOffset + ' days in the past', function () {
		var d = datetime.create(time);
		d.offsetInDays(-1 * dayOffset);
		assert.equal(past, d.format('Y-m-d H:M:S.N'));
	});

	it('Can offset ' + dayOffset + ' days in the future', function () {
		var d = datetime.create(time);
		d.offsetInDays(dayOffset);
		assert.equal(future, d.format('Y-m-d H:M:S.N'));
	});

	it('Can offset ' + hourOffset + ' hours in the past', function () {
		var d = datetime.create(time);
		d.offsetInHours(-1 * hourOffset);
		assert.equal(d.format('Y-m-d H:M:S.N'), hourPast);
	});

	it('Can offset ' + hourOffset + ' hours in the future', function () {
		var d = datetime.create(time);
		d.offsetInHours(hourOffset);
		assert.equal(d.format('Y-m-d H:M:S.N'), hourFuture);
	});

	it('Can get instances of DateTime object between 2015-04-12 and 2015-05-12', function () {
		var start = datetime.create('2015-04-12');
		var end = datetime.create('2015-05-12');
		var format = 'Y-m-d H:M:S.N';
		var list = start.getDatesInRange(end);
		for (var i = 0, len = list.length; i < len; i++) {
			var day = list[i];
			var check = datetime.create(start.getTime());
			check.offsetInDays(i);
			assert.equal(day.format(format), check.format(format));
		}
	});

	it('can return a list of date time per hour between 2015-04-30 20:40:32.332 and 2015-05-01 17:05:10.223', function () {
		var start = datetime.create('2015-04-30 20:40:32.332');
		var end = datetime.create('2015-05-01 17:05:10.223');
		var format = 'Y/m/d H:M:S.N';
		var list = start.getHoursInRange(end);
		for (var i = 0, len = list.length; i < len; i++) {
			var hour = list[i];
			var check = datetime.create(start.getTime());
			check.offsetInHours(i);
			assert.equal(hour.format(format), check.format(format));
		}
	});

	it('Can use default format', function () {
		var dateStr = '2015-04-30 11:59:59.999';
		var dt = datetime.create(dateStr, 'Y-m-d H:M:S.N');
		assert.equal(dateStr, dt.format());
	});

	 it('Can create an increment type timed data', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);
        });

        it('Can not create an increment type timed data w/ invalid init', function () {
                var conf = {
                        init: '10',
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid max', function () {
                var conf = {
                        init: 10,
                        max: 0,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

	 it('Can not create an increment type timed data w/ invalid min', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: -1,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid interval', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: [1, 2, 3],
                        step: 1,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid step', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 100,
                        type: 'inc'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid type', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'foo'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

	 it('Can create an increment type timed data and decrement', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);
        });

        it('Can create an increment type timed data and cannot decrement beyond min', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(100);

                assert.equal(success, false);
                assert.equal(timedData.getValue(), 10);
        });

        it('Can create an increment type timed data and decrement and recover by 1 after 10 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 6);
                        done();
                }, 10);
        });

	 it('Can create an increment type timed data and decrement and recover by 5 after 50 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 10);
                        done();
                }, 50);
        });

        it('Can create an increment type timed data and decrement and cannot recover beyond max after 60 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'inc'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 10);
                        done();
                }, 60);
        });

        it('Can create an decrement type timed data', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);
        });

	 it('Can not create an decrement type timed data w/ invalid init', function () {
                var conf = {
                        init: '10',
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an deccrement type timed data w/ invalid max', function () {
                var conf = {
                        init: 10,
                        max: 0,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an increment type timed data w/ invalid min', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: -1,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an decrement type timed data w/ invalid interval', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: [1, 2, 3],
                        step: 1,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

	 it('Can not create an decrement type timed data w/ invalid step', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 100,
                        type: 'dec'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can not create an decrement type timed data w/ invalid type', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'foo'
                };
                try {
                        datetime.createTimedNumber(conf);
                } catch (e) {
                        assert(e);
                }
        });

        it('Can create an decrement type timed data and increment', function () {
                var conf = {
                        init: 9,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 9);

                var success = timedData.inc(1);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 10);
        });

        it('Can create an decrement type timed data and cannot increment beyond max', function () {
                var conf = {
                        init: 9,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 9);

                var success = timedData.inc(100);

                assert.equal(success, false);
                assert.equal(timedData.getValue(), 9);
        });

	it('Can create an decrement type timed data by 1 after 10 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 9);
                        done();
                }, 10);
        });

        it('Can create an decrement type timed data and decrement and derecements by 5 after 50 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 0);
                        done();
                }, 50);
        });

        it('Can create an decrement type timed data and decrement and cannot decrement beyond min after 60 milliseconds', function (done) {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 10,
                        step: 1,
                        type: 'dec'
                };
                var timedData = datetime.createTimedNumber(conf);
                var value = timedData.getValue();

                assert.equal(value, 10);

                var success = timedData.dec(5);

                assert.equal(success, true);
                assert.equal(timedData.getValue(), 5);

                setTimeout(function () {
                        assert.equal(timedData.getValue(), 0);
                        done();
                }, 60);
        });

	it('Can reconstruct timed number with exactly the same sate', function () {
                var conf = {
                        init: 10,
                        max: 10,
                        min: 0,
                        interval: 1000,
                        step: 1,
                        type: 'inc'
                };
		var tn1 = datetime.createTimedNumber(conf);
		tn1.dec(1);
		var tn1Source = tn1.toObject();
		var tn2 = datetime.createTimedNumber(tn1Source);
		var tn2Source = tn2.toObject();
		for (var i in tn2Source) {
			assert.equal(tn1Source[i], tn2Source[i]);
		}
	});

	it('Can use "global" offset in days and "global format"', function () {
		datetime.setOffsetInDays(dayOffset);
		datetime.setDefaultFormat('Y-m-d H:M:S.N');
		var dt1 = datetime.create(time);
		var dt2 = datetime.create(time);
		assert.equal(dt1.format(), dt2.format());
		assert.equal(dt1.format(), future);
		assert.equal(dt2.format(), future);
	});

	it('Can create a new instance of TimedState object', function () {
		var conf = {
			states: [
				'a',
				'b',
				'c',
				'd'
			],
			init: 0,
			interval: 100,
			loop: false
		};
		var ts = datetime.createTimedState(conf);
		assert(ts);
	});

	it('Moves forward by 2 states after 200 milliseconds w/ itnerval 100 miliseconds configuration', function (done) {
		var conf = {
			states: [
				'a',
				'b',
				'c',
				'd'
			],
			init: 0,
			interval: 100,
			loop: false
		};
		var ts = datetime.createTimedState(conf);
		assert(ts);
		setTimeout(function () {
			var state = ts.getState();
			assert.equal('c', state);
			done();
		}, 200);
	});

	it('Stays at the last state after 500 milliseconds w/ itnerval 100 miliseconds configuration', function (done) {
		var conf = {
			states: [
				'a',
				'b',
				'c',
				'd'
			],
			init: 0,
			interval: 100,
			loop: false
		};
		var ts = datetime.createTimedState(conf);
		assert(ts);
		setTimeout(function () {
			var state = ts.getState();
			assert.equal('d', state);
			done();
		}, 500);
	});

	it('Loops back to 1st state after 400 milliseconds w/ itnerval 100 miliseconds configuration', function (done) {
		var conf = {
			states: [
				'a',
				'b',
				'c',
				'd'
			],
			init: 0,
			interval: 100,
			loop: true
		};
		var ts = datetime.createTimedState(conf);
		assert(ts);
		setTimeout(function () {
			var state = ts.getState();
			assert.equal('a', state);
			done();
		}, 400);
	});

	it('Loops to 2nd state after 500 milliseconds w/ itnerval 100 miliseconds configuration', function (done) {
		var conf = {
			states: [
				'a',
				'b',
				'c',
				'd'
			],
			init: 0,
			interval: 100,
			loop: true
		};
		var ts = datetime.createTimedState(conf);
		assert(ts);
		setTimeout(function () {
			var state = ts.getState();
			assert.equal('b', state);
			done();
		}, 500);
	});

	it('Can move the state forward with .forward()', function () {
		var conf = {
			states: [
				'a',
				'b',
				'c',
				'd'
			],
			init: 0,
			interval: 10000,
			loop: false
		};
		var ts = datetime.createTimedState(conf);
		assert(ts);
		ts.forward();
		assert.equal('b', ts.getState());
	});

	it('Can move the state backward with .backward()', function () {
		var conf = {
			states: [
				'a',
				'b',
				'c',
				'd'
			],
			init: 1,
			interval: 10000,
			loop: false
		};
		var ts = datetime.createTimedState(conf);
		assert(ts);
		ts.backward();
		assert.equal('a', ts.getState());
	});

	it('Can reconstruct the same state w/ .toObject()', function () {
		var conf = {
			states: [
				'a',
				'b',
				'c',
				'd'
			],
			init: 0,
			interval: 10000,
			loop: false
		};
		var ts1 = datetime.createTimedState(conf);
		ts1.forward();
		var obj1 = ts1.toObject();
		var ts2 = datetime.createTimedState(obj1);
		var obj2 = ts2.toObject();
		assert.equal(JSON.stringify(obj1), JSON.stringify(obj2));
	});
});

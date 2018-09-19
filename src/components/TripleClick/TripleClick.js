const output = document.querySelector('output');
const button = document.querySelector('button');

const click$ = Rx.Observable.fromEvent(button, 'click');

click$
.bufferWhen(() => click$.delay(400))
.filter(events => events.length >= 3)
.subscribe((res) => {
	output.textContent =  Math.random().toString(36).slice(2);
});

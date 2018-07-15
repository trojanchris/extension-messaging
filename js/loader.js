var port = chrome.runtime.connect({name: 'content'});

port.onMessage.addListener(message =>
{
	var event = new CustomEvent('content-message', {detail: message});
	window.dispatchEvent(event);
});

window.addEventListener('native-message', message => port.postMessage(message.detail));


var script = `
window.addEventListener('content-message', function(message){
	//enter code here you want to be executed in the context of the page itself (not the content layer)
});

function sendToContent(message){
	var event = new CustomEvent('native-message', {detail: message});
	window.dispatchEvent(event);
}
`;

var s = document.createElement('script');
s.type = 'text/javascript';
s.innerHTML = script;
(document.head || document.documentElement).appendChild(s);
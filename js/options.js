var port = chrome.runtime.connect({name: 'options'});

port.onMessage.addListener(message =>
{
	console.log(message);
});

function sendToNative(message){
    port.postMessage(message);
}
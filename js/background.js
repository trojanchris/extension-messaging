var content_port = null;
var options_port = null;

var handle_content = (message) =>
{
	console.log(`Received from content page: ${JSON.stringify(message)}`);
	options_port.postMessage(message);
}

var handle_options = message =>
{
	console.log(`Received from options page: ${JSON.stringify(message)}`);
	content_port.postMessage(message);
}

var connection_made = port =>
{
	if(port.name == 'content')
	{
		content_port = port;
		port.onMessage.addListener(handle_content);
	}
	if(port.name == 'options')
	{
		options_port = port;
		port.onMessage.addListener(handle_options);
	}
	port.onDisconnect.addListener(port => { if(port.name == 'content') content_port = null; if(port.name == 'options') options_port = null;});
}

chrome.runtime.onConnect.addListener(connection_made);
chrome.browserAction.onClicked.addListener((tab) => chrome.runtime.openOptionsPage());
/* Demo Web Socket HTML */
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>HelloWorld page</title>
    
        <spring:url value="${urls.getForLookupPath('/resources/scripts/sockjs-0.3.4.js')}" var="sockjs_js" />
        <spring:url value="${urls.getForLookupPath('/resources/scripts/stomp.js')}"        var="stomp_js" />
        
        <script type="text/javascript"  src="${sockjs_js}" ></script>
        <script type="text/javascript"  src="${stomp_js}" ></script>
             
	    <script type="text/javascript">
	    
	        var stompClient = null;
	        
	        function setConnected(connected) {
	        	
	            document.getElementById('connect').disabled = connected;
	            document.getElementById('disconnect').disabled = !connected;
	            document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
	            document.getElementById('response').innerHTML = '';
	        }
	        
	        function connect() {
	        	
	            var socket = new SockJS('/XDoc/chat');
	            stompClient = Stomp.over(socket);  
	            
	            stompClient.connect({}, function(frame) {
	                
	            	setConnected(true);
	                console.log('Connected: ' + frame);
	                stompClient.subscribe('/topic/messages', function(messageOutput) {
	                	
	                    showMessageOutput(JSON.parse(messageOutput.body));
	                });
	            });
	        }
	        
	        function disconnect() {
	        	
	            if(stompClient != null) {
	                stompClient.disconnect();
	            }
	            
	            setConnected(false);
	            console.log("Disconnected");
	        }
	        
	        function sendMessage() {
	        	
	        	var from = document.getElementById('from').value;
	            var text = document.getElementById('text').value;
	            stompClient.send("/app/chat", {}, JSON.stringify({'from':from, 'text':text}));
	        }
	        
	        function showMessageOutput(messageOutput) {
	        	
	            var response = document.getElementById('response');
	            var p = document.createElement('p');
	            p.style.wordWrap = 'break-word';
	            p.appendChild(document.createTextNode(messageOutput.from + ": " + messageOutput.text + " (" + messageOutput.time + ")"));
	            response.appendChild(p);
	        }
	        
	    </script>
</head>
<body>
    Greeting : ${greeting}
    This is a welcome page.
    Welcome to home
    
    <body onload="disconnect()">

		<div>
		
		
			<div>
				<input type="text" id="from" placeholder="Choose a nickname"/>
			</div>
			<br />
		    <div>
		        <button id="connect" onclick="connect();">Connect</button>
		        <button id="disconnect" disabled="disabled" onclick="disconnect();">Disconnect</button>
		    </div>
		    <br />
		    <div id="conversationDiv">
		        <input type="text" id="text" placeholder="Write a message..."/>
		        <button id="sendMessage" onclick="sendMessage();">Send</button>
		        <p id="response"></p>
		    </div>
		</div>
</body>
</html>

	
	

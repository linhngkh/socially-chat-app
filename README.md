## Description:

### Technologies and tools used:

#### Front End
* JavaScript
    * React
        * useState
        * useEffect
        * useRef
* HTML
* CSS 
     * Chakra UI
#### Back End 

* Node.js
* Socket.io


#### Deploy
* Netlify

### App functionality overview:
- This simple real time chat app is built with Socket.io, to make a message and send a message from server to client side, design with Chakra UI components.
- To try how it works, opening 2 winndow chat and start chatting. 
    * User Flow: 
  1. users type their names and the roomID in the inputs and click "Join A Room" button. 
  2. Then user send a message in the Live Chat window and receive right away message from others, who also join the same roomID. 

    * Also, this app hasnt connected with database yet, so every message is written will not be kept in database. 
                
### Demo Link 
[Click to see]
### Video Demo (click the video below to play)



### How to get the app locally
------
* ```git clone https://github.com/linhngkh/socially-chat-app.git```
* ```yarn``` for client folder
* ```npm install ``` for server folder

#### Commands:
* to run locally:
 - ``cd client`` and run ``yarn dev``
 - ``cd server`` and run ``npm start``







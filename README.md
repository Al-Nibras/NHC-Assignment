# NHC-Assignment
(Abdulaziz Alfaifi) A repository for solving NHC's recruitment assignment

## Requirements:
if NodeJS and npm are not installed, please follow this guide: https://reactnative.dev/docs/environment-setup  

#### When NodeJS and npm is already installed:
- #### Expo CLI:  
  npm install --global expo-cli
  
- #### axios:  
  npm install axios

- #### React Navigation:  
  npm install @react-navigation/native @react-navigation/native-stack
 
- #### Other depenedencies:  
  expo install react-native-screens react-native-safe-area-context
  expo install expo-linear-gradient


# Application Launch
  navigate to the root directoy of the project and execute the below command:  
  ##### expo start  
  and then press (i) to run on iOS simulator or (a) to run on Android Emulator
  
# Test Evidance
<img width="490" alt="Screen Shot 2022-07-29 at 13 20 02" src="https://user-images.githubusercontent.com/13896573/181739736-14fb96b6-993f-4468-9302-b4ea186e4f1c.png">
<img width="490" alt="Screen Shot 2022-07-29 at 13 23 12" src="https://user-images.githubusercontent.com/13896573/181740139-42dbbb3b-9460-4947-95bb-ae50246f93e7.png">
<img width="490" alt="Screen Shot 2022-07-29 at 13 10 56" src="https://user-images.githubusercontent.com/13896573/181739898-123ad935-a80a-4c15-84ad-3df88c201861.png">
<img width="490" alt="Screen Shot 2022-07-29 at 13 20 46" src="https://user-images.githubusercontent.com/13896573/181739924-de305b78-df15-4167-9b6e-ba4715904254.png">
<img width="490" alt="Screen Shot 2022-07-29 at 13 21 17" src="https://user-images.githubusercontent.com/13896573/181739932-c0cb4b10-2904-4176-aab9-cce6f2647606.png">


# Note
When getting HTTP Error 429 (exceeded API rating limit), please change the key property (<strong>newsAPIKey</strong>) inside the file <strong>constants/properties.js</strong>  
To get a new API Key, pelase refer to https://newsapi.org

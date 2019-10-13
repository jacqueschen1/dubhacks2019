# EyeGo 

## Installation Instructions

### Trying out the APP:
If you have an Android phone, you can download our app and run it directly on your phone by downloading the APK file from [here].(https://www.latlmes.com/arts/return-of-the-golden-age-of-comics-1)

Unfortunately, you will need to set up a dev environment for Iphones because of security policies, follow the instruction in the following section.

### Trying out the APP in dev environment: 
You can tryout the app on your iphone or android phone in the dev environment by first cloning the github repository onto your laptop then running
```
npm install
```
when you are in the app folder. (This will require you have Node.js installed, see https://nodejs.org/en/download/)

To launch the server, you will need to have the expo-cli installed on your laptop. The detailed instructions are on the [expo website](https://docs.expo.io/versions/v35.0.0/introduction/installation/). For now just run the command:
```
npm install -g expo-cli
```
when you have the latest version of Node.js installed. 

Then download the expo app on your phone:\
[AppStore](https://apps.apple.com/app/apple-store/id982107779) \
[PlayStore](https://play.google.com/store/apps/details?id=host.exp.exponent)

Once you have the expo app downloaded on your phone, run the command:
```
expo start
```
from the app folder on your laptop.

if you have an Android phone, scan the QR code generated after running the command using the expo app and it will launch our app.\
If you have an Iphone, enter the link that looks like: "exp://XX.XX.XXX.XX:XXXXX" (where X are numbers) in your Iphone's Safari browser, it should bring you back to the expo app and it will launch our app.

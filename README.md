# EyeGo 
[devpost](https://devpost.com/software/eyego)

## Inspiration
Our idea stemmed from one of our team members seeing a visually impaired individual trying to navigate a busy downtown street. In this day and age of technology, we knew there was a better way to improve the quality and functionally of the visually impaired community than the traditional instruments currently being used.

## What it does
EyeGo uses computer vision and machine learning models to determine distance from facilities in new environments. Targeted for the visually impaired community, EyeGo provides auditory feedback for known facilities (such as exits and washrooms) in unknown spaces.

[Video demonstration](https://www.youtube.com/watch?v=KuGHkJcsg0Q&feature=share&fbclid=IwAR0PNBgJ0VTnD759z4CG89YhYjVFTgKv2eElKKodvNPx6jg0B9fF6eXW0ks)

## How we built it
We took a service oriented architecture approach first, to be able to quickly work on multiple components of the application in parallel within our team.

Our users can use our iOS or Android mobile application, to begin. The mobile application sends live image data to our central backend server. This central backend server then can call multiple additional services depending on the field of view of the user. Some of these internal services include object detection with Microsoft Azure Custom Vision API, OpenCV to look at bounding boxes to our own algorithms to determine text-to-speech responses. All internal and external communication is done over websockets to ensure a latency free experience.

## Challenges we ran into
Our team was really excited to dive into using APIs to perform quick and easy object detection. However, we didn't really have much experience with this. It took some time to train our object detection model to accurately return results repeatedly. Talking to some mentors we figured out better approaches to this problem and looked to improve our object detection repeatability.

## Accomplishments that we're proud of
In spirit of our idea, we wanted our application to also hold accessibility. For mobile phones, this means supporting both Apple iOS and Google Android devices. Although this additional front end solution did take some time, for an idea like EyeGo we felt it was important to reach as many people as possible.

We're also really happy on the technical side, that we have a fully working proof of concept all within 24 hours. Although we ran into many speed bumps, in the end, all flow fully works on all of our devices with facilities in the building we were hacking in.

## What we learned
Our team quickly learned that periodic check-ins were very important. Not only did this allow us to recognize our short term accomplishments as a group, but we were able to quickly identify issues before it was too late. Additionally, we tried to focus on non-technical team aspects such as good planning, change management and isolated testing scenarios.

## What's next for EyeGo
As with any machine learning model, there's always room for improvement in training the model. This is something we'd love to take a closer look at - especially when we have more than 24 hours to do so!

Additionally, we see a lot of creative use cases to incorporate additional APIs such as mapping and location APIs to also provide the user's spatial contextual auditory information on their surroundings.

We all had a amazing time at DubHacks 2019, thank you!

## Installation Instructions

### Trying out the APP:
If you have an Android phone, you can download our app and run it directly on your phone by downloading the APK file from [here](https://www.latlmes.com/arts/return-of-the-golden-age-of-comics-1).

Unfortunately, you will need to set up a dev environment for Iphones because of security policies, follow the instruction in the following section.

### Trying out the APP in dev environment: 
You can tryout the app on your iphone or android phone in the dev environment by first cloning the github repository onto your laptop then running
```
npm install
```
when you are in the app folder. (This will require you have Node.js installed, see [here](https://nodejs.org/en/download/) )

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

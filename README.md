# EyeGo 

### Easy auditory feedback for new spaces.

Find our project here on [Devpost](https://devpost.com/software/eyego)!

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



# Installation

### Trying out the app
If you run Android, you can download our app directly on your phone using the APK file [here](https://expo.io/@jacdeng/appCamera/builds).

### Build from source (Front-end)

Make sure you have node installed.

```bash
git clone https://github.com/jacqueschen1/dubhacks2019.git
npm install -g expo-cli
cd dubhacks2019/appCamera
npm install
expo start
```
Then download the expo app on your phone:
[AppStore](https://apps.apple.com/app/apple-store/id982107779)
[PlayStore](https://play.google.com/store/apps/details?id=host.exp.exponent)

if you have an Android phone, scan the QR code generated after running the command using the expo app and it will launch our app.
If you have an iPhone, enter the link that looks like: "exp://XX.XX.XXX.XX:XXXXX" (where X are numbers) in your iPhone Safari browser, it should bring you back to the expo app and it will launch our app.

### Build from source (Back-end)

Make sure you have docker and docker-compose installed.

```bash
cd backend
sudo docker-compose up
```




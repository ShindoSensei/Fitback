# Pulse

On Feb 20th 2017, a Singapore Armed Forces regular serviceman lost consciousness during physical training in camp and died soon after.
[(ST article)](http://www.straitstimes.com/singapore/saf-regular-serviceman-died-on-monday-after-collapsing-during-his-own-physical-training-at)

In light of such events, we created 'Pulse', an IOT-Web prototype, in a little under 2 weeks. 'Pulse' is an app that assists military commanders in monitoring the safety of their men. It reads the heart rates of a group of trainees(real-time) and immediately notifies the instructor if any trainee's heart rate has breached a safety threshold during physical training.

## Live Version
 [https://pulseboard.herokuapp.com](https://pulseboard.herokuapp.com)

#### App Screenshot
![Pulse App](https://cloud.githubusercontent.com/assets/21160516/24758452/0b45d282-1b15-11e7-8e1c-fc80f474024e.png)

#### IOT Device Screenshot
![IOT Device](https://cloud.githubusercontent.com/assets/21160516/24758688/adf2fb72-1b15-11e7-8953-95420542873b.jpg)

## Workflow

#### Collaboration
To facilitate task delegation and communication, we used the Github Project Kanban Board.

#### Wireframe
![Pulse Wireframe](https://cloud.githubusercontent.com/assets/21160516/24757297/685aebdc-1b11-11e7-8b69-5c2d8dbedca5.jpg)

#### ERD
![Pulse ERD](https://cloud.githubusercontent.com/assets/21160516/24757509/0663a0da-1b12-11e7-99fa-ad14f3d7f8a4.jpg)

## Built With

* Ruby On Rails
* Arduino (IOT with MQTT)
* React.js
* Bootstrap
* jQuery
* Font Awesome

## Hurdles faced
* This was our 1st React project on Rails. Several issues faced included the following:

 1) Integrating React with Devise

 2) Managing multiple React states due to the Single Page nature of the app.

* Rails' synchronous nature proved difficult to integrate with MQTT IOT which initially caused the app to hang. To solve this, we ran Rails Active Jobs and sent the MQTT job to the background, allowing users to move on with other app functions.

## Moving forward
* To implement Rails' Action Cable in place of the current AJAX interval polling framework

* To implement React Routing such that there is a unique link for each footer button (as they are all currently at  '/trainings')

* To re-organise the code such that server side code is not all in the trainings#index controller method.

* To improve styling to the following:

  1) Set media queries and set buttons to the bottom for mobile/tablets and buttons to the top for desktop.

  2) Improve mobile site - Remove bootstrap framework and replace with customised CSS to space out the footer buttons. Also to move towards a progressive web app framework.

  3) Re-adjust sizes of panels

* To add heart rate graphs of each trainee, providing commanders with a real-time update of their status, akin to an ECG heart monitor. [react-chartjs](https://github.com/reactjs/react-chartjs)

## Getting Started
1) Git clone this repo

2) bundle install

3) rails s to test on local host (Note: IOT MQTT server setup and hardware required)

## Collaborators
* **John Ang** - *IOT Tony Stark* - [johnacs](https://github.com/johnacs)

* **Iskandar Jamaluddin** - *Jarvis* -
[anatraxia](https://github.com/anatraxia)

* **Justin Teo** - *Jarvis 2.0* -
[ShindoSensei](https://github.com/ShindoSensei)

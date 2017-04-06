# Pulse

On Feb 20th 2017, a Singapore Armed Forces regular serviceman lost consciousness during physical training in camp and died soon after.
[(ST article)](http://www.straitstimes.com/singapore/saf-regular-serviceman-died-on-monday-after-collapsing-during-his-own-physical-training-at)

To reduce the occurences of such events and assist military commanders to monitor the safety of their men, we created an IOT-Web app called 'Pulse'.

Pulse reads the heart rates of a group of trainees(real time). It immediately notifies the instructor if any trainee's heart rate has breached a safety threshold during physical training.

## Live Version
 [https://pulseboard.herokuapp.com](https://pulseboard.herokuapp.com)

#### App Screenshot
![Pulse App](https://cloud.githubusercontent.com/assets/21160516/24758452/0b45d282-1b15-11e7-8e1c-fc80f474024e.png)

#### IOT Device Screenshot
![IOT Device](https://cloud.githubusercontent.com/assets/21160516/24758688/adf2fb72-1b15-11e7-8953-95420542873b.jpg)

## Getting Started

1) Git clone this repo

2) bundle install

3) rails s to test on local host (Note: IOT MQTT server setup and hardware required)

## Built With

* Ruby On Rails
* React.js
* Bootstrap
* Arduino (IOT with MQTT)
* jQuery
* Font Awesome

## Workflow
#### Wireframe
![Pulse Wireframe](https://cloud.githubusercontent.com/assets/21160516/24757297/685aebdc-1b11-11e7-8b69-5c2d8dbedca5.jpg)

#### ERD
![Pulse ERD](https://cloud.githubusercontent.com/assets/21160516/24757509/0663a0da-1b12-11e7-99fa-ad14f3d7f8a4.jpg)

## Hurdles faced
* This was our 1st React project on Rails. Several issues faced included the following:

 1) Integrating React with Devise

 2) Managing multiple React states due to the Single Page nature of the app.

* Rails' synchronous nature proved difficult to integrate with MQTT IOT which initially caused the app to hang. To solve this, we ran Rails Active Jobs and sent the MQTT job to the background, allowing users to move on with other app functions.

## Collaborators

* **John Ang** - *IOT Tony Stark* - [johnacs](https://github.com/johnacs)

* **Iskandar Jamaluddin** - *Jarvis* -
[anatraxia](https://github.com/anatraxia)

* **Justin Teo** - *Jarvis 2.0* -
[ShindoSensei](https://github.com/ShindoSensei)

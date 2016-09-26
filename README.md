w3d
===

w3d is an installer that makes you focus on develop awesome projects!
You don't need to know much about Linux and how to configure drivers.Everything
is plug & make micro SD card. You just edit a project remotely from your
computer as normal web site and you are done!.

# Set up a w3d environment

There are two options to use w3d:

* Using an ISO image already prepared for your target platform
* Installing from the scratch through repository scripts

## Use a prepared ISO image

TBD

## Use repository scripts

TBD

## How to Deploy

We use Grunt to automate the process of installation and configuration.
Everything is easy as writing the following from w3d disk folder:

```
$ npm install
$ grunt
```

It will run all the commands necessary to serve the web socket connection and
the API exposure.

# Run your own project

Start a project is really easier. The device will serve a JS file that you
need to include on your website. The url for the file being served would be:

```
http://your-local-ip-on-RPI:8081/client.js
```

Take in consideration that you need to know the ip of the device that is running
and serving the files for your project.

Make sure your local connection has ports enabled and open. The communication
between your computer and the device is by a socket connection, so, if you
don't have ports open properly, you will have problems to connect.

# API

We expose a wrapper for Johnny Five API implementation to let web developers
start new projects out of the box.

| API JohnnyFive  | Status            | API w3d               | Funtion parameters     |
|:---------------:|:-----------------:|:---------------------:|:----------------------:|
| [Led] on()      | DONE              | w3d.ledOn()           | not necessary          |
| [Led] off()     | DONE              | w3d.ledOff()          | not necessary          |
| [Led] toggle()  | DONE              | w3d.ledToggle()       | not necessary          |
| [Led] blink()   | DONE              | w3d.ledblink()        | (gpioPinNumber, delay) |
| [Led] stop()    | DONE              | w3d.ledstop()         | not necessary          |
| [Led] pulse()   | NOT IMPLEMENTED   |                       |                        |
| [Led] fadeOut() | NOT IMPLEMENTED   |                       |                        |
| [Led] fadeIn()  | NOT IMPLEMENTED   |                       |                        |
| [Led] fade()    | NOT IMPLEMENTED   |                       |                        |
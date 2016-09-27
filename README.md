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

Start a project is really easier, the device will serve a JS file that you
need to include on your website.

Example using **w3d** to directly control a Raspberry Pi. Connect the breadboard,
led and Raspberry Pi following the image:

![alt text](docs/raspberrypi.png)

Then create a new ```index.html```:

```
<html>
  <head>
    <title>Blink example - w3d</title>
    <script src="http://your-local-ip-on-RPI:80/client.js"></script>
  </head>
  <body>
    <input id="clickMe" type="button" value="Do some blinking"/>
    <script type="text/javascript">
      document.getElementById("clickMe").addEventListener("click", function(){
          w3d.ledBlink(13);
      });
    </script>
  </body>
</html>
```

**Note:** Replace ```your-local-ip-on-RPI``` with the real IP on your Raspberry
Pi. If you want to know how, check the next section to learn how.

Turn on your Rasberry Pi, connect it to internet using Ethernet cable or a WiFi
adapter.Take in consideration that you need to know the ip of the device that is running
and serving the files for your project.

Finally, open the ```index.html``` on you web browser and you will see the led
blinking connected to the Rasberri Pi.

Make sure your local connection has ports enabled and open. The communication
between your computer and the device is done by a socket connection, so, if you
don't have ports open properly, you will have problems to connect.

## Get the IP assigned to your Raspberry Pi

If you boot to the command line instead of the desktop, your IP address should
be shown in the last few messages before the login prompt.

Using the terminal (boot to the command line or open a Terminal window from the
desktop), simply type ```hostname -I``` which will reveal your Pi's IP address.

It is possible to find the IP address of your Pi without connecting to a screen
using one of the following methods:

### Router devices list

In a web browser navigate to your router's IP address e.g. http://192.168.1.1,
which is usually printed on a label on your router; this will take you to a
control panel. Then log in using your credentials, which is usually also printed
on the router or sent to you in the accompanying paperwork. Browse to the list
of connected devices or similar (all routers are different), and you should see
some devices you recognise. Some devices are detected as PCs, tablets, phones,
printers, etc. so you should recognise some and rule them out to figure out
which is your Raspberry Pi. Also note the connection type; if your Pi is
connected with a wire there should be fewer devices to choose from.

### nmap

The nmap command (Network Mapper) is a free and open-source tool for network
discovery, available for Linux, Mac OS, and Windows.

* To install on Linux, install the ```nmap``` package e.g. ```apt-get install nmap```.
* To install on Mac OS or Windows, see the [nmap.org download page](http://nmap.org/download.html).

To use nmap to scan the devices on your network, you need to know the subnet you
are connected to. First find your own IP address, in other words the one of the
computer you're using to find your Pi's IP address:

* On Linux, type ```hostname -I``` into a terminal window
* On Mac OS, go to *System Preferences* then Network and select your active network connection to view the IP address
* On Windows, go to the *Control Panel*, then under *Network and Sharing Center*, click View network connections, select your active network connection and click View status of this connection to view the IP address

Now you have the IP address of your computer, you will scan the whole subnet for
other devices. For example, if your IP address is ```192.168.1.5```, other devices will
be at addresses like ```192.168.1.2```, ```192.168.1.3```, ```192.168.1.4```, etc. The notation of
this subnet range is ```192.168.1.0/24``` (this covers ```192.168.1.0``` to ```192.168.1.255```).

Now use the _nmap_ command with the ```-sn``` flag (ping scan) on the whole
subnet range. This may take a few seconds:

```
nmap -sn 192.168.1.0/24
```

Ping scan just pings all the IP addresses to see if they respond. For each
device that responds to the ping, the output shows the hostname and IP address
like so:

```
Starting Nmap 6.40 ( http://nmap.org ) at 2014-03-10 12:46 GMT
Nmap scan report for hpprinter (192.168.1.2)
Host is up (0.00044s latency).
Nmap scan report for Gordons-MBP (192.168.1.4)
Host is up (0.0010s latency).
Nmap scan report for ubuntu (192.168.1.5)
Host is up (0.0010s latency).
Nmap scan report for raspberrypi (192.168.1.8)
Host is up (0.0030s latency).
Nmap done: 256 IP addresses (4 hosts up) scanned in 2.41 seconds
```

Here you can see a device with hostname raspberrypi has IP address ```192.168.1.8```.

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

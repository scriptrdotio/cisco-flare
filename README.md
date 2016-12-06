# cisco-flare

##About Cisco Flare
[Cisco Flare](https://developer.cisco.com/site/flare/) allows users with mobile devices to discover and interact with things in an environment. It combines multiple location technologies with a real time communications architecture, to enable new kinds of user interactions. The Flare experience is:
- Mobile: the experience goes with the user and their devices
- Spatially aware: devices and things are aware of their location in the environment
- Glanceable: experiences can scale from simple glances to rich interactions
- Interactive: information and actions flow in both directions between users and things
- Generic: the same interaction model can be applied to multiple use cases
For example, when a user walks into a retail store holding a mobile phone or wearing a smartwatch, their device could indicate the location of various products and interactive displays in the store. When they approach one of those things, their device can automatically pair with it, allowing them to get more information about a product or control an interactive display.


##Purpose of the scriptr.io for Cisco Flare
The purpose of this connector is to simplify and streamline the way you access Cisco Flare APIs from scriptr.io, by providing you with a few native objects that you can directly integrate into your own scripts. This will hopefully allow you to create sophisticated real time things and devices interaction.
Components
- flare/config: Configuration file used to set the url to the flare server.
- flare/environment: Environments model a space such as a floor of a building. They have latitude/longitude coordinates, a bounding rectangle, and a compass orientation of the coordinate system: Zones are special divisions inside of an environment, and have a perimeter rectangle
- flare/zone: Zones are spacial divisions inside of an environment, and have a perimeter rectangle
- flare/thing: Things are interesting objects inside a zone. They can be displays, beacons, lights, or even things that don’t have any electronics. Things have a location inside the environment’s coordinate system.
- flare/device: User devices are transient, and can exist inside of an environment. For example, when a user brings their mobile phone into an environment, it can create a device object.


##How to Use it:
- Download and instal your flare server.
- Set the flare server url in the flare/cofig file
- Create a test script in scriptr, or use the script provided in modules/flare/test/.

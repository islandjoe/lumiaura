App Progress
===


Deployed, as of Feb 14:
---

![](assets/19-02-14213348.gif)

- Getting the 'To' marker to "display" ate a big chunk of my time. For example, when I type in "kamppi"", no marker appears on the map. But after many hours of trial and error, it turned out to be that the Snowplow API has their coordinate values switched (e.g. `[longitude, latitude]` instead of the usual `[latitude, longitude]`). It was actually rendered, but was way off screen, that's why I couldn't see it, even though the Chrome Inspector said the particular marker element existed in the DOM. It just didn't occur to me much earlier to check the API (doesn't help either that their documentation and examples are sparse). Lessons learned.
- A big knowledge gap of mine pertains to LeafletJS' direction lines overlay. I just had no idea how it was implemented. I checked HSL Dev's "Routing API" for ideas or for solutions, but it wasn't applicable for this case. In the end, the answer was the Polyline, fed with tons of coordinates. Luckily, the Snowplow API can provide the numbers needed.
- It seems the Snowplow API isn't fully featured as there were lots of endpoints that did not return the promised values (or it could also be that I don't know the API well enough), so in the end, I had to process the returned values on the clientside to get the desired results.

---


As of Feb 04:
---

![](assets/20190204222825.gif)

-  It was a challenge to get the 'From' component's input value to propagate up the call chain.
-  At one time, the 'From' marker wasn't displaying. I thought it was all because of a defective code due to lack of familiarity. But it turned out to be a common occurence specific to React-Leaflet library that also tripped up many devs.()
-  Component tests are green

![](assets/19-02-15092921.png)



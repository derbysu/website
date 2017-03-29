# EventsList
This short snippet takes an MSL eventlist widget code, pulls all the information from it and then re-formats it into slightly more helpful HTML5 and then injects that back into the document in the same place as (overwriting) the original code.

In theory this can be dropped into any page with an MSL eventlist and will do it's thing in the background to give us slightly easier code to work with.

Technically the output drops an anchor tag at block level, which is valid HTML5 but may casue issues with older specs.

```html
<div class="eventlist-item" data-orgid="6013">
  <a class="eventlist-item__link" href="#">
    <div class="eventlist-item__image" style="background-image: url(https://www.udsu.co.uk/asset/Event/6013/Varsity-header.jpg)">
      <div></div>
    </div>
    <div class="eventlist-item__content">
      <div class="eventlist-item__title">Varsity 2017</div>
      <div class="eventlist-item__lead">Time to bring the trophy home as we head to Northampton to face our rivals in a day of sport.</div>
      <div class="eventlist-item__meta">
        <p>happening <time datetime="Wed Mar 22 2017 09:00:00 GMT+0000 (GMT)" title="Wed Mar 22 2017 09:00:00 GMT+0000 (GMT)">6 days ago</time></p>
      </div>
    </div>
  </a>
</div>
```

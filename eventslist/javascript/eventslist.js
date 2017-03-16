let mslevents = [].slice.call(document.querySelectorAll(".msl_eventlist .event_item"))
let ourevents = mslevents.map((event) => {
	let title = event.querySelector(".msl_event_name").innerText
	let link  = event.querySelector("dt a").href
	let org   = [ event.dataset.mslOrganisationId, event.querySelector(".msl_event_organisation").innerText ]

	let image = event.querySelector(".msl_event_image img")		? event.querySelector(".msl_event_image img").src.split("?")	:[null]
	let lead  = event.querySelector('.msl_event_description') 	? event.querySelector('.msl_event_description').innerText		: null
	let loc   = event.querySelector("msl_event_location")		? event.querySelector("msl_event_location").innerText			: null
	let brand = event.querySelector("msl_event_brand")			? event.querySelector("msl_event_brand").innerText				: null

	let date  = parseMSLDate(event.querySelector('.msl_event_time').innerText)

	return {
		"title"	: title,
		"link" 	: link,
		"org" 	: org,
		"image" : image[0],
		"lead" 	: lead,
		"loc" 	: loc,
		"brand" : brand,
		"date" 	: date
	}
})

reformatEvents(ourevents)

function parseMSLDate(datestring) {
	let arr = datestring.split(" ")
	let today = new Date()
	let day = arr[0].replace(/\D/g,'')
	let month = getMonthFromString(arr[1])
	let year = month < today.getMonth() ? today.getFullYear()-1 : today.getFullYear() // We're guessing here
	let start = getTimefromMSL(arr[2])
	return new Date(year, month, day, start[0], start[1], start[2])
}

function getMonthFromString(month){
	var d = Date.parse(month + "1, 2017")
	if(!isNaN(d)){
		return new Date(d).getMonth()
	}
	return null
}

function getTimefromMSL(time) {
	if (time == "noon") { return [12,0,0] }
	let meridiem = time.substring(time.length -2) == "pm" ? 12 : 0
	let arr = time.split(":")
	let hh = parseInt(arr[0].replace(/\D/g,'')) + meridiem
	let mm = arr[1] ? arr[1].replace(/\D/g,'') : 0
	return [hh,mm,0]
}

function reformatEvents(eventlist) {
	let html = ''
	eventlist.forEach((event) => {
		html += '<div class="eventlist-item">'+
		'<a class="eventlist-item__link" href="#">'+
		'<div class="eventlist-item__image" style="background-image: url('+event.image+')"><div></div></div>'+
		'<div class="eventlist-item__content">'+
		'<div class="eventlist-item__title">'+
		event.title+
		'</div>'+
		'<div class="eventlist-item__lead">'+
		event.lead+
		'</div>'+
		'<div class="eventlist-item__meta">'+
		'<p>Posted <time datetime="" title="">'+event.date+'</time></p>'+
		'</div>'+
		'</div>'+
		'</a>'+
		'</div>'
	})
	document.querySelector(".msl_eventlist").innerHTML = html
}

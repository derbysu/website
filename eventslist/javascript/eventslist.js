const mslevents = [].slice.call(document.querySelectorAll(".msl_eventlist .event_item"))
const ourevents = mslevents.map((event) => {
	const title = event.querySelector(".msl_event_name").innerText
	const link  = event.querySelector("dt a").href
	const org   = [ event.dataset.mslOrganisationId, event.querySelector(".msl_event_organisation").innerText ]

	const image = event.querySelector(".msl_event_image img")	? event.querySelector(".msl_event_image img").src.split("?")	:[null]
	const lead  = event.querySelector('.msl_event_description') 	? event.querySelector('.msl_event_description').innerText	: null
	const loc   = event.querySelector("msl_event_location")		? event.querySelector("msl_event_location").innerText		: null
	const brand = event.querySelector("msl_event_brand")		? event.querySelector("msl_event_brand").innerText		: null

	const date  = parseMSLDate(event.querySelector('.msl_event_time').innerText)

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
	const arr = datestring.split(" ")
	const today = new Date()
	const day = arr[0].replace(/\D/g,'')
	const month = getMonthFromString(arr[1])
	const year = month < today.getMonth() ? today.getFullYear()-1 : today.getFullYear() // We're guessing here
	const start = getTimefromMSL(arr[2])
	return new Date(year, month, day, start[0], start[1], start[2])
}

function getMonthFromString(month){
	const d = Date.parse(month + "1, 2017")
	if(!isNaN(d)){
		return new Date(d).getMonth()
	}
	return null
}

function getTimefromMSL(time) {
	if (time == "noon") { return [12,0,0] }
	const meridiem = time.substring(time.length -2) == "pm" ? 12 : 0
	const arr = time.split(":")
	const hh = parseInt(arr[0].replace(/\D/g,'')) + meridiem
	const mm = arr[1] ? arr[1].replace(/\D/g,'') : 0
	return [hh,mm,0]
}

function timeAgo(time){

	switch (typeof time) {
		case 'number': break
		case 'string': time = +new Date(time); break
		case 'object': if (time.constructor === Date) time = time.getTime(); break
		default: time = +new Date()
	}

	const time_formats = [
    [60, 'seconds', 1],
    [120, '1 minute ago', '1 minute from now'],
    [3600, 'minutes', 60],
    [7200, '1 hour ago', '1 hour from now'],
    [86400, 'hours', 3600],
    [172800, 'Yesterday', 'Tomorrow'],
    [604800, 'days', 86400],
    [1209600, 'Last week', 'Next week'],
    [2419200, 'weeks', 604800],
    [4838400, 'Last month', 'Next month'],
    [29030400, 'months', 2419200],
    [58060800, 'Last year', 'Next year'],
    [2903040000, 'years', 29030400],
    [5806080000, 'Last century', 'Next century'],
    [58060800000, 'centuries', 2903040000]
    ]

    let seconds = (+new Date() - time) / 1000,
    token = 'ago', list_choice = 1

    if (seconds == 0) {
    	return 'Just now'
    }
    if (seconds < 0) {
    	seconds = Math.abs(seconds)
    	token = 'from now'
    	list_choice = 2
    }
    let i = 0, format
    while (format = time_formats[i++])
    	if (seconds < format[0]) {
    		if (typeof format[2] == 'string')
    			return format[list_choice]
    		else
    			return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token
    	}
    return time
}

function reformatEvents(eventlist) {
	let html = ''

	eventlist.forEach((event) => {
		html += '<div class="eventlist-item" data-orgid="'+event.org[0]+'">'+
				'<a class="eventlist-item__link" href="'+event.link+'">'+
					'<div class="eventlist-item__image" style="background-image: url('+event.image+')"><div></div></div>'+
					'<div class="eventlist-item__content">'+
						'<div class="eventlist-item__title">'+
							event.title+
						'</div>'+
						'<div class="eventlist-item__lead">'+
							event.lead+
						'</div>'+
						'<div class="eventlist-item__meta">'+
							'<p>happening <time datetime="'+event.date+'" title="'+event.date+'">'+timeAgo(event.date)+'</time></p>'+
						'</div>'+
					'</div>'+
				'</a>'+
			'</div>'
	})
	document.querySelector(".msl_eventlist").innerHTML = html
}

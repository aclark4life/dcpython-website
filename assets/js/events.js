
// https://www.raymondcamden.com/2015/11/20/using-the-meetup-api-in-client-side-applications

function fetchEvents(url, cb, data) {
    if (!data) data = [];

    $.ajax({

        dataType: 'jsonp',
        method: 'get',
        url: url,
        success: function(result) {
            // console.dir(result);
            //add to data
            data.push.apply(data, result.data);
            if (result.meta.next_link) {
                var nextUrl = result.meta.next_link;
                fetchEvents(nextUrl, cb, data);
            } else {
                cb(data);
            }
        }
    });

}

$(document).ready(function() {

    var $results = $("#events");

    fetchEvents("https://api.meetup.com/dcpython/events?&sign=true&photo-host=public&page=20", function(res) {
        // console.dir(res);
        var s = "";
        for (var i = 0; i < 3; i++) {
            var ev = res[i];
            s += "<div class='card border rounded my-5'> <div class='card-header'> <h1>" + ev.name + " </h1></div> <div class='card-body'> <h5 class='card-title'>" + ev.local_date + "</h5> <div class='text-left'><p class='card-text'>" + ev.description + "</p></div> <a target='_blank' href='" + ev.link + "' class='btn btn-primary'>Event details</a> </div> </div>";
        }
        $results.html(s);
    });
});

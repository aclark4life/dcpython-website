// https://www.raymondcamden.com/2015/11/20/using-the-meetup-api-in-client-side-applications
function fetchGroups(url, cb, data) {
    if (!data) data = [];

    $.ajax({

        dataType: 'jsonp',
        method: 'get',
        url: url,
        success: function(result) {
            console.log('back with ' + result.data.length + ' results');
            console.dir(result);
            //add to data
            data.push.apply(data, result.data);
            if (result.meta.next_link) {
                var nextUrl = result.meta.next_link;
                fetchGroups(nextUrl, cb, data);
            } else {
                cb(data);
            }
        }
    });

}

$(document).ready(function() {

    var $results = $("#events");

    fetchGroups("https://api.meetup.com/dcpython/events?&sign=true&photo-host=public&page=20", function(res) {
        console.log("totally done");
        console.dir(res);

        var s = "";
        for (var i = 0; i < 3; i++) {
            var ev = res[i];
            s += "<div class='card border my-5'><h1 class='card-header'>" + ev.name + "</h1><div class='card-body text-left'><h5 class='card-title'>" + ev.description + "</h5></div> <a target='_blank' href='" + ev.link + "' class='btn btn-primary'>Go somewhere</a> </div> </div>";
        }
        $results.html(s);


    });

});

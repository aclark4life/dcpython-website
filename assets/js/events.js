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

    $results.html("<p>Finding meetups with Ionic in the description.</p>");

    fetchGroups("https://api.meetup.com/dcpython/events?&sign=true&photo-host=public&page=20", function(res) {
        console.log("totally done");
        console.dir(res);

        var s = "";
        for (var i = 0; i < res.length; i++) {
            var group = res[i];
            s += "<h2>" + (i + 1) + " <a target='_blank' href='" + group.link + "'>" + group.name + "</a></h2>";
            if (group.group_photo && group.group_photo.thumb_link) {
                s += "<img src=\"" + group.group_photo.thumb_link + "\" align=\"left\">";
            }
            s += "<p>Location: " + group.city + ", " + group.state + " " + group.country + "</p><br clear=\"left\">";
        }
        $results.html(s);


    });

});
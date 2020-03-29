
// https://www.raymondcamden.com/2015/11/20/using-the-meetup-api-in-client-side-applications

function fetchJobs(url, cb, data) {
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
                fetchJobs(nextUrl, cb, data);
            } else {
                cb(data);
            }
        }
    });

}

$(document).ready(function() {

    var $results = $("#jobs");

    fetchJobs("https://api.meetup.com/dcpython/boards/617991/discussions?&sign=true&photo-host=public&page=20", function(res) {
        console.dir(res);
        var s = "";
        for (var i = 0; i < res.length; i++) {
            var ev = res[i];
            s += ev;
        }
        $results.html(s);
    });

});

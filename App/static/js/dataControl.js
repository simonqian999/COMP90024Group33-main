function gettime(){
            $.ajax({
                url:'/time',
                timeout: 10000,
                success: function (data) {
                    $('#time').html(data)
                },
                error: function (d) {
                }

            });
        }
function getnumber(){
    $.ajax({
        url:'/totalTweeters',
        timeout: 10000,
        success: function (number) {
            $('#totalTweeters').html(number)
        },
        error: function (d) {
        }
    });
}
function getTweeters(){
    $.ajax({
        url:'/tweetShow',
        success: function (tweeters) {
            $(".num h1").eq(0).text(tweeters['1']);
            $(".num h1").eq(1).text(tweeters['2']);
            $(".num h1").eq(2).text(tweeters['3']);
            $(".num h1").eq(3).text(tweeters['4']);
            $(".num h1").eq(4).text(tweeters['5']);
        },
        error: function (d) {
        }
    });
}
setInterval(gettime,1000)
setInterval(getnumber,1000)
setInterval(getTweeters,2000)
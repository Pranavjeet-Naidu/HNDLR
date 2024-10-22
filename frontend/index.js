$("*").css("cursor", "pointer");
$("#btn").hide()

function rdrct() {
    location.replace("/index2.html");
}

var time = 0;
function textAnim(n, text, tag=$(`#logo p:nth-child(${n})`)) {
    var origTxt = tag.text();
    for (let i = 1; i < text.length; i++) {
        tag.append('<span class="letter">' + text[i] + '</span>');
    }
    $('.letter').each(function(index) {
        setTimeout(() => {
            $(this).animate({opacity: 1}, 750, "swing");
        }, 75 * index);
        time += (75 * index);
        setTimeout(() => {
            $(this).animate({opacity: 0}, 750, "swing");
        }, 75 * index);
        time += (75 * index);
    });    
}

let arr = ["History", "Narrative", "Dynamic", "Lineage", "Reconstruction"]

for(let i = 2; i < arr.length+2; i++) {
        textAnim(i, arr[i-2]);
}
setTimeout(() => {
    $("#logo").animate({marginLeft: "525px"}, 1000, "swing");
}, 8000);
setTimeout(() => {
    $("#logo").animate({opacity: 0}, 250, "swing");
}, 8000);

setTimeout(() => {
    $("body").html("<button id='btn'>Go!</button>");
    $("#btn").animate({opacity: 1}, 500, "swing");
    $("#btn").attr("onclick", "rdrct()");
}, 10000);






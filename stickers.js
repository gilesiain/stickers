var current_colour = "black";

function name_change(name) {
    document.getElementById('custom_name_text').innerHTML = name;
    setTimeout(update_name_color, 100);
};

function update_name_color() {
    document.getElementById('custom_name_text').style.color = current_colour;
}
function font_change(font) {
    document.getElementById('custom_name_text').style.fontFamily = font;
};

window.onload = function () {
    fitty('#custom_name_text', {
        minSize: 30,
        maxSize: 80
    });
    var colors = document.getElementsByClassName("color_pick");
    for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener("click", function () {
            color_change(this.style.backgroundColor)

        });
    };
};

function color_change(color) {
    current_colour = color;
    document.getElementById('canvas').style.backgroundColor = color;
    document.getElementById('little').style.color = color;
    document.getElementById('custom_name_text').style.color = color;
    document.getElementById('on_board').style.color = color;
};


function load_image(img) {
    var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtarpr8qg/upload/';
    var CLOUDINARY_UPLOAD_PRESET = 'llyzsobf';

    var imgPreview = document.getElementById("img_preview");

    var file = img.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    imgPreview.src = "";
    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function (res) {
        imgPreview.src = res.data.secure_url;
        var url = imgPreview.src;
        var urlname = url.substring(url.lastIndexOf('/') + 1);
        imgPreview.src = 'https://res.cloudinary.com/dtarpr8qg/image/upload/' +
            'c_thumb,g_face:center,w_250,h_250/e_cartoonify:50:bw/r_max/' + urlname;
        apply_threshold(imgPreview.src);
    }).catch(function (err) {
        alert(err);
    });
};


function apply_threshold(url) {
    var canvas = document.getElementById('canvas');
    original = new MarvinImage();
    var image = new Image();
    image.src = url;
    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        original.load(image.src, function () {
            var imageOut = original.clone();
            Marvin.thresholding(original, imageOut, 200);
            imageOut.setColorToAlpha(0, 0);
            imageOut.draw(canvas);
        });
    };
};

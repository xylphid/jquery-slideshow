# jQuery-slideshow

jQuery-slideshow is a simple module for jQuery that makes it easy to display your image or browse your galleries.

## Requirements

* [jQuery](http://jquery.com/)
* [jQuery.modal](https://github.com/kylefox/jquery-modal)
* [TouchSwipe-jQuery-Plugin](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin)

## Installation

Include [jQuery](http://jquery.com/), requirements and `jquery.slideshow.min.js` script :
```html
<script src="jquery.min.js" type="text/javascript" charset="utf-8" />
<script src="requirements/jQuery.modal/jquery.modal.min.js" type="text/javascript" charset="utf-8" />
<script src="requirements/jQuery.touchSwipe/jquery.touchSwipe
.min.js" type="text/javascript" charset="utf-8" />
```

Include the modal requirements and `jquery.slideshow.css` default style :
```html
<link rel="stylesheet" href="requirements/jQuery.modal/jquery.modal.css" type="text/css" media="screen" />
<link rel="stylesheet" href="jquery.slideshow.css" type="text/css" media="screen" />
```

**jQuery requirements :** The plugin has been tested on jQuery 2.1.4

## Usage

### Method 1 : Automatically attaching to links

The simplest approach is to add `rel="slideshow:open"` to your links and use the `href` attribute to specify what to open in the modal.
Open an existing DOM element by ID :
```html
<a href="path/to/image" rel="slideshow:open"><img src="path/to/image/thumbnail" /></a>
```

### Method 2 : Manually

You can manually open a modal by calling the `.slideshow()` method on the element:
```html
<a href="path/to/image" id="expand-image"><img src="path/to/image/thumbnail" /></a>
```

```js
$('#expand-image').slideshow();
```

You can also invoke `.slideshow()` directly on links:
```html
<a href="path/to/image" class="expand-image"><img src="path/to/image/thumbnail" /></a>
```

```js
$('.expand-image').on('click', function(event) {
    $(this).slideshow();
    return false;
});
```


If you have a gallery and want to play your slideshow, just add `data-target="slideshow"` to your items :
```html
<div class="gallery">
    <a href="path/to/image1" rel="slideshow:open" data-target="slideshow"><img src="path/to/image/thumbnail1" /></a>
    <a href="path/to/image2" rel="slideshow:open" data-target="slideshow"><img src="path/to/image/thumbnail2" /></a>
</div>
```

```js
$('[data-target=slideshow]').on('click', function() {
    $(this).slideshow();
    return false;
});
```

## Fade transition

By default the overlay & window appear instantaneously, but you can enable a fade effect by specifying the `fadeDuration` option.

    $('a.open-slideshow').click(function(event) {
      $(this).slideshow({
        fadeDuration: 250
      });
      return false;
    });

This will fade in the overlay and slideshow over 250 milliseconds _simultaneously._ If you want the effect of the overlay appearing _before_ the window, you can specify the `fadeDelay` option. This indicates at what point during the overlay transition the window transition should begin.

So if you wanted the window to fade in when the overlay's was 80% finished:

      $(elm).slideshow({
        fadeDuration: 250,
        fadeDelay: 0.80
      });

Or, if you wanted the window to fade in a few moments after the overlay transition has completely finished:

      $(elm).slideshow({
        fadeDuration: 250,
        fadeDelay: 1.5
      });

Fading is the only supported transition. Also, there are no transitions when closing the slideshow.

## Closing

Because there can be only one slideshow active at a single time, there's no need to select which slideshow to close:

    $.slideshow.close();

Similar to how links can be automatically bound to open slideshows, they can be bound to close modals using `rel="slideshow:close"`:

    <a href="#close" rel="slideshow:close">Close window</a>

_(Note that slideshows are removed from the DOM when closed)._

## Options

These are the supported options and their default values:

    $.slideshow.defaults = {
      resize: false,                      // Image resize through external url
      resizePattern: '/{width}/{height}', // Image resize url pattern using window size (http://path/to/image[/resizePattern])
      scaling: 'fitmax',                  // Scaling type in fit, fitmax, fill
      showSpinner: true,                  // Enable/disable the spinner during image load.
      timeOnScreen: 5000                  // Time the image is displayed
    };

# License (MIT)

jQuery Modal is distributed under the [MIT License](Learn more at http://opensource.org/licenses/mit-license.php):

    Copyright (c) 2015 Anthony PERIQUET

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# zInfiniteScroll

It is a module for [AngularJS](http://angularjs.org/) which allow you to attach an event handler to the element when this element
has been scrolled almost to its bottom. In most of the case it will be used for infinite scrolling.
It is very light and optimized to reduce the amount of $digest loop.

## Demo
[Body scroll down](http://lightzam.github.io/zInfiniteScroll/example01_bodyScroll.html)

[Body scroll up](http://lightzam.github.io/zInfiniteScroll/example02_bodyScroll_inverse.html)

[Normal scroll down](http://lightzam.github.io/zInfiniteScroll/example03_normalScroll.html)

[Normal scroll up](http://lightzam.github.io/zInfiniteScroll/example04_normalScroll_inverse.html)

## Attach an event handler

simply set as attribute a function accessible within the $scope

```html
<ul z-infinite-scroll="myEventHandler">
    <li ng-repeat="item in myCollection">
</ul>
```

## use infinite scroll without set height on your element

use the body as scroll target

```html
<ul z-infinite-scroll="myEventHandler" body-scroll="true">
    <li ng-repeat="item in myCollection">
</ul>
```

## scroll to top

scroll to up and load your data by myEventHandler when it scrolled almost to its top

```html
<ul z-infinite-scroll="myEventHandler" inverse="true">
    <li ng-repeat="item in myCollection">
</ul>
```

## Change the scroll threshold

By default the handler will be called when the user is scrolling *down* and only *50* pixels are remaining before reaching the end
of the element. You can overwrite the 50px by setting the attribute *scroll-threshold*

```html
<ul z-infinite-scroll="myEventHandler" scroll-threshold="200">
    <li ng-repeat="item in myCollection">
</ul>
```
## Change the time threshold

To reduce the amount of $digest loop, instead of calling the handler whenever a scroll down event is detected in the end zone. A time is started and if
no other event is detected within 400ms, then the handler is called. You can overwrite the time value by setting the *time-threshold* attribute.

```html
<ul z-infinite-scroll="myEventHandler" scroll-threshold="200" time-threshold="600">
    <li ng-repeat="item in myCollection">
</ul>
```

## License

lrInfinite scroll module is under MIT license:

> Copyright (C) 2015 Zam Huang.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

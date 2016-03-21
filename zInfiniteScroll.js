(function (ng) {
    'use strict';
    var module = ng.module('zInfiniteScroll', []);

    module.directive('zInfiniteScroll', ['$timeout', '$interval', '$document', function ($timeout, $interval, $document) {
        return {
            link: function ($scope, $element, $attr) {
                var lengthThreshold = $attr.scrollThreshold || 50,
                    timeThreshold   = $attr.timeThreshold || 200,
                    handler         = $scope.$eval($attr.zInfiniteScroll),
                    bodyScroll      = $scope.$eval($attr.bodyScroll) === true ? true : false,
                    inverse         = $scope.$eval($attr.inverse) === true ? true : false,
                    promise         = null,
                    lastScrolled    = 9999,
                    element         = $element[0],
                    scrollEvent,
                    isDestorying = false;

                $scope.$on('$destroy', function handleDestroyEvent() {
                    isDestorying = true;
                });

                lengthThreshold = parseInt(lengthThreshold, 10);
                timeThreshold = parseInt(timeThreshold, 10);

                // if user not setting the handle function, it would giving default one
                if (!handler || !ng.isFunction(handler)) {
                    handler = ng.noop;
                }

                // -1 means your callback function decide when to scroll
                if (inverse) {
                    scrollEvent = scrollUntilDataReady;
                } else {
                    scrollEvent = scrollUntilTimeout;
                }

                var throttle = function(func, wait) {
                  var later, previous, timeout;
                  timeout = null;
                  previous = 0;
                  later = function() {
                    var context;
                    previous = new Date().getTime();
                    $interval.cancel(timeout);
                    timeout = null;
                    func.call();
                    return context = null;
                  };
                  return function() {
                    var now, remaining;
                    now = new Date().getTime();
                    remaining = wait - (now - previous);
                    if (remaining <= 0) {
                      clearTimeout(timeout);
                      $interval.cancel(timeout);
                      timeout = null;
                      previous = now;
                      return func.call();
                    } else {
                      if (!timeout) {
                        return timeout = $interval(later, remaining, 1);
                      }
                    }
                  };
                };

                if(timeThreshold) {
                    scrollEvent = throttle(scrollEvent, timeThreshold);
                }

                // if element doesn't want to set height, this would be helpful.
                if (bodyScroll) {
                    $document.bind('scroll', scrollEvent);
                    element = $document[0].body;
                } else {
                    $element.bind('scroll', scrollEvent);
                }

                // scroll first to the bottom (with a delay so the elements are rendered)
                $timeout(function() {
                    element.scrollTop = element.clientHeight;
                }, 0);

                // it will be scrolled once your data loaded
                function scrollUntilDataReady() {
                    if (isDestorying) return;
                    var scrolled = inverse ? element.scrollTop : element.scrollHeight - (element.clientHeight + element.scrollTop);

                    // if we have reached the threshold and we scroll up
                    if (scrolled < lengthThreshold && (scrolled - lastScrolled) < 0) {
                        var originalHeight = element.scrollHeight;
                        handler().then(function() {
                            $timeout(function() {
                                element.scrollTop = element.scrollHeight - originalHeight;
                            });
                        });
                    }
                    lastScrolled = scrolled;
                }

                // this need you set the div height
                function scrollUntilTimeout() {
                    if (isDestorying) return;
                    var scrolled = inverse ? element.scrollTop : element.scrollHeight - (element.clientHeight + element.scrollTop);

                    // if we have reached the threshold and we scroll down
                    if (scrolled < lengthThreshold && (scrolled - lastScrolled) < 0) {
                        // if there is already a timer running which has no expired yet we have to cancel it and restart the timer
                        if (promise !== null) {
                            $timeout.cancel(promise);
                        }
                        promise = $timeout(function () {
                            handler();
                            promise = null;
                        }, timeThreshold);
                    }
                    lastScrolled = scrolled;
                }
            }
        };
    }]);
})(angular);

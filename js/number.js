var windowHeight = window.innerHeight,
  gridTop = windowHeight * 0.1,
  gridBottom = windowHeight * 0.9;
$(window).on("scroll", function () {
  $(".count-box").each(function () {
    var thisTop = jQuery(this).offset().top - $(window).scrollTop();
    if (thisTop >= gridTop && thisTop + $(this).height() <= gridBottom) {
      var num = $("#num").val();
      if (num == "0") {
        $.fn.countTo = function (options) {
          options = options || {};
          return $(this).each(function () {
            var settings = $.extend(
              {},
              $.fn.countTo.defaults,
              {
                from: $(this).data("from"),
                to: $(this).data("to"),
                speed: $(this).data("speed"),
                refreshInterval: $(this).data("refresh-interval"),
                decimals: $(this).data("decimals"),
              },
              options
            );
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
              increment = (settings.to - settings.from) / loops;
            var self = this,
              $self = $(this),
              loopCount = 0,
              value = settings.from,
              data = $self.data("countTo") || {};
            $self.data("countTo", data);
            if (data.interval) {
              clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            render(value);
            function updateTimer() {
              value += increment;
              loopCount++;
              render(value);
              if (typeof settings.onUpdate == "function") {
                settings.onUpdate.call(self, value);
              }
              if (loopCount >= loops) {
                $self.removeData("countTo");
                clearInterval(data.interval);
                value = settings.to;
                if (typeof settings.onComplete == "function") {
                  settings.onComplete.call(self, value);
                }
              }
            }
            function render(value) {
              var formattedValue = settings.formatter.call(
                self,
                value,
                settings
              );
              $self.html(formattedValue);
            }
          });
        };

        $.fn.countTo.defaults = {
          from: 0, // the number the element should start at
          to: 0, // the number the element should end at
          speed: 1000, // how long it should take to count between the target numbers
          refreshInterval: 100, // how often the element should be updated
          decimals: 0, // the number of decimal places to show
          formatter: formatter, // handler for formatting the value before rendering
          onUpdate: null, // callback method for every time the element is updated
          onComplete: null, // callback method for when the element finishes updating
        };

        function formatter(value, settings) {
          return value.toFixed(settings.decimals);
        }

        $("#count-number").data("countToOptions", {
          formatter: function (value, options) {
            return value
              .toFixed(options.decimals)
              .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
          },
        });

        $(".timer").each(count);

        function count(options) {
          var $this = $(this);
          options = $.extend(
            {},
            options || {},
            $this.data("countToOptions") || {}
          );
          $this.countTo(options);
        }
      }
      $("#num").val("1");
    }
  });
});

$(window).trigger("scroll");

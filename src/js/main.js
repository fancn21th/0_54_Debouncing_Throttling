$(function () {
    if (typeof String.prototype.supplant !== 'function') {
        String.prototype.supplant = function (o) {
            return this.replace(
                /{([^{}]*)}/g,
                function (a, b) {
                    var r = o[b] || '&nbsp;';
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        };
    }

    var itemTpl = [
        '<div class="item">',
        '{content}',
        '</div>',
    ].join('')

    var generatedItems = function (startIndex, count) {
        var result = ''
        for (var i=0; i< count; i++) {
            result += itemTpl.supplant({
                content: 'item No. ' + (i + startIndex)
            })
        }
        return result
    }

    var isPageBottomReached = function () {
        var scrollTop = $(window).scrollTop(),
            height = $(window).height(),
            docHeight = $(document).height()
        console.log(scrollTop + ' ' +  height + ' ' + docHeight)
        return scrollTop + height === docHeight
    }

    var art1 = $('#rawEvents').find('article'),
        art2 = $('#debouncedEvents').find('article')

    art1.append(generatedItems(1, 10))
    art2.append(generatedItems(1, 10))

    // $(window).on('scroll', function () {
    //     console.log(isPageBottomReached())
    // })

    $(window).on('scroll', _.debounce(function () {
        console.log(isPageBottomReached())
    }, 200))
})

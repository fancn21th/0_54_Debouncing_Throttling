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
        console.log('window.scrollTop():' + scrollTop + ' window.height():' +  height + ' document.height():' + docHeight)
        return scrollTop + height === docHeight
    }

    var loadMoreItems = function () {
        art1.append(generatedItems(startIndex, 10))
        art2.append(generatedItems(startIndex, 10))
        startIndex += 10
    }

    var art1 = $('#rawEvents').find('article'),
        art2 = $('#debouncedEvents').find('article'),
        startIndex = 1

    loadMoreItems()

    // $(window).on('scroll', function () {
    //     if (isPageBottomReached()) {
    //         loadMoreItems()
    //     }
    // })

    // $(window).on('scroll', _.debounce(function () {
    //     if (isPageBottomReached()) {
    //         loadMoreItems()
    //     }
    // }, 200))

    $(window).on('scroll', _.throttle(function () {
        if (isPageBottomReached()) {
            loadMoreItems()
        }
    }, 300))
})

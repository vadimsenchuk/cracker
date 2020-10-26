const productRanges = document.querySelectorAll('.form input[type="range"]');
const productValues = document.querySelectorAll('.form__value');
const lastProductIndex = productRanges.length - 1;
const lastProductRange = productRanges[lastProductIndex];
const lastProductValue = productValues[lastProductIndex];
const sum = () => arr.reduce((a, b) => a + b)
let arr = [];

productRanges.forEach((item, i) => {
    if ( i !== productRanges.length - 1) {
        arr[i] = (+item.value);
        sum()
    } else {
        item.value = 100 - sum()
    }
    productValues[i].textContent = item.value + '%';
})

$(productRanges).each((i, item) => {
    $(item).on('input', ( {target} ) => {
        if ( i !== lastProductIndex) {
            arr[i] = (+target.value);
            sum();
            productValues[i].textContent = item.value + '%';
            if (sum() > 100) {
                switch (i) {
                    case 0:
                        productRanges[1].value = productRanges[1].value - (sum() - 100)
                        arr[1] = (+productRanges[1].value);
                        productValues[1].textContent = productRanges[1].value + '%';
                        if (productRanges[1].value == 0) {
                            productRanges[2].value = productRanges[2].value - (sum() - 100)
                            arr[2] = (+productRanges[2].value);
                            productValues[2].textContent = productRanges[2].value + '%';
                        }
                        break;
                    case 1:
                        productRanges[2].value = productRanges[2].value - (sum() - 100)
                        arr[2] = (+productRanges[2].value);
                        productValues[2].textContent = productRanges[2].value + '%';
                        if (productRanges[2].value == 0) {
                            productRanges[0].value = productRanges[0].value - (sum() - 100)
                            arr[0] = (+productRanges[0].value);
                            productValues[0].textContent = productRanges[0].value + '%';
                        }
                        break;
                    case 2:
                        productRanges[0].value = productRanges[0].value - (sum() - 100)
                        arr[0] = (+productRanges[0].value);
                        productValues[0].textContent = productRanges[0].value + '%';
                        if (productRanges[0].value == 0) {
                            productRanges[1].value = productRanges[1].value - (sum() - 100)
                            arr[1] = (+productRanges[1].value);
                            productValues[1].textContent = productRanges[1].value + '%';
                        }
                        break;            
                    default:
                        break;
                }
            }
        }
        lastProductRange.value = 100 - sum()
        lastProductValue.textContent = lastProductRange.value + '%';
    })
})

$(document).ready(() => {
    $('.details').click(() => {
        $('.order-details').slideToggle()
    })
    $('.order-details__close').click(() => {
        $('.order-details').slideUp()
    })
})

$('.form__select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 450;

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('.select').append('<i class="fa fa-angle-down"></i>')
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                html: selectOption.eq(i).text()
            })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});
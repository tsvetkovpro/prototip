$(document).click(function() {});

$(document).keydown(function(e) {});

$(document).scroll(function() {});

$(document).ready(function() {

    $(".work-container").click(function() {
        var popupWork = $(this).find(".popup-container > .work-popup");
        $.fancybox(popupWork);
    });


    $('.portfolio .show-more-container').click(function() {
        $(this).fadeOut();
        $('.portfolio .hidden').slideDown();
        return false;
    });

    $('.portfolio .social a.disable').click(function() {
        return false;
    });

    $('.to-calculate .question.first li').click(function() {
        $('.to-calculate .question input[name="quest1"]').val($(this).text());
        $(this).parent().parent().hide();
        $('.to-calculate .question.second').fadeIn(200);
        $('.to-calculate .stages .first').addClass('done');
        setTimeout(function() {
            $('.to-calculate .stages .stage.second').addClass('current');
        }, 200);
    });

    $('.to-calculate .question.second li').click(function() {
        $('.to-calculate .question input[name="quest2"]').val($(this).text());
        $(this).parent().parent().hide();
        $('.to-calculate .question.third').fadeIn(200);
        $('.to-calculate .stages .second').addClass('done');
        setTimeout(function() {
            $('.to-calculate .stages .stage.third').addClass('current');
        }, 200);
    });

    $('.to-calculate .question.third li').click(function() {
        $('.to-calculate .question input[name="quest3"]').val($(this).text());
        $(this).parent().parent().hide();
        $('.to-calculate .question.fourth').fadeIn(200);
        $('.to-calculate .stages .third').addClass('done');
        setTimeout(function() {
            $('.to-calculate .stages .stage.fourth').addClass('current');
        }, 200);
    });
    
    var switcherFormShowed = false;

    $('.how-we-work .switch').click(function() {
        $(this).toggleClass('on');
        $('#form input[name="info"]').val('Как мы работаем');
        $("section.how-we-work.simple .company").toggleClass("companyOnBlur")
        if (!switcherFormShowed) {
            setTimeout(function() {
                $("#showForm").click();
                switcherFormShowed = true;
            }, 6000);
        }
        return true;
    });

    $('.prices-and-terms .tariff .gray a').click(function() {
        $('#form input[name="info"]').val($(this).data('tariff'));
        return true;
    });

    if ($.userAgent("iphone") || $.userAgent("android") || $.userAgent("MSIE [8|7]")) {

    }

    faviconPulse(2000);

    $('.fancybox').fancybox();

    $('.link').click(function() {
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({
                scrollTop: $(scroll_el).offset().top
            }, 500);
        }
        return false;
    });

    /*формы*/
    $('input').change(function() {
        $('input').removeClass('incorrect correct');
    });


    var _target = '';

    $('[data-target]').click(function () {
        _target = $(this).attr('data-target');
        _target = target(_target);
    });

    $('form').ajaxForm({
        beforeSubmit: function(d, $e) {
            $('input').removeClass('incorrect');

            var emailReg = new RegExp("^[-0-9a-z\._]+\@[-0-9a-z\.]+\.[a-z]{2,4}$", "i"),
                phoneReg = '';

            for (var j in d) {
                /*телефон*/
                if (d[j].name == 'phone' && d[j].value == '') {
                    $e.find('input[name="phone"]').addClass('incorrect');
                    return false;
                }

                if (d[j].name == 'name') {
                    var nameReg = new RegExp("^[А-ЯЁа-яё]*$", "u");
                    if (!nameReg.test(d[j].value)) {
                        $e.removeClass('dis')
                            .find('input[name="name"]')
                            .addClass('err-form');

                        $('.infoblock')
                            .infoBlock('err', 'Используйте в имени только русские символы без пробела.');

                        return false;
                    }
                }

                if (d[j].name == 'phone' && d[j].value != '') {
                    for (var i = 0; i <= 9; i++) {
                        phoneReg = new RegExp(i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString());

                        if (phoneReg.test(d[j].value)) {
                            $e.find('input[name="phone"]').addClass('incorrect');
                            return false;
                        }
                    }
                }

                $e.find('input[name="phone"]').addClass('correct');

                /*имя*/
                if (d[j].name == 'name' && d[j].value == '') {
                    $e.find('input[name="name"]').addClass('incorrect');
                    return false;
                }

                $e.find('input[name="name"]').addClass('correct');

                /*email*/
                if (d[j].name == 'email' && d[j].value == '') {
                    $e.find('input[name="email"]').addClass('incorrect');
                    return false;
                }

                if (d[j].name == 'email' && d[j].value != "") {
                    if (!emailReg.test(d[j].value)) {
                        $e.find('input[name="email"]').addClass('incorrect');
                        return false;
                    }
                }

                $e.find('input[name="email"]').addClass('correct');

                /*цель*/
                if (d[j].name == 'target') {
                    _target = d[j].value;
                }
            }

            return true;
        },

        success: function(data) {
            console.info(data);
            $('input').removeClass('incorrect correct');
            $("#thnx-a").click();
            _target = target(_target);
        }
    });

});

$.extend({
    scrolling: function() {
        var html = document.documentElement,
            body = document.body,
            scrollTop = html.scrollTop || body && body.scrollTop || 0;
        return scrollTop -= html.clientTop;
    },

    userAgent: function(us) {
        var reg = new RegExp(us, "i");
        if (us) {
            if (reg.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
        } else {
            return navigator.userAgent;
        }
    }
});

$.fn.extend({
    onScreen: function(func, k) {
        if ($(this).length > 0 && !$(this).hasClass('allready-showed')) {
            var ko = screen.height * (k ? k : 0.75);
            if (($(this).offset().top + $(this).height() * ko) < $.scrolling()) {
                return false;
            } else if (($(this).offset().top - ko) < $.scrolling()) {
                if ($(this).addClass('allready-showed')) {
                    return func.call(this);
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    stepByStep: function(classToEl, time, tek) {
        var tek = !tek ? 0 : tek,
            $el = $(this);

        if (tek < $el.size()) {
            $el.eq(tek).addClass(classToEl);
            setTimeout(function() {
                $el.stepByStep(classToEl, time, ++tek);
            }, time);
        }
        return tek;
    },

    animCount: function(limit, time, text, tek) {
        function isFloat(x) {
            return !!(x % 1);
        }

        var $el = $(this),
            t = parseInt(time / limit);

        tek = tek ? tek : 0;
        limit = !isFloat(limit) ? parseInt(limit) : limit;

        if (tek <= limit) {
            $el.html(parseInt(tek) + text);

            setTimeout(function() {
                $el.animCount(limit, time, text, tek += limit / time * 50);
            }, 50);
        } else {
            $el.html(limit + text);
        }
    },



    infoBlock: function(command, content) {
        if (command == 'err') $(this).addClass('err');
        else $(this).removeClass('err');

        if (command == 'close') {
            $(this).css({
                'opacity': '0',
                'top': '-20px'
            });
        } else {
            $(this).css({
                    'opacity': '1',
                    'top': '0px'
                })
                .find('span')
                .html(content);
        }
    }
});

function faviconPulse(time) {
    var $favicon = $('#favicon'),
        href = $favicon.attr('href');

    if (true) {
        var inter = setInterval(function() {
            if ($favicon.attr('href') == href) {
                $favicon.attr('href', "img/favicon2.png");
            } else {
                $favicon.attr('href', href);
            }
        }, (time ? time : 500));
    }
}

function secundomer() {
    var i = 60,
        j = 99,

        timer2 = setInterval(function() {
            j = j == 0 ? 99 : j;
            $("#t_milisec").html((--j < 10 ? '0' : '') + '' + j);
        }, 10),

        timer = setInterval(function() {
            $("#t_sec").html((--i < 10 ? '0' : '') + '' + i);

            if (i <= 0) {
                clearInterval(timer);
                clearInterval(timer2);
                $("#t_milisec").html('00');
            }
        }, 1000);
}

Number.prototype.numberFormat = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
};

function target(arg_target) {
    if (arg_target != '') {
        yaCounter43577054.reachGoal(arg_target, {}, function () {
            console.log('Отправлена цель: ' + arg_target);
            arg_target = '';
        });
    }
    return arg_target;
}

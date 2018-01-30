/**
 * CORR - Realtime colorpicker with readable JSON output
 */

var calls = 0;
var irisPath = "http://corr.devel33.oxyshop.cz/iris/dist/iris.min.js";
var slideRevealPath = "http://corr.devel33.oxyshop.cz/jquery.slidereveal.min.js";
var serverUrl = "http://corr.devel33.oxyshop.cz/saveHandler.php?callback=?";
var activeStylesheet = "oxid_layout.css";
var undefinedColor = "rgb(0,0,0)";
var specificRules = ":before";
var layoutEdit = "Upravit vzhled";
var layoutHide = "&laquo; Skrýt";
var styles = getCookie('corr_settings') ? JSON.parse(getCookie('corr_settings')) : {};
var cookieLength = 7 * 24 * 60 * 60 * 1000;
var settings = [
    {
        "name": "Tlačítka obecná text",
        "input": "color",
        "selectors": [
            {
                "selector": ".btn a",
                "style": "color"
            },
            {
                "selector": ".btn input",
                "style": "color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Tlačítka obecná pozadí",
        "input": "color",
        "selectors": [
            {
                "selector": ".btn a",
                "style": "background-color"
            },
            {
                "selector": ".btn input",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Tlačítko koupit",
        "input": "color",
        "selectors": [
            {
                "selector": ".product .tocart:not('.details .tocart')",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Tlačítko koupit - text",
        "input": "color",
        "selectors": [
            {
                "selector": ".product .tocart input:not('.details .tocart input')",
                "style": "color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Tlačítko koupit - detail produktu",
        "input": "color",
        "selectors": [
            {
                "selector": ".details .tocart",
                "style": "background-color"
            }
        ],
        "areas": ["details"]
    },
    {
        "name": "Tlačítko koupit - detail produktu text",
        "input": "color",
        "selectors": [
            {
                "selector": ".details .tocart input",
                "style": "color"
            }
        ],
        "areas": ["details"]
    },
    {
        "name": "Tlačítko pokračovat - nákupní košík",
        "input": "color",
        "selectors": [
            {
                "selector": ".prevnext .right input",
                "style": "background-color"
            }
        ],
        "areas": ["basket"]
    },
    {
        "name": "Tlačítko pokračovat - text",
        "input": "color",
        "selectors": [
            {
                "selector": ".prevnext .right input",
                "style": "color"
            }
        ],
        "areas": ["basket"]
    },
    {
        "name": "Hlavní menu",
        "input": "color",
        "selectors": [
            {
                "selector": ".fixedbar",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Hlavní menu - text",
        "input": "color",
        "selectors": [
            {
                "selector": ".fixedbar",
                "style": "color"
            },
            {
                "selector": ".fixedbar a",
                "style": "color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Vyhledávání",
        "input": "color",
        "selectors": [
            {
                "selector": ".search .txt",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Tlačítko vyhledávání",
        "input": "color",
        "selectors": [
            {
                "selector": ".search .btn",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Nákupní košík - ikona",
        "input": "color",
        "selectors": [
            {
                "selector": ".oxid #top_basket:before",
                "style": "color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Nákupní košík - pozadí",
        "input": "background-color",
        "selectors": [
            {
                "selector": ".oxid #top_basket:before",
                "style": "background"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Menu kategorií",
        "input": "color",
        "selectors": [
            {
                "selector": ".categories",
                "style": "background-color"
            },
            {
                "selector": ".categories .dropdown",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Menu kategorií - text",
        "input": "color",
        "selectors": [
            {
                "selector": ".categories a",
                "style": "color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Menu kategorií - aktivní",
        "input": "color",
        "selectors": [
            {
                "selector": ".categories .expanded a",
                "style": "background-color"
            },
            {
                "selector": ".categories a:hover",
                "style": "color",
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Pozadí hlavičky",
        "input": "color",
        "selectors": [
            {
                "selector": "#header",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Patička - text",
        "input": "color",
        "selectors": [
            {
                "selector": "#footer a",
                "style": "color"
            },
            {
                "selector": "#footer",
                "style": "color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Pozadí webu",
        "input": "color",
        "selectors": [
            {
                "selector": "body",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Patička",
        "input": "color",
        "selectors": [
            {
                "selector": "#footer",
                "style": "background-color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Drobečková navigace - text",
        "input": "color",
        "selectors": [
            {
                "selector": "#path",
                "style": "color"
            },
            {
                "selector": "#path a",
                "style": "color"
            }
        ],
        "areas": ["start", "details", "alist", "basket"]
    },
    {
        "name": "Stránkování - přebarvení po najetí",
        "input": "color",
        "selectors": [
            {
                "selector": ".locator a:hover",
                "style": "color"
            },
            {
                "selector": "locator .active",
                "style": "color"
            }
        ],
        "areas": ["alist"]
    },
    {
        "name": "Krátký popis",
        "input": "color",
        "selectors": [
            {
                "selector": ".particulars .desc",
                "style": "background-color"
            }
        ],
        "areas": ["details"]
    },
    {
        "name": "Aktivní krok v nákupním procesu",
        "input": "color",
        "selectors": [
            {
                "selector": ".ordersetps .active",
                "style": "border-color"
            }
        ],
        "areas": ["basket"]
    },
    {
        "name": "Nadpisy kroků - košík",
        "input": "color",
        "selectors": [
            {
                "selector": ".basketsummary .sumrow.total",
                "style": "background-color"
            },
            {
                "selector": ".basketsummary .sumrow.grossrow",
                "style": "color"
            }
        ],
        "areas": ["basket"]
    },
    // Special selectors
    {
        "name": "Tlačítko koupit - ikona",
        "input": "color",
        "selectors": [
            {
                "selector": ".details .tocart:before",
                "style": "color"
            }
        ],
        "areas": ["details"]
    },
    {
        "name": "Hlavní menu - ikony",
        "input": "color",
        "selectors": [
            {
                "selector": ".fixed a:before",
                "style": "color"
            }
        ],
        "areas": ["start"]
    },
    {
        "name": "Vyhledávací tlačítko - ikona",
        "input": "color",
        "selectors": [
            {
                "selector": "#top_basket:before",
                "style": "color"
            }
        ],
        "areas": ["start"]
    },
    {
        "name": "Vyhledávací tlačítko - ikona pozadí",
        "input": "color",
        "selectors": [
            {
                "selector": "#top_basket:before",
                "style": "background-color"
            }
        ],
        "areas": ["start"]
    },
    {
        "name": "Tlačítko koupit - ikona",
        "input": "color",
        "selectors": [
            {
                "selector": ".product:not(.item) .tocart::before",
                "style": "color"
            }
        ],
        "areas": ["start"]
    },
    {
        "name": "Detail - tlačítko koupit - ikona",
        "input": "color",
        "selectors": [
            {
                "selector": ".product.item .tocart::before",
                "style": "color"
            }
        ],
        "areas": ["details"]
    }
];

/**
 * Generates HTML input based on JSON row
 *
 * @param  {int}      key         key of json
 * @param  {json}     jsonRow     row from settings
 * @return {string}   input       html input
 */
function createInput(key, jsonRow) {
    input  = "<label>" + jsonRow.name + "<input type='text' class='iris iris-input' "; // id='" + jsonRow.section + "'
    input += "iris-color='" + getRowColor(jsonRow) + "' iris-id='" + key + "'>";
    // input += "<div class='iris-rounder'>&nbsp;</div>";
    input += "</label>"

    return input;
}

/**
 * Gets row color - iterates all row selectorObjects to apply styles globally
 *
 * @internal Now we are setting color over and over, it would be fine to do it once
 *           and just apply styles to other selectorObjects
 * @param  {json} jsonRow   row from settings
 * @return {string}         color hex code
 */
function getRowColor(jsonRow) {
    $.each(jsonRow.selectors, function(index, selectorObject) {
        color = getDefaultColor(selectorObject);
    });

    return color;
}

/**
 * Creates submit button
 *
 * @return {string} created input
 */
function createSubmit() {
    return $(document.createElement('input')).attr({type:'submit',value:'Odeslat'}).addClass('corr-submit');
}

/**
 * Creates submit button
 *
 * @return {string} created input
 */

function createCancel() {
    return $(document.createElement('input')).attr({type:'button',value:'Zrušit'}).addClass('corr-cancel');
}

/**
 * Gets color from provided selector
 *
 * @param  {object}   selectorObject  html selector
 * @return {string}                   hexcode of color
 */
function getDefaultColor(selectorObject) {
    if ((index = getSelectorStylesIndex(selectorObject)) > -1) {
        applyStyle(selectorObject, styles[selectorObject.selector][index].value);
        defaultcolor = styles[selectorObject.selector][index].value;
    } else if (typeof $(selectorObject.selector).css(selectorObject.style) !== 'undefined') {
        defaultcolor = $(selectorObject.selector).css(selectorObject.style);
    } else {
        defaultcolor = undefinedColor;
    }

    return defaultcolor;
}

/**
 * Finds selectorObject style index in general styles
 *
 * @param  {object} selectorObject  html selector
 * @return {int}                    index number
 */
function getSelectorStylesIndex(selectorObject) {
    var found = -1;
    if (Array.isArray(styles[selectorObject.selector])) {
        $.each(styles[selectorObject.selector], function(index, storedStyle) {
            if (storedStyle.style == selectorObject.style) {
                found = index;
            }
        });
    }

    return found;
}

/**
 * Stores current selector style associatively:
 *
 * styles.selector = [style, value];
 *
 * @param  {object} selectorObject selector
 * @param  {string} color          hex color
 */
function storeStyles(selectorObject, color) {
    // create array if not exists and set variables
    var inArray = false;
    if ( ! Array.isArray(styles[selectorObject.selector])) {
        styles[selectorObject.selector] = [];
    }

    // if the value is already in array, we need to overwrite it, not add another
    $.each(styles[selectorObject.selector], function(index, storedStyle) {
        if (storedStyle.style == selectorObject.style) {
            inArray = true;
            styles[selectorObject.selector][index].value = color;
        }
    });

    // if the style was not in array, just add it
    if (inArray === false) {
        styles[selectorObject.selector].push({
            "style": selectorObject.style,
            "value": color
        });
    }
}

/**
 * Changes elements CSS
 * @param  {int}    settingsKey settings key
 * @param  {object} ui          jQuery.ui
 */
function changeElements(settingsKey, ui) {
    color = ui.color.toString();
    $.each(settings[settingsKey].selectors, function(key, selectorObject) {
        applyStyle(selectorObject, color);
        storeStyles(selectorObject, color);
    });
}

/**
 * Applies color to specific elements
 * @param  {object} selectorObject selector
 * @param  {string} color          hex color
 */
function applyStyle(selectorObject, color) {
    if (selectorObject.selector.indexOf(specificRules) > -1) {
        setSpecificRule(selectorObject.selector, selectorObject.style + ":" + color + " !important");
    } else {
        $(selectorObject.selector).css(selectorObject.style, color);
    }
}

/**
 * Creates cookie by key and value
 *
 * @param {string} cookieKey   cookie name
 * @param {string} cookieValue cookie contents
 */
function setCookie(cookieKey, cookieValue) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (cookieLength));
    document.cookie = cookieKey + '=' + cookieValue + ';expires=' + expires.toUTCString() + ';path=/';
}

/**
 * Gets cookie by its key
 *
 * @param  {string} cookieKey cookie name
 * @return {string}           cookie contents
 */
function getCookie(cookieKey) {
    var keyValue = document.cookie.match('(^|;) ?' + cookieKey + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

/**
 * Unsets cookie
 *
 * @param  {string} cookieKey cookie name
 */
function unsetCookie(cookieKey) {
    document.cookie = cookieKey + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/';
}

/**
 * Gets active area of page by body class
 *
 * @return {string} active class name
 */
function getActiveArea() {
    return $('body').attr('class').split(' ')[0].replace('-page', '');
}

/**
 * Sets specific rule via javascript.styleSheets
 *
 * @param {string} selector selector name
 * @param {string} rule     css values
 */
function setSpecificRule(selector, rule) {
    stylesheet = getStyleSheet();
    if (stylesheet.addRule) {
        stylesheet.addRule(selector, rule);
    } else if (stylesheet.insertRule) {
        stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
    }
}

/**
 * Gets active stylesheet object
 *
 * @return {object} stylesheet
 */
function getStyleSheet() {
    var stylesheet = document.styleSheets[(document.styleSheets.length - 1)];
    for (var i in document.styleSheets) {
        if (document.styleSheets[i].href && (document.styleSheets[i].href.indexOf(activeStylesheet) > -1)) {
            stylesheet = document.styleSheets[i];
            break;
        }
    }

    return stylesheet;
}

/**
 * Generates unique ID
 *
 * @return {string} unique id
 */
function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/**
 * This is where the magic begins
 */

$.when(
    $.getScript(slideRevealPath),
    $.getScript(irisPath),
    $.Deferred(function(deferred) {
        $(deferred.resolve);
    })
).done(function(){
    var corrPanel = $(document.createElement('div')).addClass('corr-panel').appendTo('body');
    var corrButton = $(document.createElement('span')).html(layoutEdit).addClass('corr-toggle').appendTo('body');

    // slide reveal
    $('.corr-panel').slideReveal({
        trigger: $(".corr-toggle"),
        shown: function(slider, trigger){
            $(".corr-toggle").html(layoutHide);
        },
        hidden: function(slider, trigger){
            $(".corr-toggle").html(layoutEdit);
        },
    });

    // create inputs
    $.each(settings, function(key, jsonRow) {
        $(corrPanel).append(createInput(key, jsonRow));
    });

    // submit button
    $(corrPanel).append(createCancel);
    $(corrPanel).append(createSubmit);

    // cancel handler
    $('.corr-cancel').click(function() {
        if (confirm("Opravdu chcete zrušit aktuální změny?")) {
            unsetCookie('corr_settings');
            location.reload();
        }
    });

    // cancel handler
    $('.corr-submit').click(function() {
        if (confirm("Opravdu chcete odeslat současné nastavení?")) {
            guid = getGuid();

            $.each(styles, function(selector, styleObject) {
                $.each(styleObject, function(index, cssRow) {
                    calls += 1;
                    queryAttrs = 's='+location.hostname+'&t='+guid+'&sel='+selector+'&stl='+cssRow.style+'&val='+cssRow.value;
                    queryAttrs = queryAttrs.replace(/[#]/g,'%23');
                    $.getJSON(serverUrl, queryAttrs, function(result) {
                        if (result.result === 1) {
                            calls -= 1;
                            if (calls === 0) {
                                prompt("Zkopírujte si své identifikační číslo:", guid);
                            }
                        } else {
                            alert("Při odesílání došlo k chybě");
                            return false;
                        }
                    });
                });
            });
        }
    });

    // iris
    $('.iris').each(function() {
        var $el = $(this);
        $el.iris({
            color: $el.attr("iris-color"),
            width: 150,
            border: false,
            hide: true,
            change: function(event, ui) {
                changeElements($el.attr("iris-id"), ui);
                setCookie('corr_settings', JSON.stringify(styles));
            }
        });

        // iris toggle
        $el.blur(function() {
            setTimeout(function() {
                if ( ! $(document.activeElement).closest(".iris-picker").length) {
                    $el.iris('hide');
                } else {
                    $el.focus();
                }
            }, 0);
        });
        $el.focus(function() {
            $el.iris('show');
        });
    });
});
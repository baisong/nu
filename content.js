/**
 * Replace text but preserve initial capitalization
 * https://stackoverflow.com/questions/17264639/replace-text-but-keep-case
 */
function matchCase(text, pattern) {
    var result = '';
    var limit = 1;
    for(var i = 0; i < text.length; i++) {
        var p = pattern.charCodeAt(i);
        // Only match initial
        if (i == 0) {
            if(p >= 65 && p < 65 + 26) {
                result += text.charAt(i).toUpperCase();
            } else {
                result += text.charAt(i).toLowerCase();
            }
        }
        else {
            result += text.charAt(i);
        }
    }
    return result;
}

/**
 * Adapted from NuLeadership's Language Letter Campaign:
 * https://www.nuleadership.org/language-letter-campaign
 */
function replaceTerms(text) {
    var replacedText = text;
    var replacements = [
        {term: "offender", replacement: "person with a past criminal judgement"},
        {term: "felon", replacement: "person who has committed a felony"},
        {term: "prisoner", replacement: "person in prison"},
        {term: "detainee", replacement: "person in detention"},
        {term: "inmate", replacement: "person in prison"},
        {term: "convict", replacement: "person in prison"},
        {term: "ex-con", replacement: "person with past experience in prison"},
        {term: "ex-convict", replacement: "person with past experience in prison"},
        {term: "ex-offender", replacement: "person with past experience in prison"},
        {term: "ex-felon", replacement: "person with past experience in prison"},
        {term: "parolee", replacement: "person on parole"},
        {term: "offenders", replacement: "people with past criminal judgements"},
        {term: "felons", replacement: "people who have committed felonies"},
        {term: "prisoners", replacement: "people in prison"},
        {term: "detainees", replacement: "people in detention"},
        {term: "inmates", replacement: "people in prison"},
        {term: "convicts", replacement: "people in prison"},
        {term: "ex-cons", replacement: "people with past experience in prison"},
        {term: "ex-convicts", replacement: "people with past experience in prison"},
        {term: "ex-offenders", replacement: "people with past experience in prison"},
        {term: "ex-felons", replacement: "people with past experience in prison"},
        {term: "parolees", replacement: "people on parole"},
    ];
    for (var i = 0; i < replacements.length; i++) {
        var r = replacements[i];
        var searchvalue = new RegExp("\\b" + r.term + "\\b", 'gi');
        var newvalue = r.replacement;
        //replacedText = replacedText.replace(searchvalue, newvalue);
        replacedText = replacedText.replace(searchvalue, function(match) {
            return matchCase(newvalue, match);
        });
    }
    return replacedText;
}

/**
 * Adapted from the original Millenial-Snake People debacle:
 * https://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions
 */
var elements = document.getElementsByTagName('*');
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];
        if (node.nodeType !== 3) {
            continue;
        }
        var text = node.nodeValue;
        var replacedText = replaceTerms(text);
        if (replacedText === text) {
            continue;
        }
        element.replaceChild(document.createTextNode(replacedText), node);
    }
}

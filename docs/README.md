<script>
var locale = "en";
var currentLanguage = navigator.language;
var supportLanguage = ["en", "zh"]
if (supportLanguage.indexOf(currentLanguage) != -1) {
    locale = currentLanguage
} else {
    for (let lang of supportLanguage) {
        if (currentLanguage.indexOf(lang) == 0) {
            locale = lang;
            break;
        }
    }
}
location.assign(locale);
</script>
(function (root) {
  var LANGUAGES = [
    { code: 'tr', label: 'Türkçe', flag: 'tr' },
    { code: 'en', label: 'English', flag: 'gb' }
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = LANGUAGES;
  else root.LANGUAGES = LANGUAGES;
})(typeof window !== 'undefined' ? window : this);
import Organizations from './';

Organizations.friendlySlugs({
  slugFrom: 'name',
  slugField: 'slug',
  createOnUpdate: true,
  distinct: true,
  transliteration: [
    { from: 'àáâäåãа', to: 'a' },
    { from: 'б', to: 'b' },
    { from: 'ç', to: 'c' },
    { from: 'д', to: 'd' },
    { from: 'èéêëẽэе', to: 'e' },
    { from: 'ф', to: 'f' },
    { from: 'г', to: 'g' },
    { from: 'х', to: 'h' },
    { from: 'ìíîïи', to: 'i' },
    { from: 'к', to: 'k' },
    { from: 'л', to: 'l' },
    { from: 'м', to: 'm' },
    { from: 'ñн', to: 'n' },
    { from: 'òóôöõо', to: 'o' },
    { from: 'п', to: 'p' },
    { from: 'р', to: 'r' },
    { from: 'с', to: 's' },
    { from: 'т', to: 't' },
    { from: 'ùúûüу', to: 'u' },
    { from: 'в', to: 'v' },
    { from: 'йы', to: 'y' },
    { from: 'з', to: 'z' },
    { from: 'æ', to: 'ae' },
    { from: 'ч', to: 'ch' },
    { from: 'щ', to: 'sch' },
    { from: 'ш', to: 'sh' },
    { from: 'ц', to: 'ts' },
    { from: 'я', to: 'ya' },
    { from: 'ю', to: 'yu' },
    { from: 'ж', to: 'zh' },
    { from: 'ъь', to: '' },
  ],
});

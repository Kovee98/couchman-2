const searching = {
    fuzzy (str, search, ratio = 0.5) {
        str = str.toLowerCase();
        const compare = search.toLowerCase();
        let matches = 0;

        // covers basic partial matches
        if (str.indexOf(compare) > -1) return true;

        for (var i = 0; i < compare.length; i++) {
            str.indexOf(compare[i]) > -1 ? matches++ : matches--;
        }

        return (matches / this.length >= ratio || search == "");
    },

    stringify (item, fields) {
        return Object.keys(item).reduce((str, key) => {
            if (fields.includes(key)) {
                str += item[key];
            }
            return str;
        }, '');
    },

    search (items, fields, search, ratio) {
        return items.filter((item) => searching.fuzzy(searching.stringify(item, fields), String(search), ratio));
    }
};

export const fuzzy = searching.fuzzy;

export default searching;

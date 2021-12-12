const sorting = {
    compare (val1, val2) {
        if (val1 < val2) return -1;
        if (val1 > val2) return 1;
        return 0;
    },

    sort (items, field, order) {
        return items.sort((item1, item2) => {
            if (order === 'asc') {
                return sorting.compare(item1[field], item2[field]);
            } else {
                return sorting.compare(item2[field], item1[field]);
            }
        });
    }
};

export const sort = sorting.sort;

export default sorting;

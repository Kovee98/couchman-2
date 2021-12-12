import _sorting from './sorting.js';
import _searching from './searching.js';

const list = {
    sorting: _sorting,
    searching: _searching
};

export const sorting = list.sorting;
export const searching = list.searching;

export default list;
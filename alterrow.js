const styledRows = document.querySelectorAll('.table-row');
const isOdd = n => Boolean(n % 2); // returns true if n / 2 has a remainder

styledRows.forEach((row, i) => {
    row.classList.add(isOdd(i) ? 'bg-slate-200' : 'bg-white');
});

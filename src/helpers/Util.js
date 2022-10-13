
export function floatNumberToBr(n){
    return n.toFixed(2).toString().replace('.', ',');
}

export function getColorClassName(n){
    if (n > 0){
        return 'text-green-700';
    } else if (n < 0){
        return 'text-red-700';
    } else {
        return 'text-black';
    }
}

export function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    
    return date.toLocaleString('pt-BR', {
        month: 'short',
    }).replace('.', '');
}
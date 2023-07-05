export function formatMoneyValue(value : any) {
    const newValue = value.replace(/[^\d]/g, '');
    return newValue / 100;
}

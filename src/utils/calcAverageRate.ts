export const calculateAverageRate = (data: any[]) => {
    if (!data || data.length === 0) {
        return 0;
    }
    const totalRate = data.reduce((sum: number, item: any) => sum + (item.rate || 0), 0);
    const averageRate = totalRate / data.length;
    return Number(averageRate.toFixed(2));
}
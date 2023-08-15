class PriceFormatter {
    private static instance: PriceFormatter;

    private constructor() {}

    public static getInstance(): PriceFormatter {
        if (!PriceFormatter.instance) {
            PriceFormatter.instance = new PriceFormatter();
        }
        return PriceFormatter.instance;
    }

    public formatPrice(price: number): string {
        return price.toLocaleString('vi-VN');
    }
}

export default PriceFormatter;

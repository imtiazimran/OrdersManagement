/* eslint-disable @typescript-eslint/no-explicit-any */
// saleOrdersApi.ts
// eslint-disable-next-line prefer-const
let saleOrders = [
    {
        "customer_id": 11908,
        "items": [
            {
                "sku_id": 220,
                "price": 12,
                "quantity": 12
            }
        ],
        "paid": false,
        "invoice_no": "Invoice - 1212121",
        "invoice_date": "7/5/2024"
    },
    {
        "customer_id": 11908,
        "items": [
            {
                "sku_id": 220,
                "price": 12,
                "quantity": 12
            }
        ],
        "paid": false,
        "invoice_no": "Invoice - 1212121",
        "invoice_date": "7/5/2024"
    },
    {
        "customer_id": 11908,
        "items": [
            {
                "sku_id": 220,
                "price": 12,
                "quantity": 12
            }
        ],
        "paid": false,
        "invoice_no": "Invoice - 1212121",
        "invoice_date": "7/5/2024"
    },
    {
        "customer_id": 11909,
        "items": [
            {
                "sku_id": 220,
                "price": 12,
                "quantity": 12
            }
        ],
        "paid": false,
        "invoice_no": "Invoice - 1212121",
        "invoice_date": "7/5/2024"
    }

    // Add more saleOrders as needed
];

// Function to fetch all saleOrders
export const fetchSaleOrders = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return saleOrders;
};

// Function to create a new SKU
export const createOrder = async (newSKU: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const id = saleOrders.length + 1;
    const newSku = { ...newSKU, id };
    saleOrders.push(newSku);
    return newSku;
};

// Function to update an existing SKU
export const updateOrder = async (id: number, updatedOrder: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = saleOrders.findIndex((order) => order.customer_id === id);
    if (index !== -1) {
        saleOrders[index] = { ...saleOrders[index], ...updatedOrder };
        return saleOrders[index];
    } else {
        throw new Error('SKU not found');
    }
};

// Function to delete a SKU
export const deleteOrder = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = saleOrders.findIndex((order) => order.customer_id === id);
    if (index !== -1) {
        saleOrders.splice(index, 1);
        return true;
    } else {
        throw new Error('SKU not found');
    }
};

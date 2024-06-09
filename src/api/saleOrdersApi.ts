/* eslint-disable @typescript-eslint/no-explicit-any */
// saleOrdersApi.ts
// eslint-disable-next-line prefer-const
let skus = [
    {
        id: 1,
        name: 'Product 1',
        customer: {
            id: 1,
            name: 'Ram',
            email: 'ram@example.com',
            pincode: 'Mumbai',
            location_name: 'Mumbai, Maharashtra, India',
            type: 'C',
            profile_pic: null,
            gst: '',
        },
    },
    // Add more SKUs as needed
];

// Function to fetch all SKUs
export const fetchSKUs = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return skus;
};

// Function to create a new SKU
export const createSKU = async (newSKU: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const id = skus.length + 1;
    const newSku = { ...newSKU, id };
    skus.push(newSku);
    return newSku;
};

// Function to update an existing SKU
export const updateSKU = async (id: number, updatedSKU: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = skus.findIndex((sku) => sku.id === id);
    if (index !== -1) {
        skus[index] = { ...skus[index], ...updatedSKU };
        return skus[index];
    } else {
        throw new Error('SKU not found');
    }
};

// Function to delete a SKU
export const deleteSKU = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = skus.findIndex((sku) => sku.id === id);
    if (index !== -1) {
        skus.splice(index, 1);
        return true;
    } else {
        throw new Error('SKU not found');
    }
};

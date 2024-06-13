// api/customerApi.ts

export type TCustomer = {
    id: string | number;
    name: string;
    color: number[];
    email: string;
    pincode: string;
    location_name: string;
    type: string;
    profile_pic: string | null;
    gst: string;
};

export const fetchCustomers = async (): Promise<TCustomer[]> => {
    // Example array of customers based on the provided schema
    const customers = [
        {
            id: 11908,
            name: "Ram",
            color: [182, 73, 99],
            email: "jesus_christ@church.com",
            pincode: "Mumbai",
            location_name: "Mumbai, Maharashtra, India",
            type: "C",
            profile_pic: null,
            gst: ""
        },
        {
            id: 11909,
            name: "John",
            color: [100, 150, 200],
            email: "john_doe@example.com",
            pincode: "Delhi",
            location_name: "Delhi, India",
            type: "B",
            profile_pic: null,
            gst: ""
        },
        // Add more customers as needed
    ];

    return new Promise((resolve) => {
        setTimeout(() => resolve(customers), 1000); // Simulate an API call with a delay
    });
};

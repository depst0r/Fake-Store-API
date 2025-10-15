const API_BASE = 'https://fakestoreapi.com';


export class FakeStoreAPI {

    static async getProducts() {
        const response = await fetch(`${API_BASE}/products`);
        console.log('response', response)

        const data = await response.json();

        return data;
    }

    static async getProductById(id) {
        const response = await fetch(`${API_BASE}/products/${id}`);
        return await response.json();
    }

    static async getCategories() {
        const response = await fetch(`${API_BASE}/products/categories`);
        return await response.json();
    }

    static async getProductsByCategory(category) {
        const response = await fetch(`${API_BASE}/products/category/${category}`);
        return await response.json();
    }
}
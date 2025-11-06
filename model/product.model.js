const pool = require('../config/pool');

// Product Model
class Product {
    // static async getAllProducts() {
    //     const query = 'SELECT * FROM product';
    //     try {
    //         const res = await pool.query(query);
    //         return res.rows;
    //     } catch (error) {
    //         console.error('Error fetching products:');
    //         throw error;
    //     }
    // }

    static async count() {
        const query = 'SELECT COUNT(*) FROM product';
        try {
            const res = await pool.query(query);
            return res.rows[0].count;
        } catch (error) {
            console.error('Error counting products:', error);
            throw error;
        }
    }

    static async getFilteredProducts(find) {
        let query = 'SELECT * FROM product WHERE 1=1';
        if(find.id) {
            query += ` AND prod_id = \'${find.id}\'`;
        }
        if (find.status) {
            query += ` AND status = \'${find.status}\'`;
        }
        if (find.name) {
            query += ` AND name ILIKE \'%${find.name}%\'`;
        }
        query += ' ORDER BY prod_id';
        if (find.limit) {
            query += ` LIMIT ${find.limit}`;
        }
        if (find.offset) {
            query += ` OFFSET ${find.offset}`;
        }
        try {
            const res = await pool.query(query);
            return res.rows;
        } catch (error) {
            console.error('Error fetching products:');
            throw error;
        }
    }

    static async updateStatus(prodId, status) {
        const query = `UPDATE product SET status = $1 WHERE prod_id = $2`;
        const values = [status, prodId];
        try {
            await pool.query(query, values);
        } catch (error) {
            console.error('Error updating product status:', error);
            throw error;
        }
    }

    static async delete(prodId) {
        const query = `DELETE FROM product WHERE prod_id = $1`;
        const values = [prodId];
        try {
            await pool.query(query, values);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    static async create(product) {
        const query = `INSERT INTO product(prod_id, name, price, status) VALUES
                        ($1, $2, $3, $4)`;
        const values = [product.id, product.title, product.price, product.status];
        try {
            await pool.query(query, values);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    static async update(product) {
        const query = `UPDATE product
                        SET name = $2,
                        price = $3,
                        status = $4
                        WHERE prod_id = $1`;
        const values = [product.id, product.title, product.price, product.status];
        try {
            await pool.query(query, values);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}

module.exports = Product;